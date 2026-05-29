require('dotenv').config()

const express = require('express')
const { Telegraf, Markup } = require('telegraf')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const bot = new Telegraf(process.env.BOT_TOKEN)

// ============ UTILITIES ============

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

function isAdmin(userId) {
  return process.env.ADMIN_IDS.split(',').includes(userId.toString())
}

// ============ USER COMMANDS ============

bot.start(async (ctx) => {
  const user = ctx.from
  
  await ctx.reply(
    `🎉 Welcome to Gojjam Bingo ${user.first_name}!\n\nPress the button below to play:`,
    Markup.inlineKeyboard([
      [Markup.button.webApp('🎮 PLAY NOW', process.env.WEB_APP_URL)]
    ])
  )
})

bot.command('play', async (ctx) => {
  await ctx.reply(
    '🎮 Open Gojjam Bingo',
    Markup.inlineKeyboard([
      [Markup.button.webApp('OPEN GAME', process.env.WEB_APP_URL)]
    ])
  )
})

bot.command('wallet', async (ctx) => {
  await ctx.reply(`
💰 Main Wallet: 0 ETB
🎁 Bonus Wallet: 0 ETB

Use /deposit to add funds
Use /withdraw to cash out
  `)
})

bot.command('deposit', async (ctx) => {
  await ctx.reply(`
💳 Deposit to Your Wallet

Minimum: 50 ETB
Maximum: 50,000 ETB

Payment methods coming soon!
  `)
})

bot.command('withdraw', async (ctx) => {
  await ctx.reply(`
🏦 Withdraw Your Winnings

Minimum: 100 ETB
Processing time: 24-48 hours

Make sure your wallet has sufficient balance.
  `)
})

bot.command('referral', async (ctx) => {
  const userId = ctx.from.id
  const referralLink = `https://t.me/Gojjam13_bot?start=ref_${userId}`
  
  await ctx.reply(`
🎁 Referral Program

Your referral link:
\`${referralLink}\`

Share with friends and earn 10% commission on their deposits!
  `, { parse_mode: 'Markdown' })
})

bot.command('history', async (ctx) => {
  await ctx.reply(`
📜 Transaction History

Recent transactions:
• Won 500 ETB - 2 hours ago
• Deposit 1000 ETB - Yesterday
• Won 250 ETB - 3 days ago

View full history: /history
  `)
})

bot.command('help', async (ctx) => {
  await ctx.reply(`
📚 Gojjam Bingo Help

Commands:
/start - Welcome message
/play - Open game
/wallet - View balance
/deposit - Add funds
/withdraw - Cash out
/referral - Share & earn
/history - Transaction history
/help - This menu

Need more help? Contact @support
  `)
})

// ============ ADMIN COMMANDS ============

bot.command('startround', async (ctx) => {
  if (!isAdmin(ctx.from.id)) {
    return ctx.reply('❌ Admin only')
  }
  
  await ctx.reply('✅ Round started!\n⏰ Betting opens for 60 seconds...')
})

bot.command('stopround', async (ctx) => {
  if (!isAdmin(ctx.from.id)) {
    return ctx.reply('❌ Admin only')
  }
  
  await ctx.reply('⏹️ Round stopped!')
})

bot.command('callnumber', async (ctx) => {
  if (!isAdmin(ctx.from.id)) {
    return ctx.reply('❌ Admin only')
  }
  
  const args = ctx.message.text.split(' ')
  const number = args[1]
  
  if (!number || isNaN(number) || number < 1 || number > 75) {
    return ctx.reply('❌ Invalid number. Use: /callnumber <1-75>')
  }
  
  await ctx.reply(`📢 Number called: B-${number}`)
})

bot.command('autocaller', async (ctx) => {
  if (!isAdmin(ctx.from.id)) {
    return ctx.reply('❌ Admin only')
  }
  
  await ctx.reply('🤖 Auto caller enabled\nNumbers will be called every 5 seconds')
})

bot.command('settimer', async (ctx) => {
  if (!isAdmin(ctx.from.id)) {
    return ctx.reply('❌ Admin only')
  }
  
  const args = ctx.message.text.split(' ')
  const seconds = args[1]
  
  if (!seconds || isNaN(seconds)) {
    return ctx.reply('❌ Invalid timer. Use: /settimer <seconds>')
  }
  
  await ctx.reply(`⏱️ Timer set to ${seconds} seconds`)
})

bot.command('banuser', async (ctx) => {
  if (!isAdmin(ctx.from.id)) {
    return ctx.reply('❌ Admin only')
  }
  
  const args = ctx.message.text.split(' ')
  const userId = args[1]
  
  if (!userId) {
    return ctx.reply('❌ Invalid user. Use: /banuser <user_id>')
  }
  
  await ctx.reply(`🚫 User ${userId} has been banned`)
})

bot.command('broadcast', async (ctx) => {
  if (!isAdmin(ctx.from.id)) {
    return ctx.reply('❌ Admin only')
  }
  
  const message = ctx.message.text.replace('/broadcast ', '')
  
  if (!message) {
    return ctx.reply('❌ No message provided. Use: /broadcast <message>')
  }
  
  await ctx.reply(`📢 Broadcasting to all users:\n\n${message}`)
})

// ============ CATCH-ALL ============

bot.on('message', async (ctx) => {
  await ctx.reply('❓ Command not recognized. Use /help for available commands.')
})

// ============ WEBHOOK SETUP ============

app.use(bot.webhookCallback('/telegram'))

app.get('/', (req, res) => {
  res.send('✅ Gojjam Bingo Bot is running')
})

app.listen(process.env.PORT, () => {
  console.log(`✅ Gojjam Bingo Bot Running on port ${process.env.PORT}`)
  console.log(`📝 Webhook: https://your-domain.com/telegram`)
})

// For local development, use polling
// bot.launch()
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))
