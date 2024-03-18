import { useSearchParams } from "react-router-dom"
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import useAuth from "../../CustomHooks/useAuth";
import AuthPageLayout from "../Layout/AuthPageLayout";


export default function AccountActivate() {

    const [searchParams] = useSearchParams();

    const { handleAccountActivation } = useAuth();

    const [isLoading, setIsLoading] = useState(true);

    const key = searchParams.get('key');
    const email = searchParams.get('email');

    useEffect(() => {
        if (key && email) {
            handleAccountActivation({ key: key, email: email })
                .then(() => setIsLoading(false));
        }
    })

    return (

        <AuthPageLayout>
            {isLoading && (
                <Spinner animation="border" />
            )}
        </AuthPageLayout>
    )
}
