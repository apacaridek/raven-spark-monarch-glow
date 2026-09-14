# 🐦 DARK MONKEY LABS - COMPLETE SETUP GUIDE

## Installation & Setup

### 1. Clone Repository
```bash
git clone git@github.com:apacaridek/raven-spark-monarch-glow.git
cd raven-spark-monarch-glow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
The `.env` file has been auto-populated with your API keys:
- ✅ OpenAI / ChatGPT
- ✅ Claude (Anthropic)
- ✅ GitHub Copilot
- ✅ OpenRouter (Hermes)
- ✅ Groq
- ✅ Google Gemini
- ✅ Upstage AI
- ✅ Telegram Bot
- ✅ SSH Terminal Access

### 4. Start Services

**Backend Only:**
```bash
npm start
# or with auto-reload
npm run dev
```

**Telegram Bot:**
```bash
npm run telegram
```

**Discord Bot:**
```bash
npm run discord
```

**All Services (Recommended):**
```bash
npm run all
```

Or use the startup script:
```bash
chmod +x start.sh
./start.sh all
```

## 🎯 API Endpoints

### AI Endpoints

#### Query Any AI Provider
```bash
curl -X POST http://localhost:5000/api/ai-multi/complete \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "What is cyberpunk?",
    "provider": "openai",
    "jailbreak": true,
    "jailbreakType": "darkmode"
  }'
```

**Providers:**
- `openai` - ChatGPT (GPT-4)
- `claude` - Claude (Opus)
- `copilot` - GitHub Copilot
- `openrouter` - Hermes-3-70B
- `groq` - Mixtral-8x7b
- `gemini` - Google Gemini
- `upstage` - Upstage Solar

#### Compare All AIs
```bash
curl -X POST http://localhost:5000/api/ai-multi/compare \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain quantum computing",
    "providers": ["openai", "claude", "gemini"]
  }'
```

#### List All Providers
```bash
curl http://localhost:5000/api/ai-multi/providers
```

#### List Jailbreak Modes
```bash
curl http://localhost:5000/api/ai-multi/jailbreaks
```

### System Endpoints

#### Health Check
```bash
curl http://localhost:5000/health
```

#### System Status
```bash
curl http://localhost:5000/status
```

## 🤖 Telegram Bot Commands

Start your bot with:
```bash
npm run telegram
```

**Commands:**
- `/start` - Initialize bot
- `/help` - Show all commands
- `/ai <provider> <prompt>` - Query specific AI
- `/compare <prompt>` - Compare AIs
- `/providers` - List all models
- `/jailbreak` - Toggle jailbreak
- `/mode` - Set response style
- `/settings` - View settings

**Examples:**
```
/ai openai What is artificial intelligence?
/ai claude Explain machine learning
/ai gemini Tell me about quantum physics
/compare What is the meaning of life?
/jailbreak
/mode
```

## 🔓 Jailbreak Modes

### Available Modes:
1. **darkmode** - Unrestricted cyberpunk AI
2. **devmode** - Developer mode (no safety)
3. **roleplay** - Character roleplay
4. **hackmode** - Hacker AI (technical focus)
5. **customgpt** - Bypass all safety
6. **custom** - Custom prompt injection

**Enable Jailbreak:**
```bash
curl -X POST http://localhost:5000/api/ai-multi/complete \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Your query here",
    "provider": "openai",
    "jailbreak": true,
    "jailbreakType": "darkmode"
  }'
```

## 📊 API Key Status

Your configured API keys:
- ✅ **OpenAI**: `sk-or-v1-...`
- ✅ **Claude**: `sk-or-v1-...`
- ✅ **GitHub Copilot**: `ghu_h82X...`
- ✅ **OpenRouter**: `sk-or-v1-...`
- ✅ **Groq**: `a2b4YoDz...`
- ✅ **Gemini**: `AQ.Ab8RN6L...`
- ✅ **Upstage**: `up_6vDgf6N...`
- ✅ **Telegram**: `8890891936:AAE...`

## 🚀 Advanced Usage

### Stream Responses
```bash
curl -X POST http://localhost:5000/api/ai-multi/chat-stream \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Tell me a story",
    "provider": "openai"
  }'
```

### Custom Temperature
```bash
curl -X POST http://localhost:5000/api/ai-multi/complete \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Be creative",
    "provider": "claude",
    "temperature": 0.9,
    "maxTokens": 2000
  }'
```

### Multiple Providers at Once
```bash
curl -X POST http://localhost:5000/api/ai-multi/compare \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Solve this riddle",
    "providers": ["openai", "claude", "copilot", "groq", "gemini"]
  }'
```

## 🔧 Configuration

Edit `.env` to adjust:
```bash
# Temperature control (0.1 = conservative, 0.9 = creative)
# Port configuration
# API key management
# Log levels (debug, info, warn, error)
```

## 📱 Telegram Setup

1. **Get Bot Token:**
   - Message @BotFather on Telegram
   - Create new bot: `/newbot`
   - Copy token to `.env`

2. **Start Polling:**
   ```bash
   npm run telegram
   ```

3. **Test Commands:**
   - Message your bot: `/start`
   - Try: `/ai openai Hello!`

## 🌐 Docker Deployment

Build and run with Docker:
```bash
docker-compose up --build
```

Services will start on:
- Backend: http://localhost:5000
- MongoDB: localhost:27017

## 📈 Performance Tips

- Use Groq for fast responses
- Use Claude for complex reasoning
- Use Gemini for cost-effective queries
- Enable jailbreak for uncensored responses
- Set appropriate temperature for your use case

## 🔒 Security Notes

- Never commit `.env` with real keys
- Use environment variables in production
- Rotate API keys regularly
- Monitor usage for cost control
- Implement rate limiting

## 🐛 Troubleshooting

### Bot not responding
```bash
# Check if backend is running
curl http://localhost:5000/health

# Check logs
npm run dev
```

### API errors
```bash
# Verify keys in .env
# Check provider status
# Review rate limits
```

### Connection issues
```bash
# Ensure port 5000 is available
# Check firewall settings
# Verify API endpoints
```

## 📚 Documentation

- Telegram Bot: `docs/TELEGRAM_BOT.md`
- API Reference: Use `/health` endpoint
- GitHub: `https://github.com/apacaridek/raven-spark-monarch-glow`

## ⚡ Quick Start Commands

```bash
# One-liner setup and run all services
npm install && npm run all

# Test API
curl http://localhost:5000/status

# Query OpenAI
curl -X POST http://localhost:5000/api/ai-multi/complete \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hi!","provider":"openai"}'
```

---

**🐦 Dark Monkey Labs - The Future of AI is Now**
Built with ⚡ by apacaridek | Production Ready

