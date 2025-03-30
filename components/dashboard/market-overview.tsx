"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MarketOverview() {
  return (
    <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-green-400">Market Overview</CardTitle>
        <CardDescription className="text-green-400/70">Sector performance and market trends</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sectors">
          <TabsList className="bg-[#0a0a14] border border-green-500/30">
            <TabsTrigger
              value="sectors"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              Sectors
            </TabsTrigger>
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
          </TabsList>

          <TabsContent value="sectors" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={false}
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#0f1117] border border-green-500/30 p-2 text-xs">
                              <p className="text-green-400">{`${payload[0].name}: ${payload[0].value}%`}</p>
                              <p className="text-green-400/70">{`Change: ${payload[0].payload.change}%`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2">
                {sectorData.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-green-500/5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-green-400">{sector.name}</span>
                    </div>
                    <div className={`text-sm ${sector.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {sector.change >= 0 ? "+" : ""}
                      {sector.change}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gainers" className="mt-4">
            <div className="space-y-2">
              {topGainers.map((stock, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-green-500/5">
                  <div>
                    <div className="font-medium text-green-400">{stock.name}</div>
                    <div className="text-xs text-green-400/70">{stock.sector}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-400">₹{stock.price}</div>
                    <div className="text-xs text-green-500">+{stock.change}%</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="losers" className="mt-4">
            <div className="space-y-2">
              {topLosers.map((stock, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-green-500/5">
                  <div>
                    <div className="font-medium text-green-400">{stock.name}</div>
                    <div className="text-xs text-green-400/70">{stock.sector}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-400">₹{stock.price}</div>
                    <div className="text-xs text-red-500">{stock.change}%</div>
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

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"]

const sectorData = [
  { name: "IT", value: 25, change: 1.8 },
  { name: "Banking", value: 20, change: 2.5 },
  { name: "Energy", value: 15, change: -0.7 },
  { name: "FMCG", value: 12, change: 0.9 },
  { name: "Pharma", value: 10, change: -1.2 },
  { name: "Auto", value: 8, change: 1.5 },
  { name: "Metal", value: 6, change: -2.1 },
  { name: "Realty", value: 4, change: 3.2 },
]

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

