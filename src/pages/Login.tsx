// src/pages/Login.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // 2FA states
  const [twoFactorMode, setTwoFactorMode] = useState<boolean>(false);
  const [twoFactorToken, setTwoFactorToken] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const navigate = useNavigate();
  const API = "http://localhost:5000/api/auth";

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  // ==================== LOGIN HANDLER ====================
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post<any>(`${API}/login`, { email, password });

      if (res.data?.twoFactorRequired) {
        setTwoFactorMode(true);
        setTwoFactorToken(res.data.twoFactorToken);
        toast("2FA code sent to your email. Enter it below.");
        setLoading(false);
        return;
      }

      const token = res.data.token;
      const user = res.data.user ?? null;

      if (token) localStorage.setItem("token", token);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else if (token) {
        try {
          const decoded: any = jwtDecode(token as unknown as string);
          const name = decoded?.name ?? decoded?.email ?? "";
          const emailFromToken = decoded?.email ?? "";
          localStorage.setItem("user", JSON.stringify({ name, email: emailFromToken }));
        } catch {
          // ignore decode errors
        }
      }

      toast.success(`Welcome back${user?.name ? `, ${user.name}` : "!"}`);
      navigate("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==================== VERIFY OTP ====================
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP code.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post<any>(`${API}/2fa/verify`, {
        twoFactorToken,
        code: otp,
      });

      const token = res.data.token;
      if (token) localStorage.setItem("token", token);
      if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");
      setTwoFactorMode(false);
      setTwoFactorToken("");
      setOtp("");
      navigate("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ==================== GOOGLE LOGIN ====================
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse?.credential;
    if (!idToken) {
      toast.error("Google sign-in failed (no token).");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post<any>(`${API}/google`, { idToken });
      const token = res.data.token;
      if (token) localStorage.setItem("token", token);
      if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google sign-in cancelled or failed.");
  };

  const cancelTwoFactor = () => {
    setTwoFactorMode(false);
    setTwoFactorToken("");
    setOtp("");
  };

  // ==================== RENDER ====================
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-5">
        {!twoFactorMode ? (
          <>
            <h2 className="text-2xl font-bold text-center text-green-600">Login</h2>
            <p className="text-sm text-gray-600 text-center">Welcome back to ShopSmart!</p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold ${
                loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              } transition`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex justify-between items-center text-sm">
              <a href="/register" className="text-green-600 hover:underline">
                Create account
              </a>
              <a href="/forgot-password" className="text-gray-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="text-center mt-4">
              <div className="inline-block">
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-green-600">Two-Factor Authentication</h2>
            <p className="text-sm text-gray-600 text-center">
              A 6-digit code was sent to your email. It expires in 5 minutes.
            </p>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex gap-2">
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className={`flex-1 py-3 rounded-lg text-white font-semibold ${
                  loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                } transition`}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                onClick={cancelTwoFactor}
                className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
