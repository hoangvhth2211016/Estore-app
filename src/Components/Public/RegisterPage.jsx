import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { registerUser } from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../Fragments/PasswordInput";
import AuthPageLayout from "../Layout/AuthPageLayout";


const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password not match'),
});

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();

    const submitForm = (data) => {
        // eslint-disable-next-line no-unused-vars
        const { confirmPassword, ...registerDto } = data;
        console.log(registerDto);
        registerUser(registerDto)
            .then(res => {
                console.log(res);
                navigate('/');
                toast.success('Register successfully! Please check your email and activate your account.');
            })
            .catch(err => {
                console.log(err);
                toast.error('Something when wrong! Please try again later.');
            });
    }

    return (
        <AuthPageLayout>
            <div className="col-4">
                <h1 className="text-center">Register</h1>
                <form onSubmit={handleSubmit(submitForm)} noValidate >
                    <div className="my-3">
                        <label className="form-label" htmlFor="firstname">Firstname</label>
                        <input
                            className="form-control"
                            type="text"
                            id="firstname"
                            name="firstname"
                            {...register('firstname')}
                        />
                        {errors.firstname && <p className="text-danger">{errors.firstname.message}</p>}
                    </div>
                    <div className="my-3">
                        <label className="form-label" htmlFor="lastname">Lastname</label>
                        <input
                            className="form-control"
                            type="text"
                            id="lastname"
                            name="lastname"
                            {...register('lastname')}
                        />
                        {errors.lastname && <p className="text-danger">{errors.lastname.message}</p>}
                    </div>
                    <div className="my-3">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            className="form-control"
                            type="text"
                            id="username"
                            name="username"
                            {...register('username')}
                        />
                        {errors.username && <p className="text-danger">{errors.username.message}</p>}
                    </div>
                    <div className="my-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            {...register('email')}
                        />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </div>
                    <div className="my-3">
                        <label className="form-label" htmlFor="password">Password</label>
                        <PasswordInput
                            id='password'
                            {...register('password')}
                        />
                        {errors.password && <p className="text-danger">{errors.password.message}</p>}
                    </div>
                    <div className="my-3">
                        <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
                        <PasswordInput
                            id='confirm-password'
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                    </div>
                    <div className="my-3 text-center">
                        <button type="submit" className="btn btn-primary">register</button>
                    </div>
                </form>
            </div>
        </AuthPageLayout>
    )
}
