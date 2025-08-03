import { defaultConfig } from "@xellar/kit";
import { Config } from "wagmi";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_WALLET_CONNECT_PROJECT_ID";
const xellarAppId = process.env.NEXT_PUBLIC_XELLAR_PROJECT_ID || "6a37990b-ba8c-4518-91a7-0de4f1ef6ff3";

// Custom Lisk Mainnet chain configuration
const liskMainnet = {
  id: 1135,
  name: 'Lisk Mainnet',
  network: 'lisk',
  nativeCurrency: {
    decimals: 18,
    name: 'Lisk',
    symbol: 'LSK',
  },
  rpcUrls: {
    public: { http: ['https://rpc.api.lisk.com'] },
    default: { http: ['https://rpc.api.lisk.com'] },
  },
  blockExplorers: {
    etherscan: { name: 'LiskScan', url: 'https://blockscout.lisk.com' },
    default: { name: 'LiskScan', url: 'https://blockscout.lisk.com' },
  },
} as const;

const config = defaultConfig({
  appName: "IDRX Treasure Hunt",
  walletConnectProjectId,
  xellarAppId,
  xellarEnv: "sandbox",
  chains: [liskMainnet],
}) as Config;

export default config; 