# Gojjam Bingo 🎲

A full-featured Telegram Bingo game platform with mini-app integration, real-time socket.io updates, and wallet management.

## Architecture

```
Telegram Bot
    ↓
Telegram Mini App
    ↓
React Frontend
    ↓
Socket.IO Server
    ↓
Game Engine
    ↓
PostgreSQL + Redis
```

## Project Structure

```
gojjam-bingo/
├── apps/
│   ├── bot/           # Telegram bot handlers
│   ├── web/           # React frontend
│   └── admin/         # Admin dashboard
├── services/
│   ├── game-engine/   # Bingo logic
│   ├── wallet-service/# Payment handling
│   └── notification-service/
├── database/          # SQL schemas
├── docker/            # Docker configs
└── package.json
```

## Tech Stack

- **Backend:** Node.js, Express, Telegraf, Socket.IO
- **Frontend:** React/Next.js
- **Database:** PostgreSQL + Redis
- **Infrastructure:** Docker

## Bot Commands

### User Commands
- `/start` - Welcome & game link
- `/play` - Open game
- `/wallet` - View balance
- `/deposit` - Add funds
- `/withdraw` - Cash out
- `/referral` - Share & earn
- `/history` - Transactions
- `/help` - Command list

### Admin Commands
- `/startround` - Begin round
- `/stopround` - End round
- `/callnumber <1-75>` - Call number
- `/autocaller` - Auto number calling
- `/settimer <seconds>` - Set timer
- `/banuser <id>` - Ban player
- `/broadcast <msg>` - Send announcement

## Game Flow

1. **BETTING OPEN** (60 seconds)
2. **TIMER** (60 second countdown)
3. **BETTING CLOSED**
4. **NUMBER CALLING** (Random 1-75)
5. **AUTO MARKING** (Cards auto-updated)
6. **DERASH CLAIM** (Players claim wins)
7. **SERVER VALIDATION** (Verify bingo)
8. **PAYOUT** (Distribute winnings)

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- Telegram Bot Token

### Setup

1. **Clone & Install**
```bash
git clone https://github.com/hjbin35-alt/Gojjam-Bingo.git
cd Gojjam-Bingo
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. **Database Setup**
```bash
psql -U postgres -d gojjam_bingo -f database/schema.sql
```

4. **Run Bot (Development)**
```bash
npm run dev
```

5. **Run Bot (Production)**
```bash
npm start
```

## Docker Setup

Run all services with Docker Compose:

```bash
docker-compose up -d
```

## Wallet System

- **Main Wallet:** ETB balance for betting
- **Bonus Wallet:** Promotional credits
- **Transactions:** Deposit, Withdraw, Win tracked
- **Referral:** 10% commission on referred deposits

## Database Schema

### Users
- Telegram ID, username, name
- Wallet balances (main & bonus)
- Ban status

### Cartelas (Bingo Cards)
- 5x5 grid layout (JSONB)
- Owner reference
- Round reference
- Marked status

### Rounds
- Status (pending/active/completed)
- Called numbers array
- Timestamps

### Transactions
- User reference
- Type (deposit/withdraw/win)
- Amount & status

## API Endpoints

Socket.IO Events:
- `join_room` - Player joins round
- `called_number` - New number called
- `number_update` - Broadcast number
- `player_win` - Winner announcement

## Features

✅ Telegram bot with command handlers
✅ WebApp mini-app integration
✅ Real-time Socket.IO updates
✅ PostgreSQL + Redis persistence
✅ JWT authentication
✅ Referral system
✅ Wallet management
✅ Admin controls
✅ Game logic & validation
✅ Docker deployment

## Security

- JWT token-based auth
- Password hashing (bcrypt)
- Admin-only commands
- CORS configuration
- Helmet security headers
- Environment variable protection

## Support

For issues or questions, contact @support on Telegram.

## License

MIT
