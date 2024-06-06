import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Header from './layouts/Header';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth'; // Import the combined auth component
import Users from './pages/Users';
import AssignTask from './components/AssignTask';

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Header />
          <Routes>
            <Route path='/auth' element={<Auth />} />
            <Route path='/about' element={<About />} />
            <Route path='/home' element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/manage-task/:userId" element={<AssignTask />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
