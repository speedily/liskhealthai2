'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, Shield, CheckCircle, AlertCircle } from 'lucide-react'
import { useBlockchain } from '@/lib/blockchain-service'

export function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const {
    connectWallet,
    disconnectWallet,
    getConnectionStatus,
    getCurrentAddress
  } = useBlockchain()

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      const connected = getConnectionStatus()
      setIsConnected(connected)
      
      if (connected) {
        const currentAddress = await getCurrentAddress()
        setAddress(currentAddress)
      }
    }

    checkConnection()
  }, [getConnectionStatus, getCurrentAddress])

  const handleConnect = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      const result = await connectWallet()
      
      if (result.success) {
        setIsConnected(true)
        setAddress(result.address || null)
      } else {
        setError(result.error || 'Failed to connect wallet')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Connection error:', err)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    await disconnectWallet()
    setIsConnected(false)
    setAddress(null)
    setError(null)
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Wallet Connected
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                {formatAddress(address)}
              </span>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>Your data is encrypted and stored locally</span>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleDisconnect}
            className="w-full"
          >
            Disconnect Wallet
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Connect Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-800">{error}</span>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 font-bold text-sm">M</span>
            </div>
            <div className="flex-1">
              <div className="font-medium">MetaMask</div>
              <div className="text-sm text-gray-600">Connect with MetaMask wallet</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>Your data stays private and encrypted</span>
          </div>
        </div>
        
        <Button 
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full"
        >
          {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </Button>
        
                  <div className="text-xs text-gray-500 text-center">
            Don&apos;t have MetaMask?{' '}
          <a 
            href="https://metamask.io/download/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Download here
          </a>
        </div>
      </CardContent>
    </Card>
  )
} 