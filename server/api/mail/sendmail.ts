import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import hbs from 'nodemailer-express-handlebars';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_PORT === '465',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

transporter.use('compile', hbs())

function buildTemplate(formData: any) {
  const purposes: any = {
    'project-collabs': 'Kolaborasi Proyek',
    'connecting': 'Kerjasama',
    'services': 'Layanan',
    'general': 'Ingin Bertanya Hal Umum',
    'others': 'Lainnya',
  }
  
  return `
    <h1>Halo Cak!</h1>

    <p>Kali ini kamu ada pesan dari seseorang yang tidak dikenal yang mana sebagai berikut pesannya.</p>

    <p><strong>Nama</strong>: ${formData.get('name')}</p>
    <p><strong>Email</strong>: ${formData.get('email')}</p>
    <p><strong>Purpose</strong>: ${purposes[formData.get('purpose')] ? purposes[formData.get('purpose')] : 'Tidak diketahui'}</p>

    <p>${formData.get('message')}</p>
  `;
}

function buildEmail(formData: any) {
  transporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
    to: ["cakadi190@gmail.com", "catatancakadi@gmail.com"],
    subject: "Ada Pesan Baru Nih",
    text: "Hello world?",
    html: buildTemplate(formData),
    priority: "high",
  }, (error, info) => {
    if (error) {
      throw new Error("Cannot send! " + info.messageId);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

export default defineEventHandler(async (event) => {
  try {
    const formData = await readFormData(event);

    buildEmail(formData);

    return {
      message: "Success!",
      code: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      message: "Internal Server Error",
    };
  }
})
