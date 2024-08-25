import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import handleDbConnection from "./db.js";

import router from "../routes/todo.js";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const app = express();
app.use(cors(corsOptions));

dotenv.config();
const url = process.env.MONGODB_URI;
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/todos", router);

handleDbConnection(url);

app.listen(port, () => console.log(`todo app listening on port ${port}!`));
