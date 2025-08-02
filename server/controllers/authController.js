import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        console.log(email);
        const user = await User.findOne({email})
        console.log(user);
        
        if(!user) {
            res.status(404).json({success: false, error: "User not found"})
            console.log("Hi");
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            res.status(404).json({success: false, error: "Wrong password"})
            return
        }

        const token = jwt.sign({
            _id: user._id, 
            role: user.role},
            process.env.JWT_KEY, {expiresIn: "10d"}
        )

        res.status(200).json({success: true, 
            token, 
            user: {_id: user.id, name: user.name, role: user.role},})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

const verify = (req, res) => {
    return res.status(200).json({success: true, user: req.user})
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ success: false, error: 'Email is required' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' })
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetTokenExpiry = Date.now() + 3600000 // 1 hour expiry

        // Save token and expiry to user document
        user.resetPasswordToken = resetToken
        user.resetPasswordExpires = resetTokenExpiry
        await user.save()

        // Create reset URL
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`
        console.log("Reset URL:", resetUrl);


        // Setup nodemailer transporter (configure your SMTP settings)
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST ,
            port: process.env.SMTP_PORT ,
            secure: true,
            auth: {
                user: process.env.SMTP_USER ,
                pass: process.env.SMTP_PASS ,
            }
        })

        // Email message options
        let message = {
            from: process.env.SMTP_FROM ,
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
            html: `<p>You requested a password reset.</p><p>Please click the following link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`
        }

        // Send email
        await transporter.sendMail(message)

        res.status(200).json({ success: true, message: 'Password reset instructions sent to your email' })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Token not expired
    });

    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid or expired token" });
    }

    // Hash and set new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {login, verify, forgotPassword, resetPassword}
