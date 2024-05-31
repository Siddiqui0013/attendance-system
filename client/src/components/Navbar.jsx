import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    // Check if a token exists in local storage on component mount
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    nav('/login');
  };

  return (
    <nav className="bg-slate-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          Attendance Management
        </div>
        <div className="hidden md:flex space-x-4">
          {authenticated ? (
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">Login</Link>
              <Link to="/register" className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">Register</Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars4Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-slate-700">
          {authenticated ? (
            <button onClick={handleLogout} className="block text-white px-4 py-2 bg-red-500 hover:bg-red-600">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="block text-white px-4 py-2 bg-red-500 hover:bg-red-600">Login</Link>
              <Link to="/register" className="block text-white px-4 py-2 bg-red-500 hover:bg-red-600">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
