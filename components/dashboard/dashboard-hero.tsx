"use client"

import { useEffect, useState } from "react"
import { ArrowUp, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QuotePopup } from "@/components/quote-popup"

export function DashboardHero() {
  const [showQuote, setShowQuote] = useState(false)
  const [portfolioValue, setPortfolioValue] = useState(0)

  useEffect(() => {
    // Animate portfolio value on load
    const start = 0
    const target = 5000
    const duration = 2000
    const startTime = Date.now()

    const updateValue = () => {
      const now = Date.now()
      const elapsed = now - startTime
      if (elapsed < duration) {
        const value = Math.floor((elapsed / duration) * target)
        setPortfolioValue(value)
        requestAnimationFrame(updateValue)
      } else {
        setPortfolioValue(target)
        // Show quote popup after animation completes
        setTimeout(() => setShowQuote(true), 1000)
      }
    }

    updateValue()

    // Play ticker sound
    const tickerSound = new Audio("/ticker.mp3")
    tickerSound.volume = 0.2
    tickerSound.play().catch(() => {
      // Handle autoplay restrictions
      console.log("Audio autoplay was prevented")
    })

    return () => {
      tickerSound.pause()
    }
  }, [])

  const closeQuote = () => {
    setShowQuote(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2 bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-400">Portfolio Overview</CardTitle>
            <CardDescription className="text-green-400/70">Your financial empire</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-green-400/70">Total Value</p>
                  <h2 className="text-4xl font-bold text-green-500 flex items-center gap-2">
                    ₹{portfolioValue} <span className="text-sm">Crore</span>
                    <span className="text-green-400 text-xl">💰</span>
                  </h2>
                </div>
                <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-md">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-bold">+42.8%</span>
                </div>
              </div>

              <div className="h-[200px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stockData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="name" stroke="#6ee7b7" />
                    <YAxis stroke="#6ee7b7" />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#0f1117] border border-green-500/30 p-2 text-xs">
                              <p className="text-green-400">{`Value: ₹${payload[0].value} Cr`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ stroke: "#10b981", strokeWidth: 2, r: 4, fill: "#0f1117" }}
                      activeDot={{ stroke: "#10b981", strokeWidth: 2, r: 6, fill: "#0f1117" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-400">Market Pulse</CardTitle>
            <CardDescription className="text-green-400/70">Live market indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/10 p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-400/70">SENSEX</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-green-500">72,568</p>
                  <p className="text-xs text-green-500">+1.2% (865)</p>
                </div>
                <div className="bg-green-500/10 p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-400/70">NIFTY</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-green-500">22,045</p>
                  <p className="text-xs text-green-500">+0.9% (198)</p>
                </div>
              </div>

              <div className="h-[120px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="name" stroke="#6ee7b7" />
                    <YAxis stroke="#6ee7b7" />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#0f1117] border border-green-500/30 p-2 text-xs">
                              <p className="text-green-400">{`${payload[0].payload.name}: ${payload[0].value}`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quote popup */}
      {showQuote && <QuotePopup onClose={closeQuote} />}
    </>
  )
}

const stockData = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 1900 },
  { name: "Mar", value: 3000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
  { name: "Aug", value: 4000 },
  { name: "Sep", value: 5000 },
]

const barData = [
  { name: "Mon", value: 21800 },
  { name: "Tue", value: 21900 },
  { name: "Wed", value: 21750 },
  { name: "Thu", value: 21850 },
  { name: "Fri", value: 22045 },
]

