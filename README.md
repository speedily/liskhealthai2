# 🏥 LiskHealth AI - Privacy-First Health Tracking Platform

A revolutionary health tracking platform built on Lisk blockchain with AI-powered insights, social challenges, and $BNRY rewards. Perfect for the Lisk Builders Challenge Round Two - TBH Track.

## 🚀 Features

- **🤖 AI-Powered Insights**: Personalized health recommendations using OpenAI
- **🔐 Privacy-First Design**: All data stored locally with client-side encryption
- **💰 $BNRY Rewards**: Earn tokens for completing health goals
- **👥 Social Challenges**: Join anonymous community challenges
- **📱 Mobile Responsive**: Beautiful UI that works on all devices
- **🔗 Blockchain Integration**: Built on Lisk blockchain for transparency
- **🎯 Goal Tracking**: Set and track personalized health goals
- **🏆 Gamification**: Streaks, achievements, and leaderboards

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Blockchain**: Lisk Network, Solidity Smart Contracts
- **AI**: OpenAI GPT-3.5-turbo
- **Wallet**: MetaMask Integration
- **Storage**: Local Storage (Privacy-First)
- **UI**: Radix UI Components, Framer Motion

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- MetaMask wallet extension
- OpenAI API key (free tier available)
- Lisk Sepolia testnet tokens

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Navigate to the project directory
cd liskhealth-ai-project

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# OpenAI API Key (Required)
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here

# Lisk Network Configuration
NEXT_PUBLIC_LISK_RPC_URL=https://rpc.sepolia.lisk.com
NEXT_PUBLIC_LISK_CHAIN_ID=1891

# Smart Contract Addresses (Will be updated after deployment)
NEXT_PUBLIC_HEALTH_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

### 3. Get Your API Keys

#### OpenAI API Key (Required)
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it to your `.env.local` file

#### Lisk Sepolia Testnet Tokens (Optional)
1. Visit [Lisk Faucet](https://faucet.sepolia.lisk.com)
2. Request testnet tokens for deployment

### 4. Deploy Smart Contracts (Optional)

If you want to deploy your own contracts:

```bash
# Add your private key to .env.local
echo "PRIVATE_KEY=your_private_key_here" >> .env.local

# Deploy contracts
npx hardhat run scripts/deploy.js --network liskSepolia

# Update .env.local with the deployed contract address
```

### 5. Run the Application

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 🎯 How to Use

### 1. Connect Wallet
- Click "Connect Wallet" in the header
- Connect your MetaMask wallet
- Ensure you're on Lisk Sepolia testnet

### 2. Set Health Goals
- Click "Add Goal" in the dashboard
- Choose goal type (steps, water, sleep, calories, weight)
- Set your target and optional end date

### 3. Track Daily Progress
- Update your daily health metrics
- Watch your progress bars fill up
- Earn points and $BNRY rewards

### 4. Get AI Insights
- Receive personalized health recommendations
- Get goal suggestions based on your data
- View actionable health tips

### 5. Earn Rewards
- Complete goals to earn points
- Convert points to $BNRY tokens
- Claim rewards to your wallet

## 🏗️ Project Structure

```
liskhealth-ai-project/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── page.tsx         # Landing page
│   │   └── dashboard/       # Dashboard page
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── health/         # Health-specific components
│   │   └── blockchain/     # Blockchain components
│   ├── lib/                # Utility functions
│   │   ├── utils.ts        # General utilities
│   │   ├── ai-service.ts   # OpenAI integration
│   │   └── blockchain-service.ts # Wallet & contract integration
│   └── types/              # TypeScript type definitions
├── contracts/              # Smart contracts
│   └── HealthContract.sol  # Main health contract
├── scripts/                # Deployment scripts
└── public/                 # Static assets
```

## 🔧 Configuration

### Smart Contract Addresses
After deploying contracts, update your `.env.local`:

```bash
NEXT_PUBLIC_HEALTH_CONTRACT_ADDRESS=0x... # Your deployed contract address
```

### Network Configuration
The app is configured for Lisk Sepolia testnet by default. To change networks:

1. Update `NEXT_PUBLIC_LISK_RPC_URL` in `.env.local`
2. Update `NEXT_PUBLIC_LISK_CHAIN_ID` in `.env.local`
3. Ensure your wallet is connected to the correct network

## 🧪 Testing

```bash
# Run smart contract tests
npx hardhat test

# Run frontend tests
npm test

# Run linting
npm run lint
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔒 Privacy & Security

- **Local Storage**: All health data is stored locally in your browser
- **No Server Storage**: We don't store your personal health data
- **Client-Side Encryption**: Sensitive data is encrypted before storage
- **Anonymous Challenges**: Social features don't require personal information
- **GDPR Compliant**: Built with privacy regulations in mind

## 🎮 Gamification Features

- **Daily Streaks**: Maintain consistency with daily tracking
- **Achievement Badges**: Unlock badges for milestones
- **Leaderboards**: Compete anonymously with the community
- **Reward Points**: Earn points for every health activity
- **$BNRY Tokens**: Convert points to blockchain rewards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏆 Hackathon Submission

This project was built for the **Lisk Builders Challenge Round Two** in the **TBH Track** category.

### Track Alignment
- ✅ **Loyalty Programs**: $BNRY token rewards for health activities
- ✅ **Telco Integration**: Privacy-first design suitable for telco partnerships
- ✅ **User Engagement**: Gamification and social features
- ✅ **Blockchain Benefits**: Transparent reward distribution

### Demo Features
- Complete user onboarding flow
- Real-time health tracking
- AI-powered insights
- Blockchain reward system
- Mobile-responsive design
- Privacy-first architecture

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Join the Lisk Discord community
- Check the documentation

---

**Built with ❤️ for the Lisk ecosystem**
