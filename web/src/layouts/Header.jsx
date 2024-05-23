import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [headerText, setHeaderText] = useState('My Tasks');
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/about':
                setHeaderText('About');
                break;
            case '/login':
                setHeaderText('Login');
                break;
            case '/signup':
                setHeaderText('Sign Up');
                break;
            default:
                setHeaderText('My Tasks');
        }
    }, [location.pathname]);

    return (
        <header style={headerStyle}>
            <Link style={linkStyle} to='/'>Home</Link> | <Link style={linkStyle} to='/about'>About</Link> | <Link>Login</Link> | <Link>SignUp</Link>
            <h2>{headerText}</h2>
        </header>
    )
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
    position: 'fixed',
    width: '100%',
    top: '0',
    zIndex: '1000'
};

const linkStyle = {
    color: '#fff',
    textDecoration: "none"
}

export default Header
