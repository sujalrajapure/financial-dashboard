"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketIndices } from "@/components/market/market-indices"
import { MarketMovers } from "@/components/market/market-movers"
import { MarketHeatmap } from "@/components/market/market-heatmap"
import { MarketNews } from "@/components/market/market-news"
import { StockDetail } from "@/components/market/stock-detail"
import { MarketSentiment } from "@/components/market/market-sentiment"

export default function MarketPage() {
  const [selectedStock, setSelectedStock] = useState<string | null>(null)

  return (
    <div className="container mx-auto p-4 text-green-400">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-bg.svg')] bg-repeat"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-green-500/10 to-transparent"></div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Market header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-500">Market Overview</h1>
            <p className="text-green-400/70">Live market data and analysis</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-500/50" />
            <Input
              type="search"
              placeholder="Search for stocks..."
              className="pl-8 bg-[#0a0a14] border-green-500/30 text-green-400 w-full md:w-[300px]"
            />
          </div>
        </div>

        {/* Market indices */}
        <MarketIndices />

        {/* Market tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-[#0f1117] border border-green-500/30 w-full justify-start">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="heatmap"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              Heatmap
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              News
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MarketMovers onSelectStock={setSelectedStock} />
              </div>
              <div>
                <MarketSentiment />
              </div>
            </div>

            {selectedStock && (
              <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-400">Stock Detail</CardTitle>
                  <CardDescription className="text-green-400/70">Detailed analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <StockDetail stockName={selectedStock} />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="heatmap" className="mt-6">
            <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-400">Market Heatmap</CardTitle>
                <CardDescription className="text-green-400/70">Sector and stock performance</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketHeatmap />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="mt-6">
            <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-400">Market News</CardTitle>
                <CardDescription className="text-green-400/70">Latest financial news and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketNews />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

