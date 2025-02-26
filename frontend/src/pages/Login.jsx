import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { handleSendOTP, handleVerifyOTP } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {step === 1 ? (
                <div>
                    <h2>Enter Email</h2>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2" />
                    <button onClick={() => { handleSendOTP(email); setStep(2); }} className="bg-blue-500 text-white p-2">
                        Send OTP
                    </button>
                </div>
            ) : (
                <div>
                    <h2>Enter OTP</h2>
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="border p-2" />
                    <button onClick={() => handleVerifyOTP(email, otp)} className="bg-green-500 text-white p-2">
                        Verify OTP
                    </button>
                </div>
            )}
        </div>
    );
};

export default Login;
