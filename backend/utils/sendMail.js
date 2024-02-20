import nodemailer from "nodemailer";

export const sendMail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "harsh0030sahu@gmail.com",
      pass: "clvr fbmg earx cuym",
    },
  });

  const mailOptions = {
    from: "harsh0030sahu@gmail.com",
    to: email,
    subject: `${subject}`,
    text: `${text}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Eamil sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: `Email send failed with error: ${error}`,
    };
  }
};
