import nodemailer from 'nodemailer';

export default async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: '"My App" <no-reply@myapp.com>',
    to,
    subject,
    html,
  });
}
