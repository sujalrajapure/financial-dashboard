"use client"

import { TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MarketMoversProps {
  onSelectStock: (stockName: string) => void
}

export function MarketMovers({ onSelectStock }: MarketMoversProps) {
  return (
    <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-green-400">Market Movers</CardTitle>
        <CardDescription className="text-green-400/70">Top gainers and losers</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers">
          <TabsList className="bg-[#0a0a14] border border-green-500/30">
            <TabsTrigger
              value="gainers"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              Top Gainers
            </TabsTrigger>
            <TabsTrigger
              value="losers"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              Top Losers
            </TabsTrigger>
            <TabsTrigger
              value="volume"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              Volume Leaders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gainers" className="mt-4">
            <div className="space-y-4">
              {topGainers.map((stock) => (
                <div
                  key={stock.name}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-green-500/10 cursor-pointer transition-colors"
                  onClick={() => onSelectStock(stock.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500/20">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-green-400">{stock.name}</p>
                      <p className="text-xs text-green-400/70">{stock.sector}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{stock.price}</p>
                    <p className="text-xs text-green-500">+{stock.change}%</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="losers" className="mt-4">
            <div className="space-y-4">
              {topLosers.map((stock) => (
                <div
                  key={stock.name}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-green-500/10 cursor-pointer transition-colors"
                  onClick={() => onSelectStock(stock.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500/20">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium text-green-400">{stock.name}</p>
                      <p className="text-xs text-green-400/70">{stock.sector}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{stock.price}</p>
                    <p className="text-xs text-red-500">{stock.change}%</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="volume" className="mt-4">
            <div className="space-y-4">
              {volumeLeaders.map((stock) => (
                <div
                  key={stock.name}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-green-500/10 cursor-pointer transition-colors"
                  onClick={() => onSelectStock(stock.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/20">
                      <span className="text-xs font-bold text-blue-500">VOL</span>
                    </div>
                    <div>
                      <p className="font-medium text-green-400">{stock.name}</p>
                      <p className="text-xs text-green-400/70">{stock.sector}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{stock.price}</p>
                    <p className="text-xs text-green-400/70">{stock.volume} Cr</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Define the missing data arrays
const topGainers = [
  { name: "Adani Ports", sector: "Infrastructure", price: 1250, change: 5.8 },
  { name: "Tata Motors", sector: "Auto", price: 850, change: 4.2 },
  { name: "SBI", sector: "Banking", price: 750, change: 3.9 },
  { name: "Bajaj Finance", sector: "Finance", price: 7200, change: 3.5 },
  { name: "NTPC", sector: "Energy", price: 325, change: 3.2 },
]

const topLosers = [
  { name: "Tech Mahindra", sector: "IT", price: 1180, change: -3.5 },
  { name: "Hindalco", sector: "Metal", price: 520, change: -2.8 },
  { name: "Cipla", sector: "Pharma", price: 1150, change: -2.5 },
  { name: "Tata Steel", sector: "Metal", price: 135, change: -2.2 },
  { name: "Coal India", sector: "Energy", price: 410, change: -1.9 },
]

const volumeLeaders = [
  { name: "Reliance Industries", sector: "Energy", price: 2500, volume: 12.5 },
  { name: "HDFC Bank", sector: "Banking", price: 1650, volume: 8.2 },
  { name: "State Bank of India", sector: "Banking", price: 750, volume: 7.5 },
  { name: "ICICI Bank", sector: "Banking", price: 1050, volume: 6.8 },
  { name: "Tata Motors", sector: "Auto", price: 850, volume: 5.4 },
]

