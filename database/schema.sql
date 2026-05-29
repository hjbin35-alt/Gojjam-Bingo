-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  username TEXT,
  first_name TEXT,
  wallet_balance NUMERIC DEFAULT 0,
  bonus_balance NUMERIC DEFAULT 0,
  is_banned BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Cartelas (Bingo Cards) Table
CREATE TABLE IF NOT EXISTS cartelas (
  id SERIAL PRIMARY KEY,
  number INTEGER,
  layout JSONB NOT NULL,
  owner_id INTEGER NOT NULL,
  round_id INTEGER,
  is_taken BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Rounds Table
CREATE TABLE IF NOT EXISTS rounds (
  id SERIAL PRIMARY KEY,
  status TEXT DEFAULT 'pending',
  called_numbers JSONB DEFAULT '[]',
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Wallet Transactions Table
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Winners Table
CREATE TABLE IF NOT EXISTS winners (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  round_id INTEGER NOT NULL,
  amount_won NUMERIC,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (round_id) REFERENCES rounds(id)
);

-- Referrals Table
CREATE TABLE IF NOT EXISTS referrals (
  id SERIAL PRIMARY KEY,
  referrer_id INTEGER NOT NULL,
  referred_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (referrer_id) REFERENCES users(id),
  FOREIGN KEY (referred_id) REFERENCES users(id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_cartelas_round_id ON cartelas(round_id);
CREATE INDEX IF NOT EXISTS idx_cartelas_owner_id ON cartelas(owner_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_winners_round_id ON winners(round_id);
