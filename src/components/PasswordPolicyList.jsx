import React, { useState, useEffect } from "react";
import {
    createPolicy,
    assignPolicyToUser,
    deletePolicy,
    listPasswordPolicies,
} from "../services/passwordPolicyService";

const PasswordPolicyManagement = () => {
    const [policies, setPolicies] = useState([]);
    const [deleteProfileName, setDeleteProfileName] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [policyFormData, setPolicyFormData] = useState({
        profileName: "",
        passwordLifeTime: 0,
        passwordReuseTime: 0,
        passwordLockTime: 0,
    });
    const [assignFormData, setAssignFormData] = useState({
        username: "",
        profileName: "",
    });

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showAssignForm, setShowAssignForm] = useState(false);
    const [assignPolicyProfile, setAssignPolicyProfile] = useState("");

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const data = await listPasswordPolicies();
                setPolicies(data);
            } catch (error) {
                console.error("Error fetching policies:", error);
                alert("Error: " + (error.response?.data || error.message));
            }
        };
        fetchPolicies();
    }, []);

    const handlePolicyChange = (e) => {
        const { name, value } = e.target;
        setPolicyFormData({ ...policyFormData, [name]: value });
    };

    const handleAssignChange = (e) => {
        const { name, value } = e.target;
        setAssignFormData({ ...assignFormData, [name]: value });
    };

    const handleCreatePolicy = async () => {
        try {
            const response = await createPolicy(policyFormData);
            alert(response.data);
            setShowCreateForm(false);
            const updatedPolicies = await listPasswordPolicies();
            setPolicies(updatedPolicies);
        } catch (error) {
            alert("Error: " + error.response?.data || error.message);
        }
    };

    const handleAssignPolicy = async () => {
        try {
            const response = await assignPolicyToUser(assignFormData);
            alert(response.data);
            setShowAssignForm(false);
            setAssignPolicyProfile("");
             // Reset assign form data after successful submission
            setAssignFormData({ username: "", profileName: "" });
        } catch (error) {
            alert("Error: " + error.response?.data || error.message);
        }
    };

    const handleDeletePolicy = async (profileName) => {
        setIsDeleting(true);
        setDeleteProfileName(profileName);
        try {
            const response = await deletePolicy({ profileName });
            alert(response.data);
            setPolicies(policies.filter(policy => policy.PROFILE !== profileName));
        } catch (error) {
            console.error("Error deleting policy:", error);
            alert("Error: " + (error.response?.data || error.message));
        } finally {
            setIsDeleting(false);
            setDeleteProfileName("");
        }
    };

    const handleCreateButtonClick = () => {
        setShowCreateForm(true);
    };

    const handleAssignClick = (profileName) => {
        setAssignPolicyProfile(profileName);
        setAssignFormData({ ...assignFormData, profileName: profileName });
        setShowAssignForm(true);
    };

    const handleDeleteClick = (profileName) => {
        handleDeletePolicy(profileName);
    };

    const handleCancel = () => {
        setShowCreateForm(false);
        setShowAssignForm(false);
        setAssignPolicyProfile("");
         // Reset assign form data when canceling
          setAssignFormData({ username: "", profileName: "" });
    };

    return (
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Password Policy Management</h1>
                {showCreateForm ? (
                    <CreatePolicyForm
                        policyFormData={policyFormData}
                        handlePolicyChange={handlePolicyChange}
                        handleCreatePolicy={handleCreatePolicy}
                        handleCancel={handleCancel}
                    />
                ) : showAssignForm ? (
                    <AssignPolicyForm
                        assignFormData={assignFormData}
                        handleAssignChange={handleAssignChange}
                        handleAssignPolicy={handleAssignPolicy}
                        handleCancel={handleCancel}
                        assignPolicyProfile={assignPolicyProfile}
                    />
                ) : (
                    <PolicyList
                        policies={policies}
                        handleCreateButtonClick={handleCreateButtonClick}
                        handleAssignClick={handleAssignClick}
                        handleDeleteClick={handleDeleteClick}
                        isDeleting={isDeleting}
                        deleteProfileName={deleteProfileName}
                    />
                )}
            </div>
        </div>
    );
};

const CreatePolicyForm = ({ policyFormData, handlePolicyChange, handleCreatePolicy, handleCancel }) => (
    <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transition-all duration-300 ease-in-out transform hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Password Policy</h2>
        <form className="space-y-4">
            <FormField
                label="Profile Name"
                name="profileName"
                value={policyFormData.profileName}
                onChange={handlePolicyChange}
            />
            <FormField
                label="Password Life Time (days)"
                name="passwordLifeTime"
                value={policyFormData.passwordLifeTime}
                onChange={handlePolicyChange}
                type="number"
            />
            <FormField
                label="Password Reuse Time (days)"
                name="passwordReuseTime"
                value={policyFormData.passwordReuseTime}
                onChange={handlePolicyChange}
                type="number"
            />
            <FormField
                label="Password Lock Time (days)"
                name="passwordLockTime"
                value={policyFormData.passwordLockTime}
                onChange={handlePolicyChange}
                type="number"
            />
            <div className="flex justify-end space-x-4 mt-6">
                <Button onClick={handleCancel} className="bg-gray-400 hover:bg-gray-500">
                    Cancel
                </Button>
                <Button onClick={handleCreatePolicy}>Create Policy</Button>
            </div>
        </form>
    </div>
);

const AssignPolicyForm = ({ assignFormData, handleAssignChange, handleAssignPolicy, handleCancel, assignPolicyProfile }) => (
    <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transition-all duration-300 ease-in-out transform hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Assign Password Policy</h2>
        <form className="space-y-4">
            <FormField
                label="Username"
                name="username"
                value={assignFormData.username}
                onChange={handleAssignChange}
            />
            <FormField
                label="Profile Name"
                name="profileName"
                value={assignPolicyProfile}
                readOnly
            />
            <div className="flex justify-end space-x-4 mt-6">
                <Button onClick={handleCancel} className="bg-gray-400 hover:bg-gray-500">
                    Cancel
                </Button>
                <Button onClick={handleAssignPolicy}>Assign Policy</Button>
            </div>
        </form>
    </div>
);

const PolicyList = ({ policies, handleCreateButtonClick, handleAssignClick, handleDeleteClick, isDeleting, deleteProfileName }) => (
    <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transition-all duration-300 ease-in-out transform hover:shadow-xl">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Password Policies</h2>
            <Button onClick={handleCreateButtonClick}>
                Create Policy
            </Button>
        </div>

        {policies.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Profile Name</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Resource Name</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Limit</th>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {policies.map((policy, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap">{policy.PROFILE}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{policy.RESOURCE_NAME}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{policy.LIMIT}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleAssignClick(policy.PROFILE)}
                                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm transition duration-150 ease-in-out"
                                        >
                                            Assign
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(policy.PROFILE)}
                                            disabled={isDeleting && deleteProfileName === policy.PROFILE}
                                            className={`bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm transition duration-150 ease-in-out ${isDeleting && deleteProfileName === policy.PROFILE ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {isDeleting && deleteProfileName === policy.PROFILE ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <p className="text-gray-600 text-center py-4">No policies found.</p>
        )}
    </div>
);

const FormField = ({ label, name, value, onChange, type = "text", readOnly = false }) => (
    <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
            {label}:
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
        />
    </div>
);

const Button = ({ onClick, children, className = "" }) => (
    <button
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${className}`}
        type="button"
        onClick={onClick}
    >
        {children}
    </button>
);

export default PasswordPolicyManagement;