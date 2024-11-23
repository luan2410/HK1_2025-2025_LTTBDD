const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/locations', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB database.');
});

// Define User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  url: { type: String },
  createdTime: { type: Date, default: Date.now }, // Automatically set to current time
});

const User = mongoose.model('Users', userSchema);

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username email url'); // Exclude password for security
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users.' });
  }
});

// Create account
app.post('/create-account', async (req, res) => {
  const { username, email, password, url } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    const newUser = new User({ username, email, password, url });
    await newUser.save();
    res.status(201).json({ message: 'Account created successfully.', userId: newUser._id });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already exists.' });
    }
    res.status(500).json({ message: 'Error creating account.' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide an email and password.' });
  }

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: 'Login successful.', user });
    } else {
      res.status(401).json({ message: 'Incorrect email or password.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error during login process.' });
  }
});

// Get user by email
app.get('/get-user', async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const user = await User.findOne({ email }, 'username email url');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user.' });
  }
});

// Change password
app.post('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Please provide email, old password, and new password.' });
  }

  try {
    const user = await User.findOne({ email, password: oldPassword });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect old password.' });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating password.' });
  }
});

// Delete account
app.delete('/delete-account', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required to delete account.' });
  }

  try {
    const result = await User.deleteOne({ email });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Account not found.' });
    }

    res.status(200).json({ message: 'Account deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting account.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
