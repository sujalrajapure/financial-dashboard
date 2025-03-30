"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RiskAnalytics() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="volatility">
        <TabsList className="bg-[#0a0a14] border border-green-500/30">
          <TabsTrigger
            value="volatility"
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
          >
            Volatility
          </TabsTrigger>
          <TabsTrigger
            value="drawdown"
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
          >
            Drawdown
          </TabsTrigger>
          <TabsTrigger
            value="metrics"
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
          >
            Risk Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="volatility" className="mt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-[#0f1117] border-green-500/30">
                <CardContent className="p-4">
                  <div className="text-sm text-green-400/70 mb-1">Portfolio Volatility</div>
                  <div className="text-2xl font-bold text-green-500">15.8%</div>
                  <div className="text-xs text-green-400/70">Annualized standard deviation</div>
                </CardContent>
              </Card>

              <Card className="bg-[#0f1117] border-green-500/30">
                <CardContent className="p-4">
                  <div className="text-sm text-green-400/70 mb-1">Benchmark Volatility</div>
                  <div className="text-2xl font-bold text-green-500">18.2%</div>
                  <div className="text-xs text-green-400/70">Nifty 50 annualized volatility</div>
                </CardContent>
              </Card>

              <Card className="bg-[#0f1117] border-green-500/30">
                <CardContent className="p-4">
                  <div className="text-sm text-green-400/70 mb-1">Beta</div>
                  <div className="text-2xl font-bold text-green-500">0.85</div>
                  <div className="text-xs text-green-400/70">Lower volatility than market</div>
                </CardContent>
              </Card>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={volatilityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="date" stroke="#6ee7b7" />
                  <YAxis stroke="#6ee7b7" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length > 1) {
                        return (
                          <div className="bg-[#0f1117] border border-green-500/30 p-2 text-xs">
                            <p className="text-green-400">{`Date: ${payload[0].payload.date}`}</p>
                            <p className="text-green-500">{`Portfolio: ${payload[0].value}%`}</p>
                            <p className="text-blue-500">{`Nifty 50: ${payload[1].value}%`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="portfolio"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ stroke: "#10b981", strokeWidth: 2, r: 4, fill: "#0f1117" }}
                    name="Portfolio"
                  />
                  <Line
                    type="monotone"
                    dataKey="nifty"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ stroke: "#3b82f6", strokeWidth: 2, r: 4, fill: "#0f1117" }}
                    name="Nifty 50"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="drawdown" className="mt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-[#0f1117] border-green-500/30">
                <CardContent className="p-4">
                  <div className="text-sm text-green-400/70 mb-1">Maximum Drawdown</div>
                  <div className="text-2xl font-bold text-red-500">-18.5%</div>
                  <div className="text-xs text-green-400/70">Largest peak-to-trough decline</div>
                </CardContent>
              </Card>

              <Card className="bg-[#0f1117] border-green-500/30">
                <CardContent className="p-4">
                  <div className="text-sm text-green-400/70 mb-1">Recovery Time</div>
                  <div className="text-2xl font-bold text-green-500">4.2 months</div>
                  <div className="text-xs text-green-400/70">Average time to recover from drawdowns</div>
                </CardContent>
              </Card>

              <Card className="bg-[#0f1117] border-green-500/30">
                <CardContent className="p-4">
                  <div className="text-sm text-green-400/70 mb-1">Current Drawdown</div>
                  <div className="text-2xl font-bold text-green-500">0%</div>
                  <div className="text-xs text-green-400/70">Currently at all-time high</div>
                </CardContent>
              </Card>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={drawdownData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="date" stroke="#6ee7b7" />
                  <YAxis stroke="#6ee7b7" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#0f1117] border border-green-500/30 p-2 text-xs">
                            <p className="text-green-400">{`Date: ${payload[0].payload.date}`}</p>
                            <p className="text-red-500">{`Drawdown: ${payload[0].value}%`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="drawdown" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#0f1117] border-green-500/30">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium text-green-400 mb-4">Risk Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-400">Sharpe Ratio</span>
                    <span className="text-sm font-medium text-green-500">1.85</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-400">Sortino Ratio</span>
                    <span className="text-sm font-medium text-green-500">2.12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-400">Treynor Ratio</span>
                    <span className="text-sm font-medium text-green-500">0.22</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-400">Information Ratio</span>
                    <span className="text-sm font-medium text-green-500">0.78</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-400">Calmar Ratio</span>
                    <span className="text-sm font-medium text-green-500">1.25</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0f1117] border-green-500/30">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium text-green-400 mb-4">Risk-Adjusted Performance</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-green-400">Risk-Adjusted Return</span>
                      <span className="text-sm font-medium text-green-500">15.2%</span>
                    </div>
                    <div className="w-full bg-green-500/20 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-green-400">Downside Protection</span>
                      <span className="text-sm font-medium text-green-500">82%</span>
                    </div>
                    <div className="w-full bg-green-500/20 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-green-400">Upside Capture</span>
                      <span className="text-sm font-medium text-green-500">95%</span>
                    </div>
                    <div className="w-full bg-green-500/20 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-green-400">Downside Capture</span>
                      <span className="text-sm font-medium text-green-500">68%</span>
                    </div>
                    <div className="w-full bg-green-500/20 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const volatilityData = [
  { date: "May '23", portfolio: 12.5, nifty: 15.8 },
  { date: "Jun '23", portfolio: 14.2, nifty: 16.5 },
  { date: "Jul '23", portfolio: 13.8, nifty: 17.2 },
  { date: "Aug '23", portfolio: 15.5, nifty: 18.5 },
  { date: "Sep '23", portfolio: 16.2, nifty: 19.8 },
  { date: "Oct '23", portfolio: 14.8, nifty: 18.2 },
  { date: "Nov '23", portfolio: 13.5, nifty: 17.5 },
  { date: "Dec '23", portfolio: 12.8, nifty: 16.8 },
  { date: "Jan '24", portfolio: 14.5, nifty: 17.2 },
  { date: "Feb '24", portfolio: 15.2, nifty: 18.5 },
  { date: "Mar '24", portfolio: 16.5, nifty: 19.2 },
  { date: "Apr '24", portfolio: 15.8, nifty: 18.2 },
]

const drawdownData = [
  { date: "May '23", drawdown: -5.2 },
  { date: "Jun '23", drawdown: -8.5 },
  { date: "Jul '23", drawdown: -12.8 },
  { date: "Aug '23", drawdown: -18.5 },
  { date: "Sep '23", drawdown: -15.2 },
  { date: "Oct '23", drawdown: -10.5 },
  { date: "Nov '23", drawdown: -5.8 },
  { date: "Dec '23", drawdown: -2.5 },
  { date: "Jan '24", drawdown: -8.2 },
  { date: "Feb '24", drawdown: -5.5 },
  { date: "Mar '24", drawdown: -2.8 },
  { date: "Apr '24", drawdown: 0 },
]

