"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"

export function PortfolioChart() {
  const [timeRange, setTimeRange] = useState("1M")

  // Get data based on selected time range
  const getData = () => {
    switch (timeRange) {
      case "1W":
        return weekData
      case "1M":
        return monthData
      case "3M":
        return threeMonthData
      case "6M":
        return sixMonthData
      case "1Y":
        return yearData
      case "ALL":
        return allTimeData
      default:
        return monthData
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        {["1W", "1M", "3M", "6M", "1Y", "ALL"].map((range) => (
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

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getData()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                      <p className="text-green-400">{`Value: ₹${payload[0].value} Cr`}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const weekData = [
  { date: "Mon", value: 4800 },
  { date: "Tue", value: 4850 },
  { date: "Wed", value: 4750 },
  { date: "Thu", value: 4900 },
  { date: "Fri", value: 5000 },
]

const monthData = [
  { date: "Apr 01", value: 4200 },
  { date: "Apr 05", value: 4300 },
  { date: "Apr 10", value: 4500 },
  { date: "Apr 15", value: 4400 },
  { date: "Apr 20", value: 4600 },
  { date: "Apr 25", value: 4800 },
  { date: "Apr 30", value: 5000 },
]

const threeMonthData = [
  { date: "Feb", value: 3500 },
  { date: "Mar", value: 4200 },
  { date: "Apr", value: 5000 },
]

const sixMonthData = [
  { date: "Nov", value: 2800 },
  { date: "Dec", value: 3200 },
  { date: "Jan", value: 3500 },
  { date: "Feb", value: 3800 },
  { date: "Mar", value: 4200 },
  { date: "Apr", value: 5000 },
]

const yearData = [
  { date: "May '23", value: 2000 },
  { date: "Jul '23", value: 2200 },
  { date: "Sep '23", value: 2500 },
  { date: "Nov '23", value: 3000 },
  { date: "Jan '24", value: 3500 },
  { date: "Mar '24", value: 4200 },
  { date: "Apr '24", value: 5000 },
]

const allTimeData = [
  { date: "2020", value: 1000 },
  { date: "2021", value: 1800 },
  { date: "2022", value: 2500 },
  { date: "2023", value: 3500 },
  { date: "2024", value: 5000 },
]

