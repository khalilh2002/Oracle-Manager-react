import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from 'react-feather';
import orclImage from '../assets/orcldb.png';
import './navbar.css'

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { to: "/users", label: "Users" },
    { to: "/roles", label: "Roles" },
    { to: "/quotas", label: "Quotas" },
    { to: "/password-policies", label: "Password Policies" },
    { to: "/security-policies", label: "Security Policies" },
    { to: "/dataguard", label: "Data Guard" },
    { to: "/performance", label: "Performance Chart" },
    { to: "/optimization", label: "Optimization SQL" },
    { to: "/rman", label: "RMAN" },
  ];

  return (
    <nav
  className={`fixed w-full z-50 h-20 transition-all duration-300 ${
    scrolled ? 'bg-oracle-red shadow-lg' : 'bg-transparent'
  }`}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src={orclImage}
                alt="Oracle Logo"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
              />
              <span className={`text-2xl font-bold transition-colors duration-300 ${scrolled ? 'text-white' : 'text-oracle-red'}`}>
                Oracle Management System
              </span>
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} active={location.pathname === item.to} scrolled={scrolled}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300 ${
                scrolled ? 'hover:bg-oracle-dark-red' : 'hover:bg-oracle-red'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-oracle-red shadow-lg">
            {navItems.map((item) => (
              <MobileNavLink key={item.to} to={item.to} active={location.pathname === item.to}>
                {item.label}
              </MobileNavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children, active, scrolled }) => (
  <Link
    to={to}
    className={`
      px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out
      ${active
        ? 'bg-oracle-dark-red text-white'
        : scrolled
          ? 'text-white hover:bg-oracle-dark-red hover:text-white'
          : 'text-oracle-red hover:bg-oracle-red hover:text-white'
      }
    `}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, active }) => (
  <Link
    to={to}
    className={`
      block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-in-out
      ${active
        ? 'bg-oracle-dark-red text-white'
        : 'text-white hover:bg-oracle-dark-red hover:text-white'
      }
    `}
  >
    {children}
  </Link>
);

export default Navbar;

