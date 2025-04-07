// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import crypto from 'crypto';
// import nodemailer from 'nodemailer';// Import the User model
// import User from '../Models/User.js';

// dotenv.config();

// const JWT_SECRET = process.env.ACESS_TOKEN_SECRET;
// const JWT_REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

// // Controller for user registration
// export const registerUser = async (req, res) => {
//   const { username, password, role, mobile, email } = req.body;

//   // Ensure both username and password are provided
//   if (!username || !password || !email || !mobile) {
//     return res.status(400).json({ message: 'Username, password, email, and mobile are required' });
//   }

//   try {
//     // Check if the username already exists in the database
//     const existingUser = await User.findOne({ username });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Username is already taken' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Set the default role if not provided
//     const userRole = role || 'user'; // Default to 'user' if no role is provided

//     // Create the new user
//     const user = new User({
//       username,
//       password: hashedPassword,
//       role: userRole,
//       mobile,
//       email,
//     });
//     console.log(user);

//     // Save the user to the database
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully', status: 'ok' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error registering user' });
//   }
// };


// export const registerprofession = async (req, res) => {
//   const { username, password, role, mobile, email } = req.body;

//   // Ensure both username and password are provided
//   if (!username || !password || !email || !mobile) {
//     return res.status(400).json({ message: 'Username, password, email, and mobile are required' });
//   }

//   try {
//     // Check if the username already exists in the database
//     const existingUser = await User.findOne({ username });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Username is already taken' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Set the default role if not provided
//     const userRole = role || 'profession'; // Default to 'user' if no role is provided

//     // Create the new user
//     const user = new User({
//       username,
//       password: hashedPassword,
//       role: userRole,
//       mobile,
//       email,
//     });
//     console.log(user);

//     // Save the user to the database
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully', status: 'ok' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error registering user' });
//   }
// };
// // Controller for user login
// export const loginUser = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }

//   try {
//     // Find the user by username
//     const user = await User.findOne({ username });
//     console.log(user);

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     // Compare the password with the hashed password
//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.status(400).json({ message: 'Incorrect password' });
//     }

//     // Generate access and refresh tokens
//     const { accessToken, refreshToken } = generateToken(user);
//     res.status(200).json({
//       message: 'Login successful',
//       accessToken,
//       refreshToken,
//       status: 'ok',
//       id: user.id,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error logging in' });
//   }
// };

// export const loginprofession = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }

//   try {
//     // Find the user by username
//     const user = await User.findOne({ username });
//     console.log(user);

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     // Compare the password with the hashed password
//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//       return res.status(400).json({ message: 'Incorrect password' });
//     }

//     // Generate access and refresh tokens
//     const { accessToken, refreshToken } = generateToken(user);
//     res.status(200).json({
//       message: 'Login successful',
//       accessToken,
//       refreshToken,
//       status: 'ok',
//       id: user.id,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error logging in' });
//   }
// };

// // Helper function to generate tokens
// export const generateToken = (user) => {
//   const accessToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '15m' });
//   const refreshToken = jwt.sign({ id: user.id, username: user.username }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
//   return { accessToken, refreshToken };
// };

// export const updateUser = async (req, res) => {
//   try {
//     const { userId, ...updateFields } = req.body; // Destructure userId and remaining fields
    
//     // Optional: Add input validation
//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       updateFields,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ 
//       message: "User updated successfully",
//       user: updatedUser 
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       message: "Update failed",
//       error: error.message 
//     });
//   }
// };



// export const forgetPassword = async (req, res) => {
//   const { email, mobile, username } = req.body;

//   // Validate input
//   if (!email || !mobile || !username) {
//     return res.status(400).json({ message: 'Username, email, and mobile are required' });
//   }

//   try {
//     // Check if a user exists with the provided details
//     const existingUser = await User.findOne({ email, mobile, username });
//     console.log(existingUser);

//     if (!existingUser) {
//       return res.status(404).json({ message: 'User not found with the provided details' });
//     }

