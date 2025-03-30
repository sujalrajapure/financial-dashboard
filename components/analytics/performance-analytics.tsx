"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function PerformanceAnalytics() {
  const [timeRange, setTimeRange] = useState("1Y")

  // Get data based on selected time range
  const getData = () => {
    switch (timeRange) {
      case "1M":
        return monthData
      case "3M":
        return threeMonthData
      case "6M":
        return sixMonthData
      case "1Y":
        return yearData
      case "3Y":
        return threeYearData
      case "5Y":
        return fiveYearData
      default:
        return yearData
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-green-400">Portfolio Performance</h3>
          <p className="text-sm text-green-400/70">Historical returns compared to benchmarks</p>
        </div>
        <div className="flex items-center gap-2">
          {["1M", "3M", "6M", "1Y", "3Y", "5Y"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={
                timeRange === range
                  ? "bg-green-500 hover:bg-green-600 text-black"
                  : "border-green-500/30 text-green-400 hover:bg-green-500/20"
              }
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getData()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNifty" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="portfolio"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorPortfolio)"
              name="Portfolio"
            />
            <Area
              type="monotone"
              dataKey="nifty"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorNifty)"
              name="Nifty 50"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#0f1117] border-green-500/30">
          <CardContent className="p-4">
            <div className="text-sm text-green-400/70 mb-1">Total Return</div>
            <div className="text-2xl font-bold text-green-500">+42.8%</div>
            <div className="text-xs text-green-400/70">vs. Nifty 50 +28.5%</div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1117] border-green-500/30">
          <CardContent className="p-4">
            <div className="text-sm text-green-400/70 mb-1">CAGR</div>
            <div className="text-2xl font-bold text-green-500">18.5%</div>
            <div className="text-xs text-green-400/70">vs. Nifty 50 12.2%</div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1117] border-green-500/30">
          <CardContent className="p-4">
            <div className="text-sm text-green-400/70 mb-1">Alpha</div>
            <div className="text-2xl font-bold text-green-500">+6.3%</div>
            <div className="text-xs text-green-400/70">Outperformance vs. benchmark</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const monthData = [
  { date: "Apr 01", portfolio: 0, nifty: 0 },
  { date: "Apr 05", portfolio: 1.2, nifty: 0.8 },
  { date: "Apr 10", portfolio: 2.5, nifty: 1.5 },
  { date: "Apr 15", portfolio: 1.8, nifty: 0.9 },
  { date: "Apr 20", portfolio: 3.2, nifty: 2.1 },
  { date: "Apr 25", portfolio: 4.5, nifty: 2.8 },
  { date: "Apr 30", portfolio: 5.8, nifty: 3.5 },
]

const threeMonthData = [
  { date: "Feb 01", portfolio: 0, nifty: 0 },
  { date: "Feb 15", portfolio: 2.5, nifty: 1.8 },
  { date: "Mar 01", portfolio: 5.2, nifty: 3.5 },
  { date: "Mar 15", portfolio: 8.5, nifty: 5.2 },
  { date: "Apr 01", portfolio: 12.8, nifty: 7.5 },
  { date: "Apr 15", portfolio: 15.2, nifty: 9.8 },
  { date: "Apr 30", portfolio: 18.5, nifty: 12.2 },
]

const sixMonthData = [
  { date: "Nov 01", portfolio: 0, nifty: 0 },
  { date: "Dec 01", portfolio: 4.5, nifty: 3.2 },
  { date: "Jan 01", portfolio: 9.8, nifty: 6.5 },
  { date: "Feb 01", portfolio: 15.2, nifty: 10.8 },
  { date: "Mar 01", portfolio: 22.5, nifty: 15.2 },
  { date: "Apr 01", portfolio: 28.5, nifty: 19.5 },
  { date: "Apr 30", portfolio: 32.8, nifty: 22.5 },
]

const yearData = [
  { date: "May '23", portfolio: 0, nifty: 0 },
  { date: "Jul '23", portfolio: 8.5, nifty: 5.2 },
  { date: "Sep '23", portfolio: 15.8, nifty: 10.5 },
  { date: "Nov '23", portfolio: 22.5, nifty: 15.8 },
  { date: "Jan '24", portfolio: 30.2, nifty: 20.5 },
  { date: "Mar '24", portfolio: 38.5, nifty: 25.2 },
  { date: "Apr '24", portfolio: 42.8, nifty: 28.5 },
]

const threeYearData = [
  { date: "2021", portfolio: 0, nifty: 0 },
  { date: "2022 Q1", portfolio: 12.5, nifty: 8.5 },
  { date: "2022 Q2", portfolio: 25.8, nifty: 15.2 },
  { date: "2022 Q3", portfolio: 38.5, nifty: 22.5 },
  { date: "2022 Q4", portfolio: 52.8, nifty: 30.2 },
  { date: "2023 Q1", portfolio: 68.5, nifty: 38.5 },
  { date: "2023 Q2", portfolio: 85.2, nifty: 45.8 },
  { date: "2023 Q3", portfolio: 102.5, nifty: 55.2 },
  { date: "2023 Q4", portfolio: 120.8, nifty: 65.5 },
  { date: "2024 Q1", portfolio: 140.5, nifty: 75.8 },
  { date: "2024 Q2", portfolio: 155.2, nifty: 82.5 },
]

const fiveYearData = [
  { date: "2019", portfolio: 0, nifty: 0 },
  { date: "2020", portfolio: 22.5, nifty: 15.2 },
  { date: "2021", portfolio: 48.5, nifty: 32.5 },
  { date: "2022", portfolio: 85.2, nifty: 55.8 },
  { date: "2023", portfolio: 125.5, nifty: 78.5 },
  { date: "2024", portfolio: 155.2, nifty: 95.8 },
]

