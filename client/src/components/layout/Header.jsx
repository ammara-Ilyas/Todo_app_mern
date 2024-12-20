import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // assuming you're using react-router for navigation
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const auth = localStorage.getItem("user");
  useEffect(() => {
    if (auth) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });
  const handleLogoutUser = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-gray-300">
            Logo
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-gray-300">
              Signup
            </Link>
          </li>
          <li>
            {!isLogin ? (
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            ) : (
              <Link onClick={handleLogoutUser} className="hover:text-gray-300">
                Logout
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
