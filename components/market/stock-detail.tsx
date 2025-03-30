"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ArrowDown, ArrowUp, BarChart3, LineChart, TrendingUp } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StockDetailProps {
  stockName: string
}

export function StockDetail({ stockName }: StockDetailProps) {
  // Get stock details based on name
  const stockDetails = getStockDetails(stockName)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-green-500">{stockDetails.name}</h2>
          <p className="text-sm text-green-400/70">
            {stockDetails.sector} • NSE: {stockDetails.ticker}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-green-500">₹{stockDetails.price}</p>
          <div
            className={`flex items-center justify-end gap-1 ${stockDetails.change >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {stockDetails.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            <span>
              {stockDetails.change >= 0 ? "+" : ""}
              {stockDetails.change}%
            </span>
            <span className="text-xs">
              ({stockDetails.changeValue >= 0 ? "+" : ""}₹{stockDetails.changeValue})
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="chart">
        <TabsList className="bg-[#0a0a14] border border-green-500/30">
          <TabsTrigger value="chart" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
            <LineChart className="h-4 w-4 mr-2" />
            Chart
          </TabsTrigger>
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="financials"
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Financials
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="mt-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stockDetails.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" stroke="#6ee7b7" />
                <YAxis stroke="#6ee7b7" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0f1117] border border-green-500/30 p-2 text-xs">
                          <p className="text-green-400">{`Date: ${payload[0].payload.date}`}</p>
                          <p className="text-green-400">{`Price: ₹${payload[0].value}`}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area type="monotone" dataKey="price" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-green-400/70">Market Cap</span>
                <span className="text-sm text-green-400">₹{stockDetails.marketCap} Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-400/70">P/E Ratio</span>
                <span className="text-sm text-green-400">{stockDetails.pe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-400/70">Dividend Yield</span>
                <span className="text-sm text-green-400">{stockDetails.dividendYield}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-400/70">52W High</span>
                <span className="text-sm text-green-400">₹{stockDetails.high52w}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-400/70">52W Low</span>
                <span className="text-sm text-green-400">₹{stockDetails.low52w}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-green-400/70">Volume</span>
                <span className="text-sm text-green-400">{stockDetails.volume} Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-400/70">Avg Volume</span>
                <span className="text-sm text-green-400">{stockDetails.avgVolume} Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-400/70">Book Value</span>
                <span className="text-sm text-green-400">₹{stockDetails.bookValue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-400/70">EPS (TTM)</span>
                <span className="text-sm text-green-400">₹{stockDetails.eps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-400/70">ROE</span>
                <span className="text-sm text-green-400">{stockDetails.roe}%</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="financials" className="mt-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockDetails.financialData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="quarter" stroke="#6ee7b7" />
                <YAxis stroke="#6ee7b7" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0f1117] border border-green-500/30 p-2 text-xs">
                          <p className="text-green-400">{`Quarter: ${payload[0].payload.quarter}`}</p>
                          <p className="text-green-400">{`Revenue: ₹${payload[0].payload.revenue} Cr`}</p>
                          <p className="text-green-400">{`Profit: ₹${payload[0].payload.profit} Cr`}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="revenue" name="Revenue" fill="#10b981" />
                <Bar dataKey="profit" name="Profit" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getStockDetails(stockName: string) {
  const stockDetails: Record<string, any> = {
    "Reliance Industries": {
      name: "Reliance Industries Ltd",
      ticker: "RELIANCE",
      sector: "Energy",
      price: 2500,
      change: 1.85,
      changeValue: 45.5,
      marketCap: "16,85,000",
      pe: 28.5,
      dividendYield: 0.4,
      high52w: 2700,
      low52w: 1900,
      volume: 2.5,
      avgVolume: 1.8,
      bookValue: 1250,
      eps: 87.5,
      roe: 15.2,
      chartData: [
        { date: "Apr 01", price: 2350 },
        { date: "Apr 05", price: 2380 },
        { date: "Apr 10", price: 2420 },
        { date: "Apr 15", price: 2390 },
        { date: "Apr 20", price: 2450 },
        { date: "Apr 25", price: 2480 },
        { date: "Apr 30", price: 2500 },
      ],
      financialData: [
        { quarter: "Q1 FY24", revenue: 2500, profit: 350 },
        { quarter: "Q2 FY24", revenue: 2650, profit: 380 },
        { quarter: "Q3 FY24", revenue: 2800, profit: 420 },
        { quarter: "Q4 FY24", revenue: 3000, profit: 450 },
      ],
    },
    "HDFC Bank": {
      name: "HDFC Bank Ltd",
      ticker: "HDFCBANK",
      sector: "Banking",
      price: 1650,
      change: -0.75,
      changeValue: -12.5,
      marketCap: "9,20,000",
      pe: 22.3,
      dividendYield: 0.8,
      high52w: 1800,
      low52w: 1400,
      volume: 1.8,
      avgVolume: 1.2,
      bookValue: 850,
      eps: 74.2,
      roe: 16.8,
      chartData: [
        { date: "Apr 01", price: 1680 },
        { date: "Apr 05", price: 1700 },
        { date: "Apr 10", price: 1720 },
        { date: "Apr 15", price: 1690 },
        { date: "Apr 20", price: 1670 },
        { date: "Apr 25", price: 1660 },
        { date: "Apr 30", price: 1650 },
      ],
      financialData: [
        { quarter: "Q1 FY24", revenue: 1800, profit: 280 },
        { quarter: "Q2 FY24", revenue: 1900, profit: 300 },
        { quarter: "Q3 FY24", revenue: 2000, profit: 320 },
        { quarter: "Q4 FY24", revenue: 2100, profit: 340 },
      ],
    },
    Infosys: {
      name: "Infosys Ltd",
      ticker: "INFY",
      sector: "IT",
      price: 1450,
      change: -1.73,
      changeValue: -25.5,
      marketCap: "6,10,000",
      pe: 25.8,
      dividendYield: 2.5,
      high52w: 1700,
      low52w: 1300,
      volume: 1.5,
      avgVolume: 1.0,
      bookValue: 420,
      eps: 56.2,
      roe: 25.5,
      chartData: [
        { date: "Apr 01", price: 1500 },
        { date: "Apr 05", price: 1520 },
        { date: "Apr 10", price: 1510 },
        { date: "Apr 15", price: 1490 },
        { date: "Apr 20", price: 1470 },
        { date: "Apr 25", price: 1460 },
        { date: "Apr 30", price: 1450 },
      ],
      financialData: [
        { quarter: "Q1 FY24", revenue: 1200, profit: 180 },
        { quarter: "Q2 FY24", revenue: 1250, profit: 190 },
        { quarter: "Q3 FY24", revenue: 1300, profit: 200 },
        { quarter: "Q4 FY24", revenue: 1350, profit: 210 },
      ],
    },
    "Tata Motors": {
      name: "Tata Motors Ltd",
      ticker: "TATAMOTORS",
      sector: "Auto",
      price: 850,
      change: 5.7,
      changeValue: 45.8,
      marketCap: "2,85,000",
      pe: 18.5,
      dividendYield: 0.3,
      high52w: 900,
      low52w: 650,
      volume: 1.2,
      avgVolume: 0.8,
      bookValue: 320,
      eps: 46.0,
      roe: 14.2,
      chartData: [
        { date: "Apr 01", price: 780 },
        { date: "Apr 05", price: 790 },
        { date: "Apr 10", price: 810 },
        { date: "Apr 15", price: 820 },
        { date: "Apr 20", price: 830 },
        { date: "Apr 25", price: 840 },
        { date: "Apr 30", price: 850 },
      ],
      financialData: [
        { quarter: "Q1 FY24", revenue: 950, profit: 120 },
        { quarter: "Q2 FY24", revenue: 1000, profit: 130 },
        { quarter: "Q3 FY24", revenue: 1050, profit: 140 },
        { quarter: "Q4 FY24", revenue: 1100, profit: 150 },
      ],
    },
    "Bharti Airtel": {
      name: "Bharti Airtel Ltd",
      ticker: "BHARTIARTL",
      sector: "Telecom",
      price: 950,
      change: -1.3,
      changeValue: -12.5,
      marketCap: "4,75,000",
      pe: 32.1,
      dividendYield: 0.3,
      high52w: 1050,
      low52w: 850,
      volume: 0.9,
      avgVolume: 0.6,
      bookValue: 280,
      eps: 29.6,
      roe: 10.5,
      chartData: [
        { date: "Apr 01", price: 980 },
        { date: "Apr 05", price: 990 },
        { date: "Apr 10", price: 970 },
        { date: "Apr 15", price: 960 },
        { date: "Apr 20", price: 950 },
        { date: "Apr 25", price: 940 },
        { date: "Apr 30", price: 950 },
      ],
      financialData: [
        { quarter: "Q1 FY24", revenue: 850, profit: 90 },
        { quarter: "Q2 FY24", revenue: 900, profit: 95 },
        { quarter: "Q3 FY24", revenue: 950, profit: 100 },
        { quarter: "Q4 FY24", revenue: 1000, profit: 105 },
      ],
    },
    // Default case
    default: {
      name: "Stock Details",
      ticker: "STOCK",
      sector: "Sector",
      price: 1000,
      change: 0.0,
      changeValue: 0.0,
      marketCap: "5,00,000",
      pe: 20.0,
      dividendYield: 1.0,
      high52w: 1200,
      low52w: 800,
      volume: 1.0,
      avgVolume: 0.8,
      bookValue: 500,
      eps: 50.0,
      roe: 15.0,
      chartData: [
        { date: "Apr 01", price: 980 },
        { date: "Apr 05", price: 990 },
        { date: "Apr 10", price: 1010 },
        { date: "Apr 15", price: 1000 },
        { date: "Apr 20", price: 990 },
        { date: "Apr 25", price: 995 },
        { date: "Apr 30", price: 1000 },
      ],
      financialData: [
        { quarter: "Q1 FY24", revenue: 800, profit: 100 },
        { quarter: "Q2 FY24", revenue: 850, profit: 110 },
        { quarter: "Q3 FY24", revenue: 900, profit: 120 },
        { quarter: "Q4 FY24", revenue: 950, profit: 130 },
      ],
    },
  }

  return stockDetails[stockName] || stockDetails.default
}

