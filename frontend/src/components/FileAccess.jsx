import { useState } from 'react';
import { verifyFilePassword, downloadFile } from '../api/file';

const FileAccess = ({ file }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [accessGranted, setAccessGranted] = useState(false);

    const handleVerifyPassword = async () => {
        try {
            const response = await verifyFilePassword(file._id, password);
            if (response.data.success) {
                setAccessGranted(true);
            } else {
                setError('Incorrect password');
            }
        } catch (error) {
            setError('Access denied');
        }
    };

    return (
        <div className="p-2 border rounded-md">
            <p>{file.filename}</p>
            {accessGranted ? (
                <button className="bg-green-500 text-white p-1 ml-2" onClick={() => downloadFile(file._id)}>
                    Download File
                </button>
            ) : (
                <div>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-1 rounded"
                    />
                    <button className="bg-blue-500 text-white p-1 ml-2" onClick={handleVerifyPassword}>
                        Unlock
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default FileAccess;
