// server/src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import handleDbConnection from "./db.js";
import router from "../routes/todo.js";

// Load environment variables
dotenv.config();

// Define CORS options
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();

// Use CORS middleware
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Database connection
const url = process.env.MONGODB_URI;
handleDbConnection(url);

// Use routes
app.use("/api/todos", router);

// Start the app
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Todo app backend listening on port ${port}!`);
});
