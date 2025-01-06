import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from 'react-feather';
import orclImage from '../assets/orcldb.png'; // Import the image

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-oracle-red shadow-lg font-oracle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Image */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={orclImage}
                alt="Oracle Logo"
                className="h-10 w-auto"
              />
              <span className="text-white text-xl font-bold">Oracle Management System</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/users" active={location.pathname === '/users'}>Users</NavLink>
              <NavLink to="/roles" active={location.pathname === '/roles'}>Roles</NavLink>
              <NavLink to="/quotas" active={location.pathname === '/quotas'}>Quotas</NavLink>
              <NavLink to="/password-policies" active={location.pathname === '/password-policies'}>Password Policies</NavLink>
              <NavLink to="/security-policies" active={location.pathname === '/security-policies'}>Security Policies</NavLink>
              <NavLink to="/dataguard" active={location.pathname === '/dataguard'}>Data Guard</NavLink>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-oracle-dark-red focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/users" active={location.pathname === '/users'}>Users</MobileNavLink>
            <MobileNavLink to="/roles" active={location.pathname === '/roles'}>Roles</MobileNavLink>
            <MobileNavLink to="/quotas" active={location.pathname === '/quotas'}>Quotas</MobileNavLink>
            <MobileNavLink to="/password-policies" active={location.pathname === '/password-policies'}>Password Policies</MobileNavLink>
            <MobileNavLink to="/security-policies" active={location.pathname === '/security-policies'}>Security Policies</MobileNavLink>
            <MobileNavLink to="/dataguard" active={location.pathname === '/dataguard'}>Data Guard</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children, active }) => (
  <Link
    to={to}
    className={`${
      active
        ? 'bg-oracle-dark-red text-white'
        : 'text-white hover:bg-oracle-dark-red hover:text-white'
    } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, active }) => (
  <Link
    to={to}
    className={`${
      active
        ? 'bg-oracle-dark-red text-white'
        : 'text-white hover:bg-oracle-dark-red hover:text-white'
    } block px-3 py-2 rounded-md text-base font-medium`}
  >
    {children}
  </Link>
);

export default Navbar;
