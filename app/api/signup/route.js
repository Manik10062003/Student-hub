import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"; // or Resend

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, college, branch, specialization,
      passingYear, email, password
    } = body;

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName, lastName, college, branch, specialization,
      passingYear, email, password: hashedPassword, verified: false
    });

    await user.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS
      }
    });

    const verifyUrl = `${process.env.NEXTAUTH_URL}/api/verify?email=${email}`;
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Konnect - Verify your email",
      html: `<p>Hi ${firstName},</p>
             <p>Please verify your email by clicking the link below:</p>
             <a href="${verifyUrl}">Verify Email</a>`
    });

    return Response.json({ message: "Signup successful. Check email for verification." });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
