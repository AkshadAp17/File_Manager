import { useState, useEffect, useContext } from 'react';
import { getAllUsers, getAllFiles, deleteFile } from '../api/admin';
import { AuthContext } from '../context/AuthContext';

const AdminPanel = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userResponse = await getAllUsers();
            setUsers(userResponse.data);

            const fileResponse = await getAllFiles();
            setFiles(fileResponse.data);
        };
        fetchData();
    }, []);

    const handleDeleteFile = async (fileId) => {
        await deleteFile(fileId);
        setFiles(files.filter(file => file._id !== fileId));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Admin Panel</h1>

            <h2 className="mt-4 text-xl">Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id} className="p-2 border">{user.email}</li>
                ))}
            </ul>

            <h2 className="mt-4 text-xl">Files</h2>
            <ul>
                {files.map(file => (
                    <li key={file._id} className="p-2 border flex justify-between">
                        {file.filename} (Owner: {file.owner.email})
                        <button className="bg-red-500 text-white p-1" onClick={() => handleDeleteFile(file._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
