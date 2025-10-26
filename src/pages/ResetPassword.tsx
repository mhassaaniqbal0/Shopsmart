import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const id = params.get("id");
  const token = params.get("token");

  const handleReset = async () => {
    if (!newPassword || !confirm) return toast.error("Please fill all fields");
    if (newPassword !== confirm) return toast.error("Passwords do not match");
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters");

    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        id,
        token,
        newPassword,
      });
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  };

  useEffect(() => {
    if (!id || !token) toast.error("Invalid or missing reset link");
  }, [id, token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-5">
        <h2 className="text-2xl font-bold text-center text-green-600">Reset Password</h2>

        <input
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-medium transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
