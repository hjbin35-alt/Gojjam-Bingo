# Railway Deployment Guide for Gojjam Bingo Bot

## Option 1: Railway.app (Recommended - Easiest)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Create a new project

### Step 2: Connect GitHub Repository
1. Select "Deploy from GitHub"
2. Authorize Railway to access your repos
3. Select `hjbin35-alt/Gojjam-Bingo`

### Step 3: Add Services
Railway will auto-detect your `docker-compose.yml`

#### PostgreSQL Service
1. Click "Add Service"
2. Select "PostgreSQL"
3. Railway auto-generates DATABASE_URL

#### Redis Service
1. Click "Add Service"
2. Select "Redis"
3. Railway auto-generates REDIS_URL

#### Bot Service
1. Set working directory: `/`
2. Build command: Leave empty
3. Start command: `node apps/bot/index.js`

### Step 4: Environment Variables
Add to Railway Variables tab:
```
BOT_TOKEN=8814676523:AAGr0CfENEt3vgAJRiNTJJ7U3qVwgr9_KiA
WEB_APP_URL=https://gojjam-bingo.vercel.app
JWT_SECRET=your_super_secret_jwt_key_change_this
ADMIN_IDS=7519649061
NODE_ENV=production
PORT=3000
```

### Step 5: Deploy
Click "Deploy" - Railway handles everything automatically!

### Step 6: Get Your Bot URL
1. Go to Bot service → Deployments
2. Copy the public URL (e.g., `https://gojjam-bot-prod.up.railway.app`)
3. Set Telegram webhook to: `https://gojjam-bot-prod.up.railway.app/telegram`

---

## Option 2: DigitalOcean App Platform

### Step 1: Create DigitalOcean Account
1. Go to https://digitalocean.com
2. Sign up (free $200 credit)

### Step 2: Create App
1. Click "Create" → "Apps"
2. Connect GitHub repository
3. Select `Gojjam-Bingo`

### Step 3: Configure Services
DigitalOcean will detect docker-compose

#### Add Environment Variables:
```
BOT_TOKEN=your_token
WEB_APP_URL=https://gojjam-bingo.vercel.app
JWT_SECRET=your_secret_key
ADMIN_IDS=7519649061
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

### Step 4: Deploy
Click "Create Resources" - DigitalOcean deploys automatically

---

## Option 3: Docker Hub + VPS (Advanced)

### Step 1: Build Docker Image
```bash
docker build -f docker/Dockerfile.bot -t yourusername/gojjam-bot:latest .
```

### Step 2: Push to Docker Hub
```bash
docker login
docker push yourusername/gojjam-bot:latest
```

### Step 3: Deploy on VPS
```bash
# SSH into your server
ssh root@your_vps_ip

# Pull and run
docker pull yourusername/gojjam-bot:latest
docker run -d \
  --name gojjam-bot \
  -e BOT_TOKEN=your_token \
  -e DATABASE_URL=postgresql://... \
  -e REDIS_URL=redis://... \
  -p 3000:3000 \
  yourusername/gojjam-bot:latest
```

---

## Update Telegram Webhook

After deployment, register your webhook with Telegram:

```bash
curl -X POST https://api.telegram.org/bot<BOT_TOKEN>/setWebhook \
  -d "url=https://your-deployment-url.com/telegram"
```

Example:
```bash
curl -X POST https://api.telegram.org/bot8814676523:AAGr0CfENEt3vgAJRiNTJJ7U3qVwgr9_KiA/setWebhook \
  -d "url=https://gojjam-bot-prod.up.railway.app/telegram"
```

---

## Monitoring & Logs

### Railway:
- Dashboard → Deployments → View Logs

### DigitalOcean:
- App Platform → Components → Logs

### Local Testing:
```bash
npm run dev
```

---

## Troubleshooting

### Bot not responding:
1. Check webhook URL is correct
2. Verify BOT_TOKEN in environment
3. Check logs for errors

### Database connection failed:
1. Verify DATABASE_URL in environment
2. Check database service is running
3. Restart service from dashboard

### Redis connection failed:
1. Verify REDIS_URL in environment
2. Check Redis service status
3. Restart from dashboard

---

## Security Checklist

✅ Use strong `JWT_SECRET`
✅ Keep `BOT_TOKEN` secret (use env vars)
✅ Enable HTTPS (automatic on Railway/DigitalOcean)
✅ Restrict admin commands to `ADMIN_IDS`
✅ Use database backups
✅ Monitor logs for errors

---

## Next Steps

1. Choose your platform (Railway recommended)
2. Create account
3. Connect GitHub
4. Deploy
5. Update webhook URL
6. Test bot commands

Enjoy! 🚀