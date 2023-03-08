require("dotenv").config();
const adminAuth = require("../../config/firebaseconfig");
const nodemailer = require("nodemailer");

const firebaseController = {
  sendVerificationEmail: async function (req, res) {
    try {
      const { email } = req.body.data;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
      const link = await adminAuth.generateEmailVerificationLink(email);
      const mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: `${email}`,
        subject: "Verification Email Code",
        text: `Click on the link for finishing your registration
        ${link}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  },
  signupUser: async function (req, res) {
    const { email, password, password_confirmation } = req.body.data;
    try {
      const userRecord = await adminAuth.getUserByEmail(email);
      return res.status(400).json({
        error: true,
        message:
          "Email already used, for sending new verification email click ",
      });
    } catch (error) {
      if (error.code !== "auth/user-not-found") {
        return res.status(500).json({
          error: false,
          message: "Bad email format.",
        });
      }
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    try {
      if (password !== password_confirmation) {
        return res.status(401).json({
          error: false,
          message: "Password and password need to be the same.",
        });
      } else if (password === password_confirmation) {
        const userResponse = await adminAuth.createUser({
          email: email,
          password: password,
          emailVerified: false,
          disabled: false,
        });
        const link = await adminAuth.generateEmailVerificationLink(
          userResponse.email
        );
        const mailOptions = {
          from: process.env.GMAIL_USERNAME,
          to: `${userResponse.email}`,
          subject: "Verification Email Code",
          text: `Click on the link for finishing your registration
        ${link}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.error(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        return res.status(201).json({
          error: false,
          message:
            "Account created successfully, a link has been sent to your email.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: false,
        message: "Your password must contains more than 6 characters.",
      });
    }
  },
};

module.exports = firebaseController;
