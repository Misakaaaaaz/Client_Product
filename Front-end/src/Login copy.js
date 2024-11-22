import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for backend interaction
import './Login.css';

function Login() {
    const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup forms
    const [isResetPassword, setIsResetPassword] = useState(false); // Toggle to reset password form
    const [isSignupSuccess, setIsSignupSuccess] = useState(false); // Signup success popup
    const [isVerificationSent, setIsVerificationSent] = useState(false); // Verification code sent success message
    const [loginPassword, setLoginPassword] = useState(''); // Login form password state
    const [signupPassword, setSignupPassword] = useState(''); // Signup form password state
    const [signupConfirmPassword, setSignupConfirmPassword] = useState(''); // Signup form confirm password state
    const [errorMessage, setErrorMessage] = useState(''); // Error message state

    const navigate = useNavigate();  // Get navigate object for routing

    // Validate password contains upper and lower case letters, special symbols, and numbers
    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    // Handle signup logic
    const handleSignup = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const verificationCode = e.target[2].value;
        if (signupPassword !== signupConfirmPassword) {
            setErrorMessage('Passwords do not match!');
        } else if (!isPasswordValid(signupPassword)) {
            setErrorMessage('Password must be at least 8 characters long, include upper and lower case letters, numbers, and special symbols.');
        } else {
            try {
                const response = await axios.post('https://mockapi.example.com/signup', { email, verificationCode, password: signupPassword });
                if (response.data === true) {
                    setIsSignupSuccess(true); // Show signup success popup
                } else {
                    setErrorMessage('Invalid verification code.');
                }
            } catch (error) {
                setErrorMessage('Error during signup.');
            }
        }
    };

    // Handle login logic and navigate to Interest Hub
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        if (loginPassword.length > 0) {
            try {
                const response = await axios.post('https://mockapi.example.com/login', { email, password: loginPassword });
                if (response.data === true) {
                    navigate('/InterestHub');  // Navigate to Interest Hub page after successful login
                } else {
                    setErrorMessage('Incorrect username or password.');
                }
            } catch (error) {
                setErrorMessage('Error during login.');
            }
        } else {
            setErrorMessage('Please enter a valid password.');
        }
    };

    // Handle reset password logic
    const handleResetPassword = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const verificationCode = e.target[2].value;
        const newPassword = signupPassword;

        try {
            const response = await axios.post('https://mockapi.example.com/reset-password', { email, verificationCode, newPassword });
            if (response.data === true) {
                alert('Password reset successfully');
                setIsResetPassword(false); // Go back to the login page
            } else {
                setErrorMessage('Invalid verification code.');
            }
        } catch (error) {
            setErrorMessage('Error during password reset.');
        }
    };

    // Handle send verification code logic
    const handleSendVerificationCode = async (e) => {
        e.preventDefault();
        const email = e.target.form[0].value;

        try {
            const response = await axios.post('https://mockapi.example.com/send-verification', { email });
            if (response.data === true) {
                setIsVerificationSent(true); // Show verification code sent success message
            } else {
                setErrorMessage(isSignup ? 'User already exists.' : 'User does not exist.');
            }
        } catch (error) {
            setErrorMessage('Error while sending verification code.');
        }
    };

    // Switch back to login form
    const handleGoBackToLogin = () => {
        setIsSignup(false);
        setIsResetPassword(false);
        setIsSignupSuccess(false); // Close signup success popup
        setIsVerificationSent(false); // Close verification code sent success message
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
                            <button className={`tab ${!isSignup ? 'active' : ''}`} onClick={() => setIsSignup(false)}>Login</button>
                            <button className={`tab ${isSignup ? 'active' : ''}`} onClick={() => setIsSignup(true)}>Signup</button>

                            {!isSignup ? (
                                // Login form
                                <form onSubmit={handleLogin}> {/* Add onSubmit handler for login form */}
                                    <input type="email" placeholder="Enter your Email" required />
                                    <input
                                        type="password"
                                        placeholder="Enter your Password"
                                        value={loginPassword}
                                        onChange={e => setLoginPassword(e.target.value)}
                                        required />
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    <button className="login-btn" type="submit">Login</button>
                                    <div className="forgot-password">
                                        Forgot your password? <a href="#" onClick={() => setIsResetPassword(true)}>Click here</a>
                                    </div>
                                </form>
                            ) : (
                                // Signup form
                                <form onSubmit={handleSignup}>
                                    <input type="email" placeholder="Enter your Email" required />
                                    <button className="login-btn" type="submit" onClick={handleSendVerificationCode}>Send verification code</button>
                                    <input type="text" placeholder="Enter verification code" required />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={signupPassword}
                                        onChange={e => setSignupPassword(e.target.value)}
                                        required />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={signupConfirmPassword}
                                        onChange={e => setSignupConfirmPassword(e.target.value)}
                                        required />
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    <button className="login-btn" type="submit">Signup</button>
                                </form>
                            )}
                        </div>
                    ) : (
                        // Reset password form
                        <form onSubmit={handleResetPassword}>
                            <button className="back-btn" onClick={handleGoBackToLogin}>← Back</button>
                            <h2>Reset your password</h2>
                            <input type="email" placeholder="Enter your Email" required />
                            <button className="login-btn" type="submit" onClick={handleSendVerificationCode}>Send verification code</button>
                            <input type="text" placeholder="Enter verification code" required />
                            <input
                                type="password"
                                placeholder="Password"
                                value={signupPassword}
                                onChange={e => setSignupPassword(e.target.value)}
                                required />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={signupConfirmPassword}
                                onChange={e => setSignupConfirmPassword(e.target.value)}
                                required />
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <button className="login-btn" type="submit">Reset Password</button>
                        </form>
                    )}
                </div>
            </div>

            {/* Popup for successful signup */}
            {isSignupSuccess && (
                <div className="signup-success-popup">
                    <h2>Signup successful!</h2>
                    <button className="login-btn" onClick={handleGoBackToLogin}>Go back to login</button>
                </div>
            )}

            {/* Separate popup for verification code sent success */}
            {isVerificationSent && (
                <div className="verification-success-popup">
                    <h2>Send verification code successful!</h2>
                    <button className="close-popup" onClick={() => setIsVerificationSent(false)}>×</button>
                </div>
            )}
        </div>
    );
}

export default Login;