//     // Generate a secure token or OTP
//     const resetToken = Math.floor(100000 + Math.random() * 900000);
//     //const resetToken = crypto.randomBytes(32).toString('hex'); 
//     const tokenExpiry = Date.now() + 60000000000; // Token valid for 10 minutes
   
//     // Save the token and expiry in the database
//     existingUser.resetPasswordToken = resetToken;
//     existingUser.resetPasswordExpires = tokenExpiry;
//     console.log(existingUser);
//     await existingUser.save();

//     // Send the reset token to the user's email or mobile
//     sendResetLink(email, resetToken); 
//     return res.status(200).json({ message: 'Password reset link has been sent to your email/mobile' , status: 'ok' });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };



// export const sendResetLink = async (email, resetToken) => {
//   try {
//     // Configure the SMTP transport
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail', // Use your email provider
//       auth: {
//         user: 'm.mannage@gmail.com', // Your email address
//         pass: 'ncycclsukyshyywm', // Your email password (use app password if u
//         // 
//         // 
//         // 
//         // 
//         // 
//       },
//     });

//     // Email content
//     //const resetLink = `http://localhost:3000/auth/reset-password?token=${resetToken}`;
//     const mailOptions = {
//       from: 'm.mannage@gmail.com', // Sender address
//       to: email, // Receiver address
//       subject: 'Password Reset Request',
//       html: `
//   <html>
//     <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f9; color: #333;">
//       <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
//         <h2 style="text-align: center; color: #333; font-size: 24px;">Password Reset Request</h2>
//         <p style="font-size: 16px; color: #555;">Hello,</p>
//         <p style="font-size: 16px; color: #555;">You have requested to reset your password.Below is your Resetting otp</p>
        
//         <p style="text-align: center; margin-top: 20px;">
//           <p style="background-color: #4CAF50; color: white; padding: 12px 20px; font-size: 16px; text-decoration: none; border-radius: 5px; display: inline-block;">${resetToken}</p>
//         </p>
        
//         <p style="font-size: 14px; color: #777; text-align: center; margin-top: 30px;">If you did not request this, please ignore this email.</p>
//       </div>
//     </body>
//   </html>
// `,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     console.log('Password reset email sent successfully.');
//   } catch (err) {
//     console.error('Error sending password reset email:', err);
//     throw new Error('Could not send email');
//   }
// };


//  export const resetPassword = async (req, res) => {
//   const { otp, newpassword } = req.body;

//   if (!otp || !newpassword) {
//     return res.status(400).json({ message: 'otp and new password are required' });
//   }

//   try {
//     // Find the user by token and check expiry
//     const user = await User.findOne({
     
//       resetPasswordToken: otp,
//       resetPasswordExpires: { $gt: Date.now() }, // Token should not be expired
//     });

//     if (!user) {
//       console.log(Date.now());
//       return res.status(400).json({ message: 'Invalid or expired token' });
//     }

//     // Update the password and clear the reset fields
//     console.log(user);
//     const hashedPassword = await bcrypt.hash(newpassword, 10);
//     user.password = hashedPassword; // Ensure password is hashed if using bcrypt
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     return res.status(200).json({ message: 'Password successfully updated' , status: 'ok'});
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto';
import nodemailer from 'nodemailer';// Import the User model
import User from '../Models/User.js';

dotenv.config();

