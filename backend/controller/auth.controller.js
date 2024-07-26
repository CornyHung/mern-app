// Handle logic của api
import { User } from '../model/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../ultils/generateToken.js';

export async function login(req, res) {
  res.send('Login');
}

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: 'All fiedls are requried' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Password must be at least 6 characters'
        });
    }

    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already existing' });
    }

    const existingUserByUserName = await User.findOne({ username: username });

    if (existingUserByUserName) {
      return res
        .status(400)
        .json({ success: false, message: 'User Name already existing' });
    }

    // Image random

    const PROFILE_PICS = [
      '/default_avata_1.png',
      '/default_avata_2.png',
      '/default_avata_3.png'
    ];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const addUser = new User({
      email,
      password: hashPassword,
      username,
      image
    });

    generateTokenAndSetCookie(addUser._id, res);

    await addUser.save();

    res.status(200).json({
      success: true,
      user: {
        ...addUser._doc,
        password: '******'
      }
    });
  } catch (error) {
    console.log('Add User Error is: ' + error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' });
  }
}

export async function logout(req, res) {
  res.send('Logout');
}
