import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `New Portfolio Message from ${name}`,
            text: `Email: ${email}\n\nMessage:\n${message}`,
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
