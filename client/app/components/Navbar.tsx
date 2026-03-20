// app/components/Navbar.tsx
import { Link, NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      {/* Links */}
      <div className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/Register"
          className={({ isActive }) =>
            isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
          }
        >
          Register
        </NavLink>

        <NavLink
          to="/careers"
          className={({ isActive }) =>
            isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"
          }
        >
          Careers
        </NavLink>
      </div>
    </nav>
  );
}
