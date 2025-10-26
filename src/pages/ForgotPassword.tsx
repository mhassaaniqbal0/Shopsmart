import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
     const API = "http://localhost:5000/api/auth";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API}/forgot-password`, { email });
console.log('res',res)
    //   await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      toast.success("If that email exists, a reset link has been sent.");
      setEmail("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error sending reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-5">
        <h2 className="text-2xl font-bold text-center text-green-600">Forgot Password</h2>
        <p className="text-sm text-gray-600 text-center">Enter your registered email address</p>

        <input
          type="email"
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-medium transition"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Remembered your password?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Back to login
          </a>
        </p>
      </div>
    </div>
  );
}
