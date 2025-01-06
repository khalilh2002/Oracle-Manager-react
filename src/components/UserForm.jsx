import React, { useState, useEffect } from "react";
import { createUser, modifyUser, deleteUser, listUsers } from "../services/userService";

const UserForm = () => {
    const [users, setUsers] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showModifyForm, setShowModifyForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await listUsers();
            setUsers(response.data);
        } catch (error) {
            alert("Error fetching users: " + error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateClick = () => {
        setShowCreateForm(true);
        setShowModifyForm(false);
    };

    const handleModifyClick = (user) => {
        setSelectedUser(user);
        setShowModifyForm(true);
        setShowCreateForm(false);
    };

    const handleCancelForm = () => {
        setShowCreateForm(false);
        setShowModifyForm(false);
        setSelectedUser(null);
    };

    const handleDeleteUser = async (username) => {
        try {
            const response = await deleteUser(username);
            alert(response.data);
            fetchUsers();
        } catch (error) {
            alert("Error deleting user: " + error.response.data);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>

            {!showCreateForm && !showModifyForm && (
                <>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                        onClick={handleCreateClick}
                    >
                        Create User
                    </button>
                    <UserTable users={users} onModify={handleModifyClick} onDelete={handleDeleteUser} />
                </>
            )}

            {showCreateForm && <CreateUserForm onCancel={handleCancelForm} onUserCreated={fetchUsers} />}

            {showModifyForm && (
                <ModifyUserForm
                    onCancel={handleCancelForm}
                    user={selectedUser}
                    onUserModified={fetchUsers}
                />
            )}
        </div>
    );
};

const UserTable = ({ users, onModify, onDelete }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-gray-100">
                <tr>
                    <th className="py-2 px-4 border-b font-semibold text-gray-700">Username</th>
                    <th className="py-2 px-4 border-b font-semibold text-gray-700">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="py-2 px-4 border-b text-gray-700">{user.USERNAME}</td>
                        <td className="py-2 px-4 border-b text-gray-700">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                                onClick={() => onModify(user)}
                            >
                                Modify
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                                onClick={() => onDelete(user.USERNAME)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


const CreateUserForm = ({ onCancel, onUserCreated }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        defaultTablespace: "",
        tempTablespace: "",
        role: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        try {
            const response = await createUser(formData);
            alert(response.data);
            onUserCreated(); // Refresh user list
            onCancel();
        } catch (error) {
            alert("Error: " + error.response.data);
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create User</h2>
            <form className="space-y-4">
                <FormField label="Username" name="username" value={formData.username} onChange={handleChange} />
                <FormField label="Password" name="password" value={formData.password} onChange={handleChange} type="password" />
                <FormField label="Default Tablespace" name="defaultTablespace" value={formData.defaultTablespace} onChange={handleChange} />
                <FormField label="Temporary Tablespace" name="tempTablespace" value={formData.tempTablespace} onChange={handleChange} />
                <FormField label="Role" name="role" value={formData.role} onChange={handleChange} />

                <div className="flex space-x-4">
                    <Button onClick={handleCreate}>Create</Button>
                    <Button onClick={onCancel} className="bg-gray-400 hover:bg-gray-500">Cancel</Button>
                </div>
            </form>
        </div>
    );
};


const ModifyUserForm = ({ user, onCancel, onUserModified }) => {
    const [formData, setFormData] = useState({
        username: user ? user.USERNAME : "",
        password: "", // password shouldn't be prefilled
        defaultTablespace: user ? user.DEFAULT_TABLESPACE : "",
        tempTablespace: user ? user.TEMP_TABLESPACE : "",
        role: user ? user.ROLE : "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleModify = async () => {
        try {
            const response = await modifyUser(formData);
            alert(response.data);
            onUserModified();
            onCancel();
        } catch (error) {
            alert("Error: " + error.response.data);
        }
    };

     //Disable username change after creation
    useEffect(() => {
         if (user) {
            setFormData({
                username: user.USERNAME,
                password: "",
                defaultTablespace: user.DEFAULT_TABLESPACE || "",
                tempTablespace: user.TEMP_TABLESPACE || "",
                role: user.ROLE || "",
            });
        }
      }, [user]);

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Modify User</h2>
            <form className="space-y-4">
               <FormField label="Username" name="username" value={formData.username} onChange={handleChange} disabled={true}/>
                <FormField label="Password" name="password" value={formData.password} onChange={handleChange} type="password" />
                <FormField label="Default Tablespace" name="defaultTablespace" value={formData.defaultTablespace} onChange={handleChange} />
                <FormField label="Temporary Tablespace" name="tempTablespace" value={formData.tempTablespace} onChange={handleChange} />
                <FormField label="Role" name="role" value={formData.role} onChange={handleChange} />

                <div className="flex space-x-4">
                    <Button onClick={handleModify}>Modify</Button>
                    <Button onClick={onCancel} className="bg-gray-400 hover:bg-gray-500">Cancel</Button>
                </div>
            </form>
        </div>
    );
};



// Helper Components
const FormField = ({ label, name, value, onChange, type = "text", disabled = false }) => (
    <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
            {label}:
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
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

export default UserForm;