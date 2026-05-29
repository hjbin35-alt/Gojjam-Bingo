# Railway Deployment - Step by Step

## Complete Setup Guide for Gojjam Bingo Bot on Railway

---

## ✅ STEP 1: Create Railway Account

1. Go to **https://railway.app**
2. Click **"Start Free"**
3. Sign up with GitHub (recommended)
4. Authorize Railway to access your GitHub account
5. Create a new project

---

## ✅ STEP 2: Deploy from GitHub Repository

1. In Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Click **"Configure GitHub App"** if needed
4. Search for and select `hjbin35-alt/Gojjam-Bingo`
5. Click **"Deploy"**

Railway will automatically:
- ✅ Detect your `docker-compose.yml`
- ✅ Create services for bot, PostgreSQL, and Redis
- �� Build Docker image
- ✅ Start deployment

---

## ✅ STEP 3: Configure Environment Variables

Once deployment starts:

1. Go to **Project Settings** → **Variables**
2. Add the following environment variables:

```
BOT_TOKEN=8814676523:AAGr0CfENEt3vgAJRiNTJJ7U3qVwgr9_KiA
WEB_APP_URL=https://gojjam-bingo.vercel.app
JWT_SECRET=your-super-secret-jwt-key-123456
ADMIN_IDS=7519649061
NODE_ENV=production
PORT=3000
```

**Important:** 
- Change `JWT_SECRET` to something random and secure
- Keep `BOT_TOKEN` safe and secret

---

## ✅ STEP 4: Wait for Deployment

Railway will:
1. Build Docker image
2. Deploy PostgreSQL service
3. Deploy Redis service
4. Deploy Bot service

**Status indicators:**
- 🟡 Yellow = Building/Starting
- 🟢 Green = Running/Healthy
- 🔴 Red = Error

This typically takes 5-10 minutes.

---

## ✅ STEP 5: Get Your Bot URL

1. In Railway dashboard, click on the **bot service**
2. Go to **"Deployments"** tab
3. Find the **public URL** (looks like: `https://gojjam-bot-prod.up.railway.app`)
4. Copy this URL

Or check the **"Settings"** tab for the domain

---

## ✅ STEP 6: Set Telegram Webhook

Now register your bot's webhook with Telegram:

### Option A: Using curl (Command Line)

```bash
curl -X POST https://api.telegram.org/bot8814676523:AAGr0CfENEt3vgAJRiNTJJ7U3qVwgr9_KiA/setWebhook \
  -d "url=https://YOUR_RAILWAY_URL/telegram" \
  -d "allowed_updates=[\"message\",\"callback_query\"]"
```

Replace `YOUR_RAILWAY_URL` with your actual Railway URL from Step 5.

### Option B: Using Telegram BotFather

1. Message **@BotFather** on Telegram
2. Send: `/setwebhook`
3. Select your bot
4. Send: `https://YOUR_RAILWAY_URL/telegram`

### Option C: Python Script

```python
import requests

BOT_TOKEN = "8814676523:AAGr0CfENEt3vgAJRiNTJJ7U3qVwgr9_KiA"
WEBHOOK_URL = "https://YOUR_RAILWAY_URL/telegram"

response = requests.post(
    f"https://api.telegram.org/bot{BOT_TOKEN}/setWebhook",
    json={"url": WEBHOOK_URL}
)
print(response.json())
```

---

## ✅ STEP 7: Test Your Bot

1. Open Telegram
2. Search for **@Gojjam13_bot** (or your bot name)
3. Send `/start`
4. You should see: **"🎉 Welcome to Gojjam Bingo [YourName]!"**
5. Try other commands: `/help`, `/wallet`, `/play`

---

## 🔍 STEP 8: Monitor & Debug

### View Logs

1. In Railway dashboard, click **bot service**
2. Go to **"Deployments"** tab
3. Click **"View Logs"** button
4. Watch real-time logs

Look for:
```
✅ Gojjam Bingo Bot Running on port 3000
```

### Common Issues:

**Bot not responding:**
- Check webhook URL is correct
- Verify BOT_TOKEN in variables
- Check logs for errors

**Database connection failed:**
- Ensure DATABASE_URL was auto-generated
- Restart services from Railway dashboard

**Redis connection failed:**
- Ensure REDIS_URL was auto-generated
- Check Redis service is running

---

## 📊 Railway Dashboard Overview

Your project will have 3 services:

| Service | Status | Port | Database |
|---------|--------|------|----------|
| bot | 🟢 Running | 3000 | - |
| postgres | 🟢 Running | 5432 | PostgreSQL 15 |
| redis | 🟢 Running | 6379 | Redis 7 |

---

## 💾 Database Management

Railway provides:
- ✅ Automatic backups
- ✅ Connection pooling
- ✅ Auto-scaling storage

To access PostgreSQL:
1. Click **postgres service**
2. Go to **"Connect"** tab
3. Copy connection string
4. Use with `psql` client

---

## 🔄 Automatic Deployments

Railway will automatically redeploy when you:
1. Push to `main` branch on GitHub
2. Changes detected in Dockerfile or code
3. Auto-rebuilds and deploys (5-10 minutes)

---

## 📈 Scaling & Performance

### Free Tier (Sufficient for your bot):
- ✅ 500 hours/month compute
- ✅ 5GB PostgreSQL storage
- ✅ Shared Redis
- ✅ Unlimited deployments
- ✅ Custom domain support

### Premium (If needed):
- Upgrade in **Project Settings** → **Plan**

---

## 🔐 Security Best Practices

✅ **Done by Railway:**
- HTTPS enabled (automatic)
- PostgreSQL encrypted
- Redis encrypted
- DDoS protection

✅ **You should do:**
- Change `JWT_SECRET` to random value
- Don't commit `.env` file
- Rotate BOT_TOKEN if compromised
- Monitor logs for errors

---

## 📱 Bot Commands (Test These)

```
/start       - Welcome message
/play        - Open game
/wallet      - View balance
/help        - Command help
/referral    - Get referral link

[ADMIN ONLY]
/startround  - Begin round
/callnumber  - Call a number
/broadcast   - Send announcement
```

---

## ✨ You're Done! 🎉

Your Gojjam Bingo bot is now LIVE on Railway!

### Summary:
- ✅ Bot deployed and running
- ✅ PostgreSQL + Redis ready
- ✅ Webhook configured
- ✅ Automatic HTTPS
- ✅ Monitoring active

### Next Steps:
1. Invite users to @Gojjam13_bot
2. Test all commands
3. Monitor logs for issues
4. Add features as needed

### Support Links:
- Railway Docs: https://docs.railway.app
- Telegram Bot API: https://core.telegram.org/bots/api
- Your Bot: @Gojjam13_bot

---

## 📞 Troubleshooting

**Issue: "Webhook failed"**
- Check URL is HTTPS
- Ensure port is open
- Verify firewall settings

**Issue: "Database error"**
- Check DATABASE_URL variable
- Run migrations
- Check PostgreSQL logs

**Issue: "Bot offline"**
- Check bot service status
- View deployment logs
- Restart service if needed

---

Enjoy your live bot! 🚀
