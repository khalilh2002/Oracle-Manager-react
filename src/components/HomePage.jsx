import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Users, Shield, Key, Lock, Server } from 'react-feather';
import orclImage from '../assets/orclbg.png'; // Import the image

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen font-oracle">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header with Image */}
          <div className="text-center mb-12 w-100">
            <img
              src={orclImage}
              alt="Oracle Logo"
              className="mx-auto h-40 w-auto mb-4"
            />
            <h1 className="text-4xl font-bold text-oracle-black mb-4">
              Oracle Management System
            </h1>
            <p className="text-xl text-oracle-gray mb-8">
              Efficiently manage your Oracle database with our comprehensive tools and features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Users"
              description="Create, modify, and delete user accounts with ease in Oracle."
              icon={<Users className="h-8 w-8 text-oracle-red" />}
              link="/users"
            />
            <FeatureCard
              title="Roles"
              description="Assign and manage roles to control user permissions in Oracle."
              icon={<Shield className="h-8 w-8 text-oracle-red" />}
              link="/roles"
            />
            <FeatureCard
              title="Quotas"
              description="Set and adjust storage quotas for users and tablespaces."
              icon={<Database className="h-8 w-8 text-oracle-red" />}
              link="/quotas"
            />
            <FeatureCard
              title="Password Policies"
              description="Implement robust password policies to enhance security."
              icon={<Key className="h-8 w-8 text-oracle-red" />}
              link="/password-policies"
            />
            <FeatureCard
              title="Security Policies"
              description="Configure and manage advanced security features for Oracle Data."
              icon={<Lock className="h-8 w-8 text-oracle-red" />}
              link="/security-policies"
            />
            <FeatureCard
              title="Data Guard"
              description="Configure, monitor, and manage Oracle Data Guard for high availability."
              icon={<Server className="h-8 w-8 text-oracle-red" />}
              link="/dataguard"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ title, description, icon, link }) => (
  <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <h3 className="text-lg font-medium text-oracle-black truncate">{title}</h3>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-oracle-gray">{description}</p>
      </div>
    </div>
    <div className="bg-gray-50 px-5 py-3">
      <Link
        to={link}
        className="text-sm font-medium text-oracle-red hover:text-oracle-dark-red transition duration-150 ease-in-out flex items-center justify-between"
      >
        Manage {title}
        <span className="text-oracle-red">&rarr;</span>
      </Link>
    </div>
  </div>
);

export default HomePage;
