import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "../routes/AuthRoutes.js";
import contactRoutes from "../routes/ContactRoutes.js";
import setupSocket from "../socket.js";
import messageRoutes from "../routes/MessageRoutes.js";
import channelRoutes from "../routes/ChannelRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/channels", channelRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

const server = app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});

setupSocket(server);

mongoose
  .connect(databaseURL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err.message));
