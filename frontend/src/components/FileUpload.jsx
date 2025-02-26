import { useState } from 'react';
import { uploadFile } from '../api/file';

const FileUpload = ({ userId, onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert('Select a file first');

        const formData = new FormData();
        formData.append('filename', file.name);
        formData.append('filepath', URL.createObjectURL(file));
        formData.append('owner', userId);
        formData.append('password', password);

        await uploadFile(formData);
        onUploadSuccess();
        setFile(null);
        setPassword('');
    };

    return (
        <div className="p-2 border rounded-md">
            <input type="file" onChange={handleFileChange} className="border p-1 rounded" />
            <input 
                type="password" 
                placeholder="Set Password (Optional)" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="border p-1 rounded ml-2"
            />
            <button className="bg-blue-500 text-white p-1 ml-2" onClick={handleUpload}>
                Upload
            </button>
        </div>
    );
};

export default FileUpload;
