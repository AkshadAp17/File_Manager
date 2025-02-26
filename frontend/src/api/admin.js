import axios from 'axios';

export const getAllUsers = async () => {
    return await axios.get('/api/admin/users');
};

export const getAllFiles = async () => {
    return await axios.get('/api/admin/files');
};

export const deleteFile = async (fileId) => {
    return await axios.delete(`/api/admin/files/${fileId}`);
};
