import nodemailer from "nodemailer";

export const sendReminderEmail = async (toEmail, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: toEmail,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};
