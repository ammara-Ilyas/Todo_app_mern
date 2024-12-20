import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress"; // Import MUI CircularProgress
import Box from "@mui/material/Box"; // Import MUI Box for centering the loader
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const defaultForm = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(defaultForm);
  const [verifyEmailLink, setVerifyEmailLink] = useState("");
  const [htmlContent, sethtmlContent] = useState("");

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Registration form data", formData);
    setIsLoading(true); // Start loader

    try {
      const response = await axios.post("/api/auth/register", formData);

      if (response) {
        setFormData(defaultForm); // Reset form data
        console.log(response.data.user);

        // Display success toast
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          console.log("occur in local");
        } else {
          console.log("error in local");
        }
        toast.success("Account created successfully");
        navigate("/login");
        // Assuming the verification URL is included in the response as a simple string
        const verificationUrl = response.data.verificationUrl;
        console.log("Verification URL", verificationUrl);

        sethtmlContent(response.data.html);
        setVerifyEmailLink(verificationUrl);
      }
    } catch (err) {
      if (err.response) {
        // Handle errors with response data
        console.error("err", err.response.data);
        toast.error(err.response.data.msg || "Something went wrong!");
      } else {
        // Handle network or unknown errors
        console.error("Error:", err.message);
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>

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
            className="absolute inset-y-0 right-0 mt-8 flex items-center pr-3 focus:outline-none"
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
            Register
          </button>
        )}

        {verifyEmailLink && (
          <p className="mt-4 text-green-600">
            Registration successful! Please verify your email by clicking{" "}
            <a href={verifyEmailLink} className="text-indigo-600 underline">
              here.
            </a>
          </p>
        )}

        {htmlContent && (
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        )}
      </form>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
