const express = require('express');
const { Resend } = require('resend');
const router = express.Router();

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY); // Store API key securely in environment variables

// Email route
router.post('/send-confirmation', async (req, res) => {
    const { email, name, address, payment, order } = req.body;

    // Construct the email content
    const emailContent = `
        <h1>Hi ${name},</h1>
        <p>Thank you for your order!</p>
        <p><strong>Shipping Address:</strong> ${address}</p>
        <p><strong>Payment Method:</strong> ${payment}</p>
        <h2>Order Details:</h2>
        <ul>
            ${order.map(item => `<li>${item.productName} - $${item.price.toFixed(2)}</li>`).join('')}
        </ul>
        <p>Thank you for shopping with <strong>ByteByBit</strong>!</p>
    `;

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev', // Replace with a verified domain email if required
            to: email,
            subject: 'Order Confirmation - ByteByBit',
            html: emailContent
        });

        res.status(200).json({ message: 'Confirmation email sent!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

module.exports = router;
