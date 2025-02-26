import axios from 'axios';

export const uploadFile = async (file, userId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    return await axios.post('/api/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const getUserFiles = async (userId) => {
    return await axios.get(`/api/files/user/${userId}`);
};

export const shareFile = async (fileId, targetUserId) => {
    return await axios.post('/api/files/share', { fileId, targetUserId });
    
};


export const getSharedFiles = async (userId) => {
    return await axios.get(`/api/files/shared/${userId}`);
};

export const verifyFilePassword = async (fileId, password) => {
    return await axios.post('/api/files/verify-password', { fileId, password });
};

