const nodemailer = require("nodemailer");
const logger = require("firebase-functions/logger");
const { getConfirmationHtml } = require("../utils/templates");

// Using a mock config for now since we didn't specify real SMTP details
const mockTransporter = {
  sendMail: async (options) => {
    logger.info(`[MOCK EMAIL DISPATCH] Sent to: ${options.to}`);
    logger.info(`Subject: ${options.subject}`);
    return { messageId: "mock-id-12345" };
  }
};

exports.sendConfirmationEmail = async (email, name, service, date, time) => {
  try {
    const html = getConfirmationHtml(name, service, date, time);
    
    // In production, configure nodemailer.createTransport() here
    const mailOptions = {
      from: '"Kaya Beauty Parlour" <no-reply@kayabeauty.com>',
      to: email,
      subject: "Your Appointment is Confirmed 💖",
      html: html,
    };

    const info = await mockTransporter.sendMail(mailOptions);
    logger.info("Confirmation email sent securely.");
    return info;
  } catch (error) {
    logger.error("Error sending email:", error);
    throw error;
  }
};
