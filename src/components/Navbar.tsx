import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-secondary text-pink-800 shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-wide text-pink-800">ShopSmart</Link>
      <div className="space-x-4 text-sm">
        <Link to="/login" className="hover:underline text-pink-800">Login</Link>
        <Link to="/register" className="hover:underline text-pink-800">Register</Link>
      </div>
    </nav>
  );
}
