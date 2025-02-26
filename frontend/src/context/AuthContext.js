import { createContext, useState } from 'react';
import axios from '../api/auth';
import { sendOTP, verifyOTP } from "../api/auth"; // ✅ Use named imports

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const sendOTP = async (email) => {
        await axios.post('/auth/send-otp', { email });
    };

    const verifyOTP = async (email, otp) => {
        const response = await axios.post('/auth/verify-otp', { email, otp });
        setUser(response.data.userId);
    };

    return (
        <AuthContext.Provider value={{ user, sendOTP, verifyOTP }}>
            {children}
        </AuthContext.Provider>
    );
};
