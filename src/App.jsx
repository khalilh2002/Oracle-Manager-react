import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import UserForm from "./components/UserForm";
import RoleForm from "./components/RoleForm";
import QuotaForm from "./components/QuotaForm";
import PasswordPolicyForm from "./components/PasswordPolicyForm";
import SecurityPolicyForm from "./components/SecurityForm";
import DataGuardForm from "./components/DataGuardForm";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-oracle">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UserForm />} />
            <Route path="/roles" element={<RoleForm />} />
            <Route path="/quotas" element={<QuotaForm />} />
            <Route path="/password-policies" element={<PasswordPolicyForm />} />
            <Route path="/security-policies" element={<SecurityPolicyForm />} />
            <Route path="/dataguard" element={<DataGuardForm />} />
          </Routes>
        </main>
        <footer className="bg-oracle-black text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
                <h3 className="text-xl font-bold">Oracle Management System</h3>
              </div>
              <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
                <p>&copy; 2023 Oracle. All rights reserved.</p>
              </div>
              <div className="w-full md:w-1/3 text-center md:text-right">
                <a href="#" className="text-white hover:text-oracle-red mr-4">Privacy Policy</a>
                <a href="#" className="text-white hover:text-oracle-red">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;

