// api/server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from '../routes/AuthRoutes.js';
import contactRoutes from '../routes/ContactRoutes.js';
import messageRoutes from '../routes/MessageRoutes.js';
import channelRoutes from '../routes/ChannelRoutes.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

app.use('/uploads/profiles', express.static('uploads/profiles'));
app.use('/uploads/files', express.static('uploads/files'));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/channels', channelRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

// Export the express app as a serverless function
export default (req, res) => {
  // Connect to the database and handle requests
  mongoose.connect(process.env.DATABASE_URL).then(() => {
    app(req, res);
  }).catch(error => {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection error' });
  });
};
