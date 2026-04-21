import express, { Request, Response } from 'express';
import TelegramBot from 'node-telegram-bot-api';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// ====== CONFIG ======
const TOKEN: string = process.env.TELEGRAM_BOT_TOKEN as string;
const PORT = Number(process.env.PORT) || 3000;

if (!TOKEN) {
  throw new Error('TELEGRAM_TOKEN não definido no .env');
}

const bot = new TelegramBot(TOKEN);

// ====== TYPES ======
interface SendMessageBody {
  chatId: number;
  message: string;
}

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

const swaggerSpec = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ====== ROUTES ======

/**
 * @swagger
 * /send-message:
 *   post:
 *     summary: Send a message to a Telegram chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: string
 *                 description: The ID of the Telegram chat
 *               message:
 *                 type: string
 *                 description: The message to send
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Bad request
 *      500:
 *         description: Internal server error
 */
app.post('/send-message', async (req: Request, res: Response) => {
  const { chatId, message }: SendMessageBody = req.body;

  if (!chatId || !message) {
    return res.status(400).json({
      sucess: false,
      error: 'chatId and message are required'
    });
  }

  try {
    await bot.sendMessage(chatId, message);
    return res.status(200).json({
      sucess: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      error: 'Failed to send message'
    });
  }
});

// ====== HEALTH CHECK ======
app.get('/', (_req: Request, res: Response) => {
  res.send('API do bot está rodando 🚀');
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger em http://localhost:${PORT}/docs`);
});