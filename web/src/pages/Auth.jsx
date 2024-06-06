import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../components/AuthContext';
import './Auth.css';

const Auth = () => {
    const { login } = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', loginForm);
            const token = response.data.token;
            localStorage.setItem('token', token);
            await login(token);
            alert('Login successful');
            navigate('/home');
        } catch (err) {
            console.error(err);
            alert('Error during login');
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/signup', signupForm);
            alert('Signup successful');
            setSignupForm({ name: '', email: '', password: '' });
        } catch (err) {
            console.error(err);
            alert('Error during signup');
        }
    };

    return (
        <div className="auth-container">
            <div className="login-container">
                <form onSubmit={handleLoginSubmit}>
                    <h2>Login</h2>
                    <input className='auth-input' type="email" name="email" value={loginForm.email} onChange={handleLoginChange} placeholder="Email" required />
                    <input className='auth-input' type="password" name="password" value={loginForm.password} onChange={handleLoginChange} placeholder="Password" required />
                    <button className='auth-btn' type="submit">Login</button>
                </form>
            </div>
            <div className="signup-container">
                <form onSubmit={handleSignupSubmit}>
                    <h2>Sign Up</h2>
                    <input className='auth-input' type="text" name="name" value={signupForm.name} onChange={handleSignupChange} placeholder="Name" required />
                    <input className='auth-input' type="email" name="email" value={signupForm.email} onChange={handleSignupChange} placeholder="Email" required />
                    <input className='auth-input' type="password" name="password" value={signupForm.password} onChange={handleSignupChange} placeholder="Password" required />
                    <button className='auth-btn' type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
