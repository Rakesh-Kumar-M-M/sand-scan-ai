import express from "express";

const app = express();
const PORT = 5000;

app.get("/", (_req, res) => {
	res.send("Server running...");
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://rakesh883872_db_user:rakesh_sand@cluster0.t4edtbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const JWT_SECRET = process.env.JWT_SECRET || 'change_me_secret';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error', err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  name: { type: String },
  provider: { type: String, enum: ['local', 'google'], default: 'local' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

function createToken(user) {
  return jwt.sign({ uid: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
}

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, name, provider: 'local' });
    const token = createToken(user);
    res.json({ token, user: { email: user.email, name: user.name } });
  } catch (e) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.passwordHash) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = createToken(user);
    res.json({ token, user: { email: user.email, name: user.name } });
  } catch (e) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/google', async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!GOOGLE_CLIENT_ID) return res.status(400).json({ error: 'Google client ID not set' });
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name, provider: 'google' });
    }
    const token = createToken(user);
    res.json({ token, user: { email: user.email, name: user.name } });
  } catch (e) {
    res.status(500).json({ error: 'Google sign-in failed' });
  }
});

// Verify and refresh token
app.post('/api/auth/refresh', (req, res) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Missing token' });
    const payload = jwt.verify(token, JWT_SECRET);
    const newToken = jwt.sign({ uid: payload.uid, email: payload.email, name: payload.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token: newToken });
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Auth server running on http://localhost:${PORT}`));


