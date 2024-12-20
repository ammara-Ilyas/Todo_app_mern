import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import CircularProgress from "@mui/material/CircularProgress"; // Import MUI CircularProgress
import Box from "@mui/material/Box"; // Import MUI Box for centering the loader

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log("login form data", formData);
    setIsLoading(true); // Start loading spinner

    try {
      const response = await axios.post("/api/auth/login", formData);

      if (response.status === 200) {
        // Save token to local storage
        localStorage.setItem("token", response.data.token);

        // Reset form fields
        setFormData({
          email: "",
          password: "",
        });

        // Display success toast
        toast.success("Login successful!");

        // Redirect to home page
        navigate("/");
      }
    } catch (err) {
      console.error("Error:", err);

      if (err.response) {
        // Display error toast with server response message
        toast.error(err.response.data.msg || "Invalid credentials!");
      } else {
        // Handle network or unknown errors
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <div>
      <form
        onSubmit={loginHandler}
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"} // Toggle type between text and password
            name="password"
            value={password}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0  mt-8  flex items-center pr-3 focus:outline-none"
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-500" />
            ) : (
              <FaEye className="text-gray-500" />
            )}
          </button>
        </div>

        {/* Show loader or submit button */}
        {isLoading ? (
          <Box className="flex justify-center my-4">
            <CircularProgress />
          </Box>
        ) : (
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Login
          </button>
        )}
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
