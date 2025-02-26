import { createContext, useState } from "react";
import { sendOTP, verifyOTP } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleSendOTP = async (email) => {
        await sendOTP(email);
    };

    const handleVerifyOTP = async (email, otp) => {
        const response = await verifyOTP(email, otp);
        setUser(response.data.userId);
    };

    return (
        <AuthContext.Provider value={{ user, handleSendOTP, handleVerifyOTP }}>
            {children}
        </AuthContext.Provider>
    );
};