const JWT_SECRET = process.env.ACESS_TOKEN_SECRET;
const JWT_REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Controller for user registration
export const registerUser = async (req, res) => {
  const { username, password, role, mobile, email } = req.body;

  // Ensure both username and password are provided
  if (!username || !password || !email || !mobile) {
    return res.status(400).json({ message: 'Username, password, email, and mobile are required' });
  }

  try {
    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set the default role if not provided
    const userRole = role || 'user'; // Default to 'user' if no role is provided

    // Create the new user
    const user = new User({
      username,
      password: hashedPassword,
      role: userRole,
      mobile,
      email,
    });
    console.log(user);

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully', status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
};


export const registerprofession = async (req, res) => {
  const { username, password, role, mobile, email } = req.body;

  // Ensure both username and password are provided
  if (!username || !password || !email || !mobile) {
    return res.status(400).json({ message: 'Username, password, email, and mobile are required' });
  }

  try {
    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set the default role if not provided
    const userRole = role || 'profession'; // Default to 'user' if no role is provided

    // Create the new user
    const user = new User({
      username,
      password: hashedPassword,
      role: userRole,
      mobile,
      email,
    });
    console.log(user);

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully', status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
};
// Controller for user login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password with the hashed password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = generateToken(user);
    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      status: 'ok',
      role:user.role,
      id: user.id,
      username:user.username,
      profileImage:user.profileImage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const loginprofession = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password with the hashed password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = generateToken(user);
    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      role:user.role,
      status: 'ok',
      id: user.id,
      profileImage:user.profileImage
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Helper function to generate tokens
export const generateToken = (user) => {
  const accessToken = jwt.sign({ id: user.id, username: user.username ,role:user.role, }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id, username: user.username ,role:user.role}, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

export const updateUser = async (req, res) => {
  try {
    const { userId, ...updateFields } = req.body; // Destructure userId and remaining fields
    
    // Optional: Add input validation
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ 
      message: "User updated successfully",
      user: updatedUser 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Update failed",
      error: error.message 
    });
  }
};



export const forgetPassword = async (req, res) => {
  const { email, mobile, username } = req.body;

  // Validate input
  if (!email || !mobile || !username) {
    return res.status(400).json({ message: 'Username, email, and mobile are required' });
  }

  try {
    // Check if a user exists with the provided details
    const existingUser = await User.findOne({ email, mobile, username });
    console.log(existingUser);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found with the provided details' });
    }

    // Generate a secure token or OTP
    const resetToken = Math.floor(100000 + Math.random() * 900000);
    //const resetToken = crypto.randomBytes(32).toString('hex'); 
    const tokenExpiry = Date.now() + 60000000000; // Token valid for 10 minutes
   
    // Save the token and expiry in the database
    existingUser.resetPasswordToken = resetToken;
    existingUser.resetPasswordExpires = tokenExpiry;
    console.log(existingUser);
    await existingUser.save();

    // Send the reset token to the user's email or mobile
    sendResetLink(email, resetToken); 
    return res.status(200).json({ message: 'Password reset link has been sent to your email/mobile' , status: 'ok' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};



export const sendResetLink = async (email, resetToken) => {
  try {
    // Configure the SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email provider
      auth: {
        user: 'm.mannage@gmail.com', // Your email address
        pass: 'ncycclsukyshyywm', // Your email password (use app password if u
        // 
        // 
        // 
        // 
        // 
      },
    });

    // Email content
    //const resetLink = http://localhost:3000/auth/reset-password?token=${resetToken};
    const mailOptions = {
      from: 'm.mannage@gmail.com', // Sender address
      to: email, // Receiver address
      subject: 'Password Reset Request',
      html: `
  <html>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f9; color: #333;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; color: #333; font-size: 24px;">Password Reset Request</h2>
        <p style="font-size: 16px; color: #555;">Hello,</p>
        <p style="font-size: 16px; color: #555;">You have requested to reset your password.Below is your Resetting otp</p>
        
        <p style="text-align: center; margin-top: 20px;">
          <p style="background-color: #4CAF50; color: white; padding: 12px 20px; font-size: 16px; text-decoration: none; border-radius: 5px; display: inline-block;">${resetToken}</p>
        </p>
        
        <p style="font-size: 14px; color: #777; text-align: center; margin-top: 30px;">If you did not request this, please ignore this email.</p>
      </div>
    </body>
  </html>
`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully.');
  } catch (err) {
    console.error('Error sending password reset email:', err);
    throw new Error('Could not send email');
  }
};


 export const resetPassword = async (req, res) => {
  const { otp, newpassword } = req.body;

  if (!otp || !newpassword) {
    return res.status(400).json({ message: 'otp and new password are required' });
  }

  try {
    // Find the user by token and check expiry
    const user = await User.findOne({
     
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() }, // Token should not be expired
    });

    if (!user) {
      console.log(Date.now());
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update the password and clear the reset fields
    console.log(user);
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword; // Ensure password is hashed if using bcrypt
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password successfully updated' , status: 'ok'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};