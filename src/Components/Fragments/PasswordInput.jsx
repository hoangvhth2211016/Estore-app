import { forwardRef } from "react";
import { useState } from "react";

const PasswordInput = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);

    const showPassword = (e) => {
        e.preventDefault();
        setShow(prev => !prev);
    }

    return (
        <>
            <div className="input-group">
                <input
                    {...props}
                    ref={ref}
                    type={show ? 'text' : 'password'}
                    className="form-control"
                />
                <button
                    className="btn btn-outline-secondary"
                    onClick={showPassword}
                >
                    {show ? (
                        <i className="bi bi-eye"></i>
                    ) : (
                        <i className="bi bi-eye-slash-fill"></i>
                    )}
                </button>
            </div>
        </>
    )
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
