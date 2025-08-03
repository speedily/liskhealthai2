import Link from 'next/link'
import { MapPin, Trophy, Coins, Users, Zap, Compass } from 'lucide-react'
import { WalletConnect } from '../components/WalletConnect'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-yellow-600" />
              <span className="text-xl font-bold text-gray-900">IDRX Treasure Hunt</span>
            </div>
            <div className="flex items-center space-x-4">
              <WalletConnect />
              <Link 
                href="/dashboard" 
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Start Hunting
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Hunt for Treasures
            <span className="text-yellow-600"> Earn IDRX</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore the world, find hidden treasures, and earn IDRX rewards on the Lisk blockchain. 
            Connect your wallet and start your treasure hunting adventure!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="bg-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              Start Your Hunt
            </Link>
            <a 
              href="https://blockscout.lisk.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-50 transition-colors inline-block"
            >
              View on Explorer
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Hunt for IDRX Treasures?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Location-Based Gaming */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <Compass className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Location-Based Gaming</h3>
              <p className="text-gray-600">
                Hunt for treasures in real-world locations using GPS coordinates and blockchain verification.
              </p>
            </div>

            {/* IDRX Rewards */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
              <Coins className="h-12 w-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Earn IDRX Rewards</h3>
              <p className="text-gray-600">
                Find treasures and earn real IDRX tokens on the Lisk blockchain. The more you hunt, the more you earn!
              </p>
            </div>

            {/* Community */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600">
                Join a community of treasure hunters, compete for rewards, and discover new locations together.
              </p>
            </div>

            {/* Blockchain Security */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <Trophy className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Rewards</h3>
              <p className="text-gray-600">
                All treasures and rewards are secured on the Lisk blockchain with transparent verification.
              </p>
            </div>

            {/* Instant Payouts */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
              <Zap className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Payouts</h3>
              <p className="text-gray-600">
                Receive IDRX rewards instantly when you find treasures. No waiting, no delays!
              </p>
            </div>

            {/* Global Access */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
              <MapPin className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Access</h3>
              <p className="text-gray-600">
                Hunt for treasures anywhere in the world. The Lisk blockchain makes it possible!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How to Start Hunting
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Wallet</h3>
              <p className="text-gray-600">
                Connect your Xellar wallet to start your treasure hunting adventure.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Treasures</h3>
              <p className="text-gray-600">
                Explore locations, follow hints, and discover hidden treasures in the real world.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Earn IDRX</h3>
              <p className="text-gray-600">
                Claim your IDRX rewards instantly when you successfully find treasures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">IDRX Treasure Hunt</h3>
          <p className="text-gray-400 mb-4">
            Hunt for treasures, earn IDRX rewards on the Lisk blockchain
          </p>
          <div className="flex justify-center space-x-6">
            <a href="https://blockscout.lisk.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              Lisk Explorer
            </a>
            <a href="https://lisk.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              Lisk
            </a>
            <a href="https://xellar.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              Xellar
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
