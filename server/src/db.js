import mongoose from "mongoose";

export const handleDbConnection = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default handleDbConnection;
