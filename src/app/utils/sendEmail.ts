import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.smtp_auth_user,
      pass: config.smtp_auth_pass,
    },
  });

  await transporter.sendMail({
    from: 'mdrabbybd474@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 mins.', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
