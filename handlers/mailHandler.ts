import { RequestHandler } from './types';
import { createTransport, SendMailOptions } from 'nodemailer';

const mailHandler: RequestHandler = async (req, res, _query) => {
  try {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'zeruin.arerrano@gmail.com',
        pass: '',
      },
    });

    const mailOptions: SendMailOptions = {
      from: 'personal@zekumoru.com',
      to: 'dev@zekumoru.com',
      subject: 'Sending email from NodeJS!',
      text: "Let's gooooo!!",
    };

    await transporter.sendMail(mailOptions);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Mail sent!</h1>');
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.write('<h1>500 Could not send mail!</h1>');
  }

  return res.end();
};

export default mailHandler;
