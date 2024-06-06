import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../components/AuthContext';

const Header = () => {
    const { isAuthenticated, currentUser, logout } = useContext(AuthContext);
    const [headerText, setHeaderText] = useState('My Tasks Application');
    const location = useLocation();
    useEffect(() => {
        switch (location.pathname) {
            case '/about':
                setHeaderText('About');
                break;
            case '/users':
                    setHeaderText('Users');
                    break;
            case '/auth':
                setHeaderText('Login/Sign Up');
                break;
            default:
                setHeaderText(isAuthenticated && currentUser ? `${currentUser.name.split(' ')[0]}'s Tasks` : 'My Tasks Application');
        }
    }, [location.pathname, isAuthenticated, currentUser]);

    return (
        <header style={headerStyle}>
            {isAuthenticated ? (
                <Link style={linkStyle} to='/home'>Home</Link>
            ) : (
                <Link style={linkStyle} to='/auth'>Home</Link>
            )}{' '} | {' '}
            <Link style={linkStyle} to='/about'>About</Link>{' '} | {' '}
            <Link style={linkStyle} to='/users'>Users</Link>{' '} | {' '}
            {isAuthenticated ? (
                <Link style={linkStyle} onClick={logout} to='/auth'>Logout</Link>
            ) : (
                <Link style={linkStyle} to='/auth'>Login/Sign Up</Link>
            )}
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
    zIndex: '1000',
    marginBottom: '10px'
};

const linkStyle = {
    color: '#fff',
    textDecoration: "none"
}

export default Header;
