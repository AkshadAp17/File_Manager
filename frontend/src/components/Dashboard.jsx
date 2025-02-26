import { useState, useEffect, useContext } from 'react';
import { getUserFiles, getSharedFiles } from '../api/file';
import { AuthContext } from '../context/AuthContext';
import FileUpload from '../components/FileUpload';
import FileShare from '../components/FileShare';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [files, setFiles] = useState([]);
    const [sharedFiles, setSharedFiles] = useState([]);

    const fetchFiles = async () => {
        if (user) {
            const userFiles = await getUserFiles(user);
            setFiles(userFiles.data);

            const shared = await getSharedFiles(user);
            setSharedFiles(shared.data);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [user]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <FileUpload userId={user} onUploadSuccess={fetchFiles} />

            <h2 className="mt-4 text-xl">Your Files</h2>
            <ul>
                {files.map(file => (
                    <li key={file._id} className="p-2 border">
                        {file.filename} 
                        <FileShare fileId={file._id} onShareSuccess={fetchFiles} />
                    </li>
                ))}
            </ul>

            <h2 className="mt-4 text-xl">Shared Files</h2>
            <ul>
                {sharedFiles.map(file => (
                    <li key={file._id} className="p-2 border">
                        {file.filename} (Shared with you)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
