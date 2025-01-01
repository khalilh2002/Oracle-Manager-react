import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import RoleForm from "./components/RoleForm";
import QuotaForm from "./components/QuotaForm";
import PasswordPolicyForm from "./components/PasswordPolicyForm";
import SecurityPolicyForm from "./components/SecurityForm";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/users" element={<UserForm />} />
            <Route path="/roles" element={<RoleForm />} />
            <Route path="/quotas" element={<QuotaForm />} />
            <Route path="/password-policies" element={<PasswordPolicyForm />} />
            <Route path="/security-policies" element={<SecurityPolicyForm />} />
            <Route path="/" element={<h2>Welcome to the Management System</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
