import { useEffect, useState } from "react"
import useModal from "../../CustomHooks/useModal";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addUserAddress, deleteUserAddress, updateUserAddress } from "../../Services/user.service";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";


const schema = yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    country: yup.string().required(),
    zipcode: yup.string()
});


export default function AddressBox({ addresses, userId, setOrderAddress }) {

    const { openModal, closeModal } = useModal();

    const [address, setAddress] = useState({
        list: [],
        current: null
    });

    const submitRef = useRef();

    useEffect(() => {
        if (addresses && addresses.length !== 0) {
            setAddress({
                list: addresses,
                current: addresses[0]
            })
        }
        if (setOrderAddress && address.current) {
            setOrderAddress(address.current)
        }
    }, [addresses]);

    const triggerSubmit = () => {
        submitRef.current.submit();
    }

    const selectAddress = (e) => {
        setAddress(prev => ({
            ...prev,
            current: prev.list.find(addr => addr.id === Number(e.target.value))
        }))
        if (setOrderAddress) {
            setOrderAddress(address.list.find(addr => addr.id === Number(e.target.value)))
        }
    }


    const handleEdit = () => {
        openModal(
            'Edit Address',
            <AddressForm
                address={address.current}
                ref={submitRef}
                method={editAddress}
            />,
            triggerSubmit
        );
    }

    const handleAdd = () => {
        openModal(
            'Add Address',
            <AddressForm
                ref={submitRef}
                method={addAddress}
            />,
            triggerSubmit
        );
    }

    const handleDelete = () => {
        openModal(
            'Delete Address',
            <div>
                <p>Do you want to delete this address:</p>
                <p>
                    {address.current.street} <br />
                    {address.current.city} <br />
                    {address.current.country} <br />
                    {address.current.zipcode} <br />
                </p>
            </div>,
            () => {
                const id = address.current.id;
                deleteUserAddress(id)
                    .then(() => {
                        toast.success('Address deleted!');
                        setAddress(prev => {
                            const updatedList = prev.list.filter(addr => addr.id !== id);
                            return {
                                current: updatedList[0],
                                list: updatedList
                            }
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error('Unable to delete address!');
                    });
                closeModal();
            }
        )
    }

    const editAddress = (data) => {
        updateUserAddress({ ...data, userId }, address.current.id)
            .then(res => {
                toast.success('Address updated!');
                setAddress(prev => ({
                    current: res.data,
                    list: prev.list.map(addr => addr.id === res.data.id ? { ...res.data } : addr)
                }));
            })
            .catch(err => {
                console.log(err);
                toast.error('Unable to updated address!');
            });
        closeModal();
    }

    const addAddress = (data) => {
        addUserAddress({ ...data, userId })
            .then(res => {
                toast.success('Address created!');
                setAddress(prev => ({
                    current: res.data,
                    list: [...prev.list, res.data]
                }));
            })
            .catch(err => {
                console.log(err);
                toast.error('Unable to create address!');
            });
        closeModal();
    }

    return (
        <div className="my-3">
            <div className="d-flex">
                <select
                    className="form-select w-25 me-3"
                    onChange={selectAddress}
                    defaultValue={address.current?.id}
                >
                    {address.list?.map(addr => (
                        <option key={addr.id} value={addr.id}>Address id: {addr.id}</option>
                    ))}
                </select>
                <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                <button className="btn btn-success mx-3" onClick={handleAdd}>Add</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>

            </div>
            <table className="table table-hover my-3">
                <tbody>
                    <tr>
                        <td className="fw-semibold">Street</td>
                        <td>{address.current?.street}</td>
                    </tr>
                    <tr>
                        <td className="fw-semibold">City</td>
                        <td>{address.current?.city}</td>
                    </tr>
                    <tr>
                        <td className="fw-semibold">Country</td>
                        <td>{address.current?.country}</td>
                    </tr>
                    <tr>
                        <td className="fw-semibold">Zipcode</td>
                        <td>{address.current?.zipcode}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}


const AddressForm = forwardRef(({ address, method }, ref) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useImperativeHandle(ref, () => ({
        submit: handleSubmit(method)
    }))

    useEffect(() => {
        address ? reset(address) : reset();
    }, [address])

    return (
        <form className="my-3" noValidate >
            <div className="mb-3">
                <label htmlFor="street" className="fw-semibold">Street:</label>
                <input
                    type="text"
                    className="form-control"
                    id="street"
                    {...register('street')}
                />
                {errors.street && <p className="text-danger">{errors.street.message}</p>}

            </div>
            <div className="mb-3">
                <label htmlFor="city" className=" fw-semibold">City:</label>
                <input
                    type="text"
                    className="form-control"
                    id="city"
                    {...register('city')}
                />
                {errors.city && <p className="text-danger">{errors.city.message}</p>}

            </div>
            <div className="mb-3">
                <label htmlFor="country" className=" fw-semibold">Country:</label>
                <input
                    type="text"
                    className="form-control"
                    id="country"
                    {...register('country')}
                />
                {errors.country && <p className="text-danger">{errors.country.message}</p>}

            </div>
            <div className="mb-3">
                <label htmlFor="zipcode" className=" fw-semibold">Zipcode:</label>
                <input
                    type="text"
                    className="form-control"
                    id="zipcode"
                    {...register('zipcode')}
                />
                {errors.zipcode && <p className="text-danger">{errors.zipcode.message}</p>}
            </div>
        </form >
    )
});

AddressForm.displayName = 'AddressForm';
