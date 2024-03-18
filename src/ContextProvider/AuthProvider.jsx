import { useEffect, useState } from "react";
import { activateAccount, decodeToken, getAuth, login, refreshToken } from "../Services/auth.service";
import { AuthContext } from "./Context";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function AuthProvider({ children }) {

    const location = useLocation();

    const navigate = useNavigate();

    const [auth, setAuth] = useState(getAuth());

    const redirectTo = location.state?.redirectTo?.pathname || '/products';

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (auth.accessToken && auth.refreshToken) {
                refreshToken(auth.refreshToken)
                    .then(token => {
                        const payload = decodeToken(token.accessToken);
                        const { role } = payload;
                        console.log('token refreshed')
                        setAuth({
                            accessToken: token.accessToken,
                            refreshToken: token.refreshToken,
                            role: role
                        });
                    })
                    .catch(e => {
                        console.log(e);
                        setAuth({});
                        toast.error('Your login session might has been expired, please try to login again');
                        navigate('/');
                    });
            }

        }, 1000 * 60 * 10);
        return () => clearInterval(interval);
    }, [auth]);

    const handleLogin = (data) => {
        login(data)
            .then(token => {
                console.log(token);
                const payload = decodeToken(token.accessToken);
                const { role } = payload;
                setAuth({
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                    role: role
                });
                navigate(redirectTo, { replace: true });
                toast.success('Login successfully, welcome back!')
            })
            .catch(error => {
                console.log(error.response);
                toast.error('Failed to login. Please try again later!');
            })
    }

    const handleLogout = () => {
        setAuth({});
        toast.success('Logged out! See you later!')
        navigate('/');
    }

    const handleAccountActivation = (data) => {
        activateAccount(data)
            .then(token => {
                const payload = decodeToken(token.accessToken);
                const { role } = payload;
                setAuth({
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                    role: role
                });
                toast.success('Account activated, welcome!');
            })
            .catch(error => {
                console.log(error.response);
                toast.error('Unable to activate account!');
            })
            .finally(() => {
                navigate('/');
            })
    }

    return (
        <AuthContext.Provider value={{ auth, handleLogin, handleLogout, handleAccountActivation }}>
            {children}
        </AuthContext.Provider>
    )
}
