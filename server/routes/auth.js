import express from "express";

import {
  handleRegistration,
  handleLogin,
} from "../controllers/userController.js";

const route = express.Router();

route.post("/register", handleRegistration);
route.post("/login", handleLogin);

route.get("/protected", (req, res) => {
  res.json({ msg: "This is a protected route" });
});

export default route;
