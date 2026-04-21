# Telegram Bot API 🚀

Uma API moderna e robusta para integração com o Telegram Bot API, construída com **Express.js** e **TypeScript**. Permite enviar mensagens para canais, grupos e usuários do Telegram de forma simples e documentada através de uma interface REST com Swagger UI.

## 📋 Índice

- [Características](#características)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Endpoints da API](#endpoints-da-api)
- [Exemplos de Uso](#exemplos-de-uso)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Tratamento de Erros](#tratamento-de-erros)
- [Normatização de Chat IDs](#normatização-de-chat-ids)
- [Tecnologias](#tecnologias)
- [Licença](#licença)

## ✨ Características

- ✅ **API RESTful** com Express.js
- ✅ **TypeScript** para type-safety
- ✅ **Swagger/OpenAPI** documentação interativa
- ✅ **Bot Telegram** integrado
- ✅ **Validação de dados** de entrada
- ✅ **Tratamento de erros** robusto
- ✅ **Normatização automática** de Chat IDs
- ✅ **Health check** endpoint
- ✅ **Suporte a variáveis de ambiente** (.env)

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v16 ou superior)
- **npm** ou **yarn**
- **Git** (opcional)
- Um **Telegram Bot Token** (obtenha em [@BotFather](https://t.me/BotFather))

## 🔧 Instalação

### 1. Clone o repositório (ou baixe os arquivos)

```bash
git clone <url-do-repositorio>
cd bot
```

### 2. Instale as dependências

```bash
npm install
```

## ⚙️ Configuração

### 1. Crie um arquivo `.env` na raiz do projeto

```bash
cp .env.example .env
```

### 2. Configure as variáveis de ambiente

Edite o arquivo `.env` e adicione as seguintes variáveis:

```env
TELEGRAM_BOT_TOKEN=seu_token_aqui
PORT=3000
```

**Exemplo completo:**

```env
TELEGRAM_BOT_TOKEN=123456789:ABCDefGHIjklmNOpqrsTUvwxyzABCDefGH
PORT=3000
```

### 3. Obtenha seu Telegram Bot Token

1. Abra o Telegram e procure por [@BotFather](https://t.me/BotFather)
2. Use o comando `/newbot` para criar um novo bot
3. Siga as instruções do BotFather
4. Copie o token gerado

## 🚀 Como Usar

### Desenvolvimento

Inicie o servidor em modo desenvolvimento com recarregamento automático:

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000`

### Build

Compile o TypeScript para JavaScript:

```bash
npm run build
```

Os arquivos compilados serão gerados em `/dist`

### Produção

Execute a aplicação em produção:

```bash
npm start
```

### Watch Mode

Compile TypeScript em modo observação:

```bash
npm run watch
```

## 📡 Endpoints da API

### 1. Health Check

**Endpoint:** `GET /`

Verifica se a API está rodando.

**Resposta:**

```
API do bot está rodando 🚀
```

---

### 2. Enviar Mensagem

**Endpoint:** `POST /send-message`

Envia uma mensagem para um usuário, grupo ou canal no Telegram.

**Request Body:**

```json
{
  "chatId": "-1001234567890",
  "message": "Sua mensagem aqui"
}
```

**Parâmetros:**

| Campo     | Tipo   | Obrigatório | Descrição                          |
| --------- | ------ | ----------- | ---------------------------------- |
| `chatId`  | string | Sim         | ID do chat ou username do Telegram |
| `message` | string | Sim         | Conteúdo da mensagem a enviar      |

**Respostas:**

**200 - Sucesso:**

```json
{
  "sucess": true,
  "message": "Message sent successfully"
}
```

**400 - Dados inválidos:**

```json
{
  "sucess": false,
  "error": "chatId and message are required"
}
```

**500 - Erro ao enviar:**

```json
{
  "sucess": false,
  "error": "Failed to send message"
}
```

---

### 3. Documentação Swagger

**Endpoint:** `GET /docs`

Acesso à documentação interativa da API através do Swagger UI.

Visite: `http://localhost:3000/docs`

## 💡 Exemplos de Uso

### Usando cURL

#### Enviar mensagem para usuário

```bash
curl -X POST http://localhost:3000/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": "123456789",
    "message": "Olá! Esta é uma mensagem de teste 🎉"
  }'
```

#### Enviar mensagem para grupo

```bash
curl -X POST http://localhost:3000/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": "-1001234567890",
    "message": "Mensagem para o grupo!"
  }'
```

#### Enviar mensagem para canal

```bash
curl -X POST http://localhost:3000/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": "@meu_canal",
    "message": "Novo post no canal 📢"
  }'
```

### Usando JavaScript/Fetch API

```javascript
const sendMessage = async (chatId, message) => {
  try {
    const response = await fetch("http://localhost:3000/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId,
        message,
      }),
    });

    const data = await response.json();
    if (data.sucess) {
      console.log("Mensagem enviada com sucesso!");
    } else {
      console.error("Erro:", data.error);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};

// Uso
sendMessage("123456789", "Olá, teste de mensagem!");
```

### Usando Python

```python
import requests

def send_message(chat_id, message):
    url = 'http://localhost:3000/send-message'
    payload = {
        'chatId': chat_id,
        'message': message
    }

    try:
        response = requests.post(url, json=payload)
        data = response.json()

        if data.get('sucess'):
            print('Mensagem enviada com sucesso!')
        else:
            print(f'Erro: {data.get("error")}')
    except Exception as e:
        print(f'Erro na requisição: {e}')

# Uso
send_message('123456789', 'Olá, teste de mensagem!')
```

### Usando Axios (Node.js)

```javascript
const axios = require("axios");

const sendMessage = async (chatId, message) => {
  try {
    const response = await axios.post("http://localhost:3000/send-message", {
      chatId,
      message,
    });

    console.log("Resposta:", response.data);
  } catch (error) {
    console.error("Erro:", error.response?.data || error.message);
  }
};

sendMessage("123456789", "Olá, teste de mensagem!");
```

## 📚 Documentação da API

A documentação completa da API está disponível através do **Swagger UI**:

```
http://localhost:3000/docs
```

Esta interface oferece:

- ✅ Descrição de todos os endpoints
- ✅ Schemas de requisição e resposta
- ✅ Exemplos de uso
- ✅ Possibilidade de testar os endpoints diretamente

## 📁 Estrutura do Projeto

```
bot/
├── app.ts                 # Arquivo principal da aplicação
├── package.json           # Dependências e scripts
├── package-lock.json      # Lock das dependências
├── tsconfig.json          # Configuração TypeScript
├── .env                   # Variáveis de ambiente (não commitado)
├── .env.example           # Template de variáveis de ambiente
├── .editorconfig          # Configuração de editor
├── .gitignore             # Arquivos ignorados pelo Git
├── dist/                  # Arquivos compilados (gerado)
├── node_modules/          # Dependências (gerado)
├── .git/                  # Repositório Git (opcional)
└── README.md              # Este arquivo
```

## 🛠️ Scripts Disponíveis

| Script | Comando         | Descrição                                           |
| ------ | --------------- | --------------------------------------------------- |
| dev    | `npm run dev`   | Inicia a aplicação em desenvolvimento com ts-node   |
| build  | `npm run build` | Compila TypeScript para JavaScript                  |
| start  | `npm start`     | Inicia a aplicação a partir dos arquivos compilados |
| watch  | `npm run watch` | Compila TypeScript em modo observação               |

## 🔐 Variáveis de Ambiente

| Variável             | Obrigatória | Padrão | Descrição                                     |
| -------------------- | ----------- | ------ | --------------------------------------------- |
| `TELEGRAM_BOT_TOKEN` | ✅ Sim      | -      | Token do bot Telegram (obtido via @BotFather) |
| `PORT`               | ❌ Não      | 3000   | Porta na qual o servidor irá rodar            |

**Exemplo de `.env`:**

```env
# Telegram Bot Token (obrigatório)
TELEGRAM_BOT_TOKEN=123456789:ABCDefGHIjklmNOpqrsTUvwxyzABCDefGH

# Porta do servidor (opcional, padrão: 3000)
PORT=3000
```

## ⚠️ Tratamento de Erros

A aplicação implementa tratamento robusto de erros:

### Erro 400 - Bad Request

Retornado quando:

- `chatId` não é fornecido
- `message` não é fornecido
- Dados inválidos no corpo da requisição

**Resposta:**

```json
{
  "sucess": false,
  "error": "chatId and message are required"
}
```

### Erro 500 - Internal Server Error

Retornado quando:

- Falha ao enviar mensagem via Telegram
- Erro interno do servidor
- Problemas de conexão com a API do Telegram

**Resposta:**

```json
{
  "sucess": false,
  "error": "Failed to send message"
}
```

### Erro de Inicialização

Se a variável `TELEGRAM_BOT_TOKEN` não estiver definida:

```
Error: TELEGRAM_TOKEN não definido no .env
```

## 🔄 Normatização de Chat IDs

A função `normalizeChatId()` normaliza automaticamente IDs de chat:

- **Usernames**: `@canal` → `@canal` (sem alteração)
- **IDs de grupo supergrupo**: `-123456789` → `-100123456789`
- **IDs de grupo normais**: `-123456789` → `-100123456789`
- **IDs de usuário**: `123456789` → `123456789` (sem alteração)

**Exemplos:**

```typescript
normalizeChatId("@meu_canal"); // → "@meu_canal"
normalizeChatId("-1001234567890"); // → "-1001234567890"
normalizeChatId("-123456789"); // → "-100123456789"
normalizeChatId("123456789"); // → "123456789"
```

## 📦 Dependências

### Dependências de Produção

- **express** (^5.2.1) - Framework web para Node.js
- **node-telegram-bot-api** (^0.67.0) - Client Telegram Bot API
- **swagger-jsdoc** (^6.2.8) - Gerador de documentação Swagger
- **swagger-ui-express** (^5.0.1) - Interface Swagger UI
- **dotenv** (^17.4.2) - Carregamento de variáveis de ambiente

### Dependências de Desenvolvimento

- **typescript** (^6.0.3) - Linguagem TypeScript
- **ts-node** (^10.9.2) - Executor TypeScript para Node.js
- **@types/express** (^5.0.6) - Tipos TypeScript para Express
- **@types/node** (^25.6.0) - Tipos TypeScript para Node.js
- **@types/node-telegram-bot-api** (^0.64.14) - Tipos TypeScript para Telegram Bot API
- **@types/swagger-jsdoc** (^6.0.4) - Tipos TypeScript para Swagger JSDoc
- **@types/swagger-ui-express** (^4.1.8) - Tipos TypeScript para Swagger UI Express

## 🧪 Testando a Aplicação

### 1. Inicie o servidor

```bash
npm run dev
```

### 2. Teste o health check

```bash
curl http://localhost:3000
```

Resposta esperada:

```
API do bot está rodando 🚀
```

### 3. Teste o endpoint de envio de mensagem

```bash
curl -X POST http://localhost:3000/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": "SEU_CHAT_ID",
    "message": "Teste de mensagem"
  }'
```

### 4. Acesse o Swagger UI

Abra seu navegador e visite:

```
http://localhost:3000/docs
```

## 🐛 Troubleshooting

### Erro: "TELEGRAM_TOKEN não definido no .env"

**Solução:**

1. Crie um arquivo `.env` na raiz do projeto
2. Adicione: `TELEGRAM_BOT_TOKEN=seu_token_aqui`
3. Reinicie a aplicação

### Erro: "Failed to send message"

**Possíveis causas:**

- Token inválido ou expirado
- Chat ID inválido
- O bot não tem permissão para enviar mensagens naquele chat
- Problemas de conexão com a API do Telegram

**Solução:**

1. Verifique o token no `.env`
2. Verifique o Chat ID (use `/start` no bot para obter seu ID)
3. Verifique os logs do servidor para mais detalhes

### Erro: "Port already in use"

**Solução:**

1. Altere a porta no `.env`: `PORT=3001`
2. Ou encerre o processo usando a porta 3000
3. No Windows: `netstat -ano | findstr :3000`
4. Mate o processo: `taskkill /PID <PID> /F`

### TypeScript errors

**Solução:**

```bash
npm install
npm run build
```

## 📝 Como Obter o Chat ID

Para enviar mensagens, você precisa conhecer o Chat ID:

### Método 1: Usar o bot diretamente

1. Envie qualquer mensagem para o seu bot
2. Abra: `https://api.telegram.org/botSEU_TOKEN/getUpdates`
3. Procure por `"chat":{"id":123456789}`

### Método 2: Usando a API

```bash
curl "https://api.telegram.org/botSEU_TOKEN/getUpdates"
```

### Método 3: Para grupos/canais

1. Adicione o bot ao grupo
2. Envie uma mensagem mencionando o bot
3. Verifique o Chat ID na resposta da API

## 🚀 Deploy

### Heroku

1. Crie um `Procfile`:

```
web: npm start
```

2. Configure as variáveis de ambiente:

```bash
heroku config:set TELEGRAM_BOT_TOKEN=seu_token
heroku config:set PORT=3000
```

3. Faça o deploy:

```bash
git push heroku main
```

### Vercel

1. Crie um `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/app.js"
    }
  ]
}
```

2. Configure as variáveis de ambiente no painel do Vercel
3. Faça o deploy via Git

### Docker

Crie um `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Execute:

```bash
docker build -t telegram-bot-api .
docker run -p 3000:3000 -e TELEGRAM_BOT_TOKEN=seu_token telegram-bot-api
```

## 🔒 Segurança

- ✅ Não commit do arquivo `.env` (listado em `.gitignore`)
- ✅ Validação de entrada de dados
- ✅ Type-safety com TypeScript
- ✅ Tratamento de erros robusto
- ✅ Variáveis de ambiente para dados sensíveis

## 📄 Licença

Este projeto está licenciado sob a Licença ISC.

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique a seção [Troubleshooting](#troubleshooting)
2. Consulte a documentação do [Telegram Bot API](https://core.telegram.org/bots/api)
3. Revise os logs do servidor
4. Abra uma issue no repositório

## 🎯 Roadmap

- [ ] Autenticação de requisições
- [ ] Rate limiting
- [ ] Suporte a webhooks
- [ ] Testes automatizados
- [ ] Persistência de histórico de mensagens
- [ ] Suporte a mídia (imagens, vídeos)
- [ ] Suporte a mensagens com botões inline
- [ ] CI/CD pipeline

## ✅ Checklist de Boas Práticas

- [x] TypeScript configurado
- [x] Variáveis de ambiente com dotenv
- [x] Documentação Swagger
- [x] Tratamento de erros
- [x] Type-safe interfaces
- [x] Health check endpoint
- [x] README completo
- [x] Scripts úteis no package.json

---

**Desenvolvido com ❤️ usando Express.js e TypeScript**
