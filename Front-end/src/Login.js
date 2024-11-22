import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [isSignup, setIsSignup] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [loginPassword, setLoginPassword] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const emailRef = useRef(null); // 创建 email 输入框的 ref
    const codeRef = useRef(null);  // 创建验证码输入框的 ref

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const studentEmail = emailRef.current.value;
        const code = codeRef.current.value;

        if (signupPassword !== signupConfirmPassword) {
            return setErrorMessage('Passwords do not match!');
        }

        if (!isPasswordValid(signupPassword)) {
            return setErrorMessage(
                'Password must be at least 8 characters long, include upper and lower case letters, numbers, and special symbols.'
            );
        }

        try {
            const response = await fetch('/api/student/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentEmail, code, studentPassword: signupPassword }),
            });

            const data = await response.json();
            if (response.ok && data.code === 1) {
                setIsSignupSuccess(true);
            } else {
                setErrorMessage(data.msg || 'Signup failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Error during signup.');
            console.error('Signup error:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const studentEmail = emailRef.current.value;

        if (loginPassword.length > 0) {
            try {
                const response = await fetch('/api/student/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ studentEmail, studentPassword: loginPassword }),
                });

                const data = await response.json();
                if (data.code === 1) {
                    const { student_id, token } = data.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('student_id', student_id);
                    navigate('/homepage');
                } else {
                    setErrorMessage(data.msg);
                }
            } catch (error) {
                setErrorMessage('Error during login.');
            }
        } else {
            setErrorMessage('Please enter a valid password.');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const studentEmail = emailRef.current.value;
        const code = codeRef.current.value;
        const newPassword = signupPassword;

        console.log('studentEmail', studentEmail);
        console.log('code', code);
        console.log('newPassword', newPassword);

        if (!isPasswordValid(newPassword)) {
            return setErrorMessage(
                'Password must be at least 8 characters long, include upper and lower case letters, numbers, and special symbols.'
            );
        }

        try {
            const response = await fetch('/api/student/forgotpassword/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentEmail, code, newPassword }),
            });

            const data = await response.json();
            if (response.ok && data.code === 1) {
                alert('Password reset successfully');
                setIsResetPassword(false);
            } else {
                setErrorMessage(data.msg || 'Password reset failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Error during password reset.');
            console.error('Password reset error:', error);
        }
    };

    const handleSendVerificationCode = async () => {
        const studentEmail = emailRef.current.value;
        console.log('Student Email:', studentEmail);

        try {
            const response = await fetch('/api/student/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentEmail }),
            });

            const data = await response.json();
            if (data.code === 1) {
                setIsVerificationSent(true);
            } else {
                setErrorMessage(data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error while sending verification code.');
        }
    };

    const handleSendResetPasswordCode = async () => {
        const studentEmail = emailRef.current.value;
        console.log('Student Email:', studentEmail);

        try {
            const response = await fetch('/api/student/forgotpassword/sendcode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentEmail }),
            });

            const data = await response.json();
            if (data.code === 1) {
                setIsVerificationSent(true);
            } else {
                setErrorMessage(data.msg || 'Failed to send verification code, please try again.');
            }
        } catch (error) {
            console.error('Verification code send error:', error);
            setErrorMessage('Error while sending verification code.');
        }
    };

    const handleGoBackToLogin = () => {
        setIsSignup(false);
        setIsResetPassword(false);
        setIsSignupSuccess(false);
        setIsVerificationSent(false);
    };

    return (
        <div className="login-container">
            <div className="logo">
                <img src="/logo.png" alt="OIC" />
            </div>

            <div className="login-box">
                <div className="form-container">
                    {!isResetPassword ? (
                        <div>
                            <button className={`tab ${!isSignup ? 'active' : ''}`} onClick={() => setIsSignup(false)}>
                                Login
                            </button>
                            <button className={`tab ${isSignup ? 'active' : ''}`} onClick={() => setIsSignup(true)}>
                                Signup
                            </button>

                            {!isSignup ? (
                                <form onSubmit={handleLogin}>
                                    <input type="email" placeholder="Enter your Email" ref={emailRef} required />
                                    <input
                                        type="password"
                                        placeholder="Enter your Password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required
                                    />
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    <button className="login-btn" type="submit">
                                        Login
                                    </button>
                                    <div className="forgot-password">
                                        Forgot your password?{' '}
                                        <a href="#" onClick={() => setIsResetPassword(true)}>
                                            Click here
                                        </a>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={handleSignup}>
                                    <input type="email" placeholder="Enter your Email" ref={emailRef} required />
                                    <button className="login-btn" type="button" onClick={handleSendVerificationCode}>
                                        Send verification code
                                    </button>
                                    <input type="text" placeholder="Enter verification code" ref={codeRef} required />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={signupPassword}
                                        onChange={(e) => setSignupPassword(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={signupConfirmPassword}
                                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                                        required
                                    />
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    <button className="login-btn" type="submit">
                                        Signup
                                    </button>
                                </form>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleResetPassword}>
                            <button className="back-btn" onClick={handleGoBackToLogin}>
                                ← Back
                            </button>
                            <h2>Reset your password</h2>
                            <input type="email" placeholder="Enter your Email" ref={emailRef} required />
                            <button className="login-btn" type="button" onClick={handleSendResetPasswordCode}>
                                Send verification code
                            </button>
                            <input type="text" placeholder="Enter verification code" ref={codeRef} required />
                            <input
                                type="password"
                                placeholder="Password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={signupConfirmPassword}
                                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                                required
                            />
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <button className="login-btn" type="submit">
                                Reset Password
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {isSignupSuccess && (
                <div className="signup-success-popup">
                    <h2>Signup successful!</h2>
                    <button className="login-btn" onClick={handleGoBackToLogin}>
                        Go back to login
                    </button>
                </div>
            )}

            {isVerificationSent && (
                <div className="verification-success-popup">
                    <h2>Send verification code successful!</h2>
                    <button className="close-popup" onClick={() => setIsVerificationSent(false)}>
                        ×
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login;
