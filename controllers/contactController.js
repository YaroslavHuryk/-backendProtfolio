const axios = require('axios');

exports.sendTelegramMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const token = process.env.TG_TOKEN; // Токен беремо з безпечних змінних оточення
        const chatId = process.env.TG_CHAT_ID;

        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
            chat_id: chatId,
            text: `Нове повідомлення від ${name}: ${message}, Email: ${email}`,
            parse_mode: 'HTML'
        });

        res.status(200).json({ status: 'Success' });
    } catch (error) {
        res.status(500).json({ status: 'Error', error: error.message });
    }
};