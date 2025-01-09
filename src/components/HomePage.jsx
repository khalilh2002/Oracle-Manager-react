import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import orclImage from '../assets/orclbg.png';

const HomePage = () => {
  const features = [
    {
      title: "Users",
      description: "Create, modify, and delete user accounts with ease in Oracle.",
      icon: Icons.Users,
      link: "/users"
    },
    {
      title: "Roles",
      description: "Assign and manage roles to control user permissions in Oracle.",
      icon: Icons.ShieldCheck,
      link: "/roles"
    },
    {
      title: "Quotas",
      description: "Set and adjust storage quotas for users and tablespaces.",
      icon: Icons.Database,
      link: "/quotas"
    },
    {
      title: "Password Policies",
      description: "Implement robust password policies to enhance security.",
      icon: Icons.Key,
      link: "/password-policies"
    },
    {
      title: "Security Policies",
      description: "Configure and manage advanced security features for Oracle Data.",
      icon: Icons.Lock,
      link: "/security-policies"
    },
    {
      title: "Data Guard",
      description: "Configure, monitor, and manage Oracle Data Guard for high availability.",
      icon: Icons.Shield,
      link: "/dataguard"
    },
    {
      title: "Performance Chart",
      description: "Visualize and analyze database performance metrics with interactive charts.",
      icon: Icons.BarChart2,
      link: "/performance"
    },
    {
      title: "Optimization SQL",
      description: "Optimize your SQL queries for improved database performance.",
      icon: Icons.Terminal,
      link: "/optimization"
    },
    {
      title: "RMAN",
      description: "Manage Oracle Recovery Manager (RMAN) for efficient backup and recovery.",
      icon: Icons.HardDrive,
      link: "/rman"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen font-oracle flex flex-col">
      <main className="flex-grow max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <img
            src={orclImage}
            alt="Oracle Logo"
            className="mx-auto h-48 w-auto mb-8 animate-float"
          />
          <h1 className="text-5xl font-bold text-oracle-red mb-6 animate-fade-in">
            Oracle Management System
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-delay">
            Efficiently manage your Oracle database with our comprehensive tools and features.
            Experience powerful control and optimization at your fingertips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
              link={feature.link}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ title, description, Icon, link }) => (
  <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 transform hover:-translate-y-1">
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 bg-oracle-red bg-opacity-10 p-3 rounded-full">
          <Icon strokeWidth={1.5} size={24} className="" />
        </div>
        <h3 className="ml-4 text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={link}
        className="inline-flex items-center text-oracle-red hover:text-oracle-dark-red transition duration-300 ease-in-out group"
      >
        Manage {title}
        <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
      </Link>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Oracle Management System</h2>
          <p className="text-gray-400 text-sm">
            Simplifying Oracle database management with powerful tools and features.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/users" className="hover:underline">Users</Link></li>
            <li><Link to="/roles" className="hover:underline">Roles</Link></li>
            <li><Link to="/quotas" className="hover:underline">Quotas</Link></li>
            <li><Link to="/password-policies" className="hover:underline">Password Policies</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaLinkedin size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Oracle Management System. All rights reserved.
      </div>
    </div>
  </footer>
);

export default HomePage;
