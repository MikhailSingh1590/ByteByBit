require("dotenv").config();
const nodemailer = require("nodemailer");

const sendOrderConfirmation = async (req, res) => {
    const { email, order } = req.body;

    if (!email || !order || order.length === 0) {
        return res.status(400).json({ message: "Missing email or order details." });
    }

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let orderDetails = order.map(item => `${item.productName} - $${item.price.toFixed(2)}`).join("\n");
    let total = order.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Order Confirmation - ByteByBit",
        text: `Thank you for your purchase!\n\nOrder Summary:\n${orderDetails}\n\nTotal: $${total}\n\nWe appreciate your business!`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Confirmation email sent!" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error });
    }
};

module.exports = { sendOrderConfirmation };
