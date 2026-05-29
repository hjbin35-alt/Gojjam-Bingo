#!/bin/bash
set -e

echo "🚀 Deploying Gojjam Bingo Bot..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from .env.example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}Please edit .env with your credentials before deploying.${NC}"
    exit 1
fi

# Load environment variables
export $(cat .env | grep -v '#' | xargs)

echo -e "${BLUE}📦 Building Docker image...${NC}"
docker build -f docker/Dockerfile.bot -t gojjam-bot:latest .

echo -e "${BLUE}🐳 Starting Docker Compose services...${NC}"
docker-compose up -d

echo -e "${BLUE}⏳ Waiting for services to be healthy...${NC}"
sleep 10

# Check if services are running
if docker-compose ps | grep -q "healthy"; then
    echo -e "${GREEN}✅ Services are healthy!${NC}"
else
    echo -e "${YELLOW}⚠️  Some services may still be starting...${NC}"
fi

echo -e "${BLUE}📝 Setting up webhook...${NC}"
WEBHOOK_URL=${WEBHOOK_URL:-"https://your-domain.com/telegram"}

curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
    -d "url=${WEBHOOK_URL}" \
    -d "allowed_updates=[\"message\",\"callback_query\"]"

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo -e "${BLUE}Bot running at: http://localhost:3000${NC}"
echo -e "${BLUE}Webhook: ${WEBHOOK_URL}${NC}"
echo ""
echo "📋 View logs:"
echo "  docker-compose logs -f bot"
echo ""
echo "🛑 Stop services:"
echo "  docker-compose down"