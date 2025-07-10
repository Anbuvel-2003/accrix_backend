// sendMail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for port 465
    auth: {
        user: process.env.SENDINBLUE_USER,
        pass: process.env.SENDINBLUE_PASS,
    },
});

export async function sendEmail(to, subject, text, html) {
    try {
        console.log("email verificaton functionality calling ....", to, subject, text, html);
        console.log("email verificaton functionality calling ....", process.env.SENDINBLUE_USER);
        console.log("email verificaton functionality calling ....", process.env.SENDINBLUE_PASS);

        const info = await transporter.sendMail({
            from: `"Your Name" <${process.env.SENDINBLUE_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("✅ Email sent:", info.messageId);
    } catch (error) {
        console.log("process.env.SENDINBLUE_USER", process.env.SENDINBLUE_USER);
        console.log("process.env.SENDINBLUE_USER", process.env.SENDINBLUE_PASS);

        console.error("❌ Email failed:", error.message);
    }
}

