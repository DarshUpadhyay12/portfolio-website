const Contact = require('../models/contactModel');
const nodemailer = require('nodemailer');

const submitContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // 1. Save to Database
        const contact = await Contact.create({
            name,
            email,
            message
        });

        // 2. Send Email Notification
        const senderEmail = process.env.EMAIL_USER;
        const senderPass = process.env.EMAIL_PASS;
        const recipientEmail = 'darshupadhyay14@gmail.com';

        if (senderEmail && senderPass) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: senderEmail,
                    pass: senderPass,
                },
            });

            const mailOptions = {
                from: senderEmail,
                to: recipientEmail,
                subject: `New Portfolio Contact from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            } catch (emailError) {
                console.error('Failed to send email:', emailError);
                // We log the error but still return success to frontend because the message is saved in DB
            }
        } else {
            console.log('Email credentials not provided in .env. Skipping email notification.');
        }

        res.status(201).json({ success: true, message: 'Message received and saved!' });
    } catch (error) {
        console.error('Error in submitContactMessage:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getContactMessages = async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    submitContactMessage,
    getContactMessages
};
