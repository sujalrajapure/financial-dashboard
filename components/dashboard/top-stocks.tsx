"use client"

import { useState } from "react"
import { ArrowDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewspaperPopup } from "@/components/newspaper-popup"

const topStocks = [
  { name: "Reliance Industries", sector: "Energy", price: 2500, change: 12.5 },
  { name: "HDFC Bank", sector: "Banking", price: 1650, change: 8.2 },
  { name: "Infosys", sector: "IT", price: 1450, change: -2.1 },
  { name: "Tata Motors", sector: "Auto", price: 850, change: 5.7 },
  { name: "Bharti Airtel", sector: "Telecom", price: 950, change: -1.3 },
]

export function TopStocks() {
  const [showNewspaper, setShowNewspaper] = useState(false)
  const [selectedStock, setSelectedStock] = useState<string | null>(null)

  const handleStockClick = (stockName: string) => {
    setSelectedStock(stockName)
    setShowNewspaper(true)
    // Play click sound
    const clickSound = new Audio("/click.mp3")
    clickSound.volume = 0.3
    clickSound.play().catch(() => {
      // Handle autoplay restrictions
      console.log("Audio autoplay was prevented")
    })
  }

  const closeNewspaper = () => {
    setShowNewspaper(false)
  }

  return (
    <>
      <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-400">Top Stocks</CardTitle>
          <CardDescription className="text-green-400/70">Click on a stock for details</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="bg-[#0a0a14] border border-green-500/30">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
              >
                All Stocks
              </TabsTrigger>
              <TabsTrigger
                value="gainers"
                className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
              >
                Gainers
              </TabsTrigger>
              <TabsTrigger
                value="losers"
                className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
              >
                Losers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {topStocks.map((stock) => (
                  <div
                    key={stock.name}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-green-500/10 cursor-pointer transition-colors"
                    onClick={() => handleStockClick(stock.name)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${stock.change > 0 ? "bg-green-500/20" : "bg-red-500/20"}`}
                      >
                        {stock.change > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-green-400">{stock.name}</p>
                        <p className="text-xs text-green-400/70">{stock.sector}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{stock.price}</p>
                      <p className={`text-xs ${stock.change > 0 ? "text-green-500" : "text-red-500"}`}>
                        {stock.change > 0 ? "+" : ""}
                        {stock.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gainers" className="mt-4">
              <div className="space-y-4">
                {topStocks
                  .filter((stock) => stock.change > 0)
                  .map((stock) => (
                    <div
                      key={stock.name}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-green-500/10 cursor-pointer transition-colors"
                      onClick={() => handleStockClick(stock.name)}
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
                {topStocks
                  .filter((stock) => stock.change < 0)
                  .map((stock) => (
                    <div
                      key={stock.name}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-green-500/10 cursor-pointer transition-colors"
                      onClick={() => handleStockClick(stock.name)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500/20">
                          <ArrowDown className="h-4 w-4 text-red-500" />
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
          </Tabs>
        </CardContent>
      </Card>

      {/* Newspaper popup */}
      {showNewspaper && selectedStock && <NewspaperPopup stock={selectedStock} onClose={closeNewspaper} />}
    </>
  )
}

