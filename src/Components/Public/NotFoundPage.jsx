import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

export default function NotFoundPage() {

    const error = useRouteError();

    return (
        <div className='container min-vh-100 position-relative'>
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h1>Oops!</h1>
                    <p className='my-4'>Sorry, an unexpected error has occurred.</p>
                    <p>
                        <i>{error.statusText || error.message}</i>
                    </p>
                    <Link className='btn btn-primary d-inline-block' to="/">Back Home</Link>
                </div>
            </div>
        </div>
    )
}
