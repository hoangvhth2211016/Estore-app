import { useForm } from "react-hook-form";
import { resetPassword } from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify";
import AuthPageLayout from "../Layout/AuthPageLayout";


const schema = yup.object({
    email: yup.string().required().email()
})

export default function ResetPasswordPage() {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const sendEmail = (email) => {
        resetPassword(email)
            .then(() => {
                navigate('/');
                toast.success('A new password has been sent to your email');
            })
            .catch(err => {
                console.log(err);
                toast.error('Unable to reset your password');
            });
    }
    return (
        <AuthPageLayout>
            <div className="text-center col-4">
                <h1>Reset Password</h1>
                <p>Please give us your registered email</p>
                <form onSubmit={handleSubmit(sendEmail)} noValidate>
                    <div className="my-3">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            {...register('email')}
                        />
                        <p className="text-danger">{errors.email?.message}</p>
                    </div>
                    <button className="btn btn-primary">Send Email</button>
                </form>
            </div>
        </AuthPageLayout>
    )
}
