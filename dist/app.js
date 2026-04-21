"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// ====== CONFIG ======
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const PORT = Number(process.env.PORT) || 3000;
if (!TOKEN) {
    throw new Error('TELEGRAM_TOKEN não definido no .env');
}
const bot = new node_telegram_bot_api_1.default(TOKEN);
// ====== SWAGGER CONFIG ======
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Telegram Bot API',
        version: '1.0.0',
        description: 'API for sending messages via Telegram Bot',
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['./app.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
function normalizeChatId(chatId) {
    let id = String(chatId);
    if (id.startsWith('@')) {
        return id;
    }
    if (id.startsWith('-100')) {
        return id;
    }
    if (id.startsWith('-')) {
        return `-100${id.substring(1)}`;
    }
    return id;
}
// ====== ROUTES ======
/**
 * @swagger
 * /send-message:
 *   post:
 *     summary: Enviar mensagem para um canal ou grupo
 *     tags: [Telegram]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chatId
 *               - message
 *             properties:
 *               chatId:
 *                 type: string
 *                 example: "-1001234567890"
 *               message:
 *                 type: string
 *                 example: "Olá mundo 🚀"
 *     responses:
 *       200:
 *         description: Mensagem enviada com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao enviar mensagem
 */
app.post('/send-message', async (req, res) => {
    const { chatId, message } = req.body;
    if (!chatId || !message) {
        return res.status(400).json({
            sucess: false,
            error: 'chatId and message are required'
        });
    }
    try {
        await bot.sendMessage(normalizeChatId(chatId), message);
        return res.status(200).json({
            sucess: true,
            message: 'Message sent successfully'
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            sucess: false,
            error: 'Failed to send message',
        });
    }
});
// ====== HEALTH CHECK ======
app.get('/', (_req, res) => {
    res.send('API do bot está rodando 🚀');
});
// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Swagger em http://localhost:${PORT}/docs`);
});
