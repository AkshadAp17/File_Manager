import { useState } from 'react';
import { shareFile } from '../api/file';

const FileShare = ({ fileId, onShareSuccess }) => {
    const [targetUserId, setTargetUserId] = useState('');

    const handleShare = async () => {
        if (targetUserId) {
            await shareFile(fileId, targetUserId);
            onShareSuccess();
            setTargetUserId('');
        }
    };

    return (
        <div className="p-2 border rounded-md">
            <input
                type="text"
                placeholder="Enter User ID to share"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                className="border p-1 rounded"
            />
            <button className="bg-green-500 text-white p-1 ml-2" onClick={handleShare}>
                Share
            </button>
        </div>
    );
};

export default FileShare;
