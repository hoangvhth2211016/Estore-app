import { useForm } from "react-hook-form";
import useModal from "../../CustomHooks/useModal"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { changeUserPassword } from "../../Services/user.service";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { toast } from "react-toastify";
import PasswordInput from "../Fragments/PasswordInput";


const schema = yup.object({
    oldPassword: yup.string().required(),
    newPassword: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Password not match'),
});

export default function InfoBox({ user }) {

    const { openModal } = useModal();

    const submitRef = useRef();

    const triggerSubmit = () => {
        submitRef.current.submit();
    }

    const handleChangePassword = () => {
        openModal(
            'Change Password',
            <ChangePasswordForm
                ref={submitRef}
            />,
            triggerSubmit
        );
    };

    return (
        <table className="table">
            <tbody>
                <tr>
                    <td className="fw-semibold">First Name</td>
                    <td>{user.firstname}</td>
                </tr>
                <tr>
                    <td className="fw-semibold">Last Name</td>
                    <td>{user.lastname}</td>
                </tr>
                <tr>
                    <td className="fw-semibold">Username</td>
                    <td>{user.username}</td>
                </tr>
                <tr>
                    <td className="fw-semibold">Email</td>
                    <td>{user.email}</td>
                </tr>
                <tr>
                    <td className="fw-semibold">Telephone</td>
                    <td>{user.phone}</td>
                </tr>
                <tr>
                    <td className="fw-semibold">Date of Birth</td>
                    <td>{user.dob}</td>
                </tr>
                <tr>
                    <td className="fw-semibold">Password</td>
                    <td>
                        <Link onClick={handleChangePassword}>Change Password</Link>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}



const ChangePasswordForm = forwardRef((props, ref) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const { closeModal } = useModal();

    useImperativeHandle(ref, () => ({
        submit: handleSubmit(changePassword)
    }));

    const changePassword = (data) => {
        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, ...req } = data;
        changeUserPassword(req)
            .then(res => {
                console.log(res);
                toast.success('Password changed');
                reset();
                closeModal();
            })
            .catch(err => {
                console.log(err.response.data);
                toast.error('Unable to change password');
            })
    };

    return (
        <form noValidate >
            <div className="my-3">
                <label className="form-label" htmlFor="old-password">Old Password</label>
                <PasswordInput
                    id='old-password'
                    {...register('oldPassword')}
                />
                {errors.oldPassword && <p className="text-danger">{errors.oldPassword.message}</p>}
            </div>
            <div className="my-3">
                <label className="form-label" htmlFor="new-password">New Password</label>
                <PasswordInput
                    id='new-password'
                    {...register('newPassword')}
                />
                {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}
            </div>
            <div className="my-3">
                <label className="form-label" htmlFor="confirm-password">New Password</label>
                <PasswordInput
                    id='confirm-password'
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
            </div>
        </form>
    );
});

ChangePasswordForm.displayName = 'ChangePasswordForm';
