import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };


    return (
            <div className='login-form-wrapper'>
                <span className='log-in-header'>Please Log In</span>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <div className='login-modal-form'>
                    <div className='form-field-input'>
                        <label className='login-grid-username-label'>
                            Username 
                        </label>
                            <input
                                className='login-grid-username-input'
                                type="text"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-field-input'> 
                        <label className='login-grid-password-label'>
                            Password 
                        </label>
                            <input
                                className='login-grid-password-input'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-field-button'>
                            <button className='login-submit-button' type="submit">Log In</button>
                        </div>
                    </div>
                </form>
            </div>

    );
}

export default LoginForm;