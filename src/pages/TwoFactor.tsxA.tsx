import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function TwoFactor() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      toast.success("OTP sent to your email!");
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, code });
      localStorage.setItem("token", res.data.token);
      toast.success("2FA verified successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-5">
        <h2 className="text-2xl font-bold text-center text-green-600">Two-Factor Authentication</h2>

        <input
          type="email"
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSendCode} className="w-full bg-green-600 text-white py-3 rounded-lg">
          Send OTP
        </button>

        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Enter OTP"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button onClick={handleVerifyCode} className="w-full bg-green-600 text-white py-3 rounded-lg">
          Verify OTP
        </button>
      </div>
    </div>
  );
}
