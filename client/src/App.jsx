import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactForm from "./components/mainComponent/contact/ContactForm";
import RegisterForm from "./components/mainComponent/contact/RegisterForm";
import LoginForm from "./components/mainComponent/contact/LoginForm";
import Navbar from "./components/layout/Header";
import PrivateComponent from "./components/mainComponent/protectComponent/PrivateComponent";
import Main from "./components/Main";
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Main />} />
            <Route path="/contact" element={<ContactForm />} />
          </Route>
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
