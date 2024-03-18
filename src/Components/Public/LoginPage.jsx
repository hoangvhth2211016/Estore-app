import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Link } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import PasswordInput from "../Fragments/PasswordInput";
import AuthPageLayout from "../Layout/AuthPageLayout";


const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(4).max(15).required()
});


export default function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const { handleLogin } = useAuth();

    const submitForm = (data) => {
        handleLogin(data);
    }

    return (
        <AuthPageLayout>
            <div className="w-25">
                <h1 className="text-center">Login</h1>
                <form onSubmit={handleSubmit(submitForm)} noValidate >
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
                        <label className="form-label" htmlFor="password">Password</label>
                        <PasswordInput
                            id='password'
                            {...register('password')}
                        />
                        {errors.password && <p className="text-danger">{errors.password.message}</p>}
                    </div>
                    <Link to='/reset-password'>Forget password?</Link>
                    <div className="my-3 text-center">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </AuthPageLayout>
    )
}
