import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const sendOTP = (email) => API.post("/auth/send-otp", { email });
export const verifyOTP = (email, otp) => API.post("/auth/verify-otp", { email, otp });
