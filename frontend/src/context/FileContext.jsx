import { createContext, useState, useEffect } from "react";
import { getFiles, uploadFile, deleteFile, shareFile } from "../api/files";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        const response = await getFiles();
        setFiles(response.data);
    };

    const handleUpload = async (file) => {
        await uploadFile(file);
        fetchFiles();
    };

    const handleDelete = async (id) => {
        await deleteFile(id);
        fetchFiles();
    };

    const handleShare = async (id) => {
        await shareFile(id);
        fetchFiles();
    };

    return (
        <FileContext.Provider value={{ files, handleUpload, handleDelete, handleShare }}>
            {children}
        </FileContext.Provider>
    );
};
