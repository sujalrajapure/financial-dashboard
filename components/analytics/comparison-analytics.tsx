"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ComparisonAnalytics() {
  const [timeRange, setTimeRange] = useState("1Y")
  const [benchmark, setBenchmark] = useState("nifty")

  // Get data based on selected time range and benchmark
  const getComparisonData = () => {
    let data = yearData

    switch (timeRange) {
      case "1M":
        data = monthData
        break
      case "3M":
        data = threeMonthData
        break
      case "6M":
        data = sixMonthData
        break
      case "1Y":
        data = yearData
        break
      case "3Y":
        data = threeYearData
        break
      default:
        data = yearData
    }

    // Return data with the selected benchmark
    return data.map((item) => ({
      date: item.date,
      portfolio: item.portfolio,
      benchmark: item[benchmark],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium text-green-400">Benchmark Comparison</h3>
          <p className="text-sm text-green-400/70">Compare your portfolio against market indices</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={benchmark} onValueChange={setBenchmark}>
            <SelectTrigger className="w-[180px] bg-[#0a0a14] border-green-500/30 text-green-400">
              <SelectValue placeholder="Select benchmark" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f1117] border-green-500/30 text-green-400">
              <SelectItem value="nifty" className="focus:bg-green-500/20 focus:text-green-400">
                Nifty 50
              </SelectItem>
              <SelectItem value="sensex" className="focus:bg-green-500/20 focus:text-green-400">
                Sensex
              </SelectItem>
              <SelectItem value="bankNifty" className="focus:bg-green-500/20 focus:text-green-400">
                Bank Nifty
              </SelectItem>
              <SelectItem value="midcap" className="focus:bg-green-500/20 focus:text-green-400">
                Nifty Midcap 100
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            {["1M", "3M", "6M", "1Y", "3Y"].map((range) => (
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
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="bg-[#0a0a14] border border-green-500/30">
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="returns"
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
          >
            Returns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-4">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getComparisonData()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" stroke="#6ee7b7" />
                <YAxis stroke="#6ee7b7" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length > 1) {
                      return (
                        <div className="bg-[#0f1117] border border-green-500/30 p-2 text-xs">
                          <p className="text-green-400">{`Date: ${payload[0].payload.date}`}</p>
                          <p className="text-green-500">{`Portfolio: ${payload[0].value}`}</p>
                          <p className="text-blue-500">{`${getBenchmarkName(benchmark)}: ${payload[1].value}`}</p>
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
                  dataKey="benchmark"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ stroke: "#3b82f6", strokeWidth: 2, r: 4, fill: "#0f1117" }}
                  name={getBenchmarkName(benchmark)}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="returns" className="mt-4">
          <div className="space-y-4">
            <Card className="bg-[#0f1117] border-green-500/30">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-green-400/70 mb-1">Your Portfolio</div>
                    <div className="text-2xl font-bold text-green-500">
                      {getReturnForPeriod(timeRange, "portfolio")}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-green-400/70 mb-1">{getBenchmarkName(benchmark)}</div>
                    <div className="text-2xl font-bold text-blue-500">{getReturnForPeriod(timeRange, benchmark)}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-400/70 mb-1">Outperformance</div>
                    <div className="text-2xl font-bold text-green-500">
                      +{getReturnForPeriod(timeRange, "portfolio") - getReturnForPeriod(timeRange, benchmark)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getReturnComparisonData()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="period" stroke="#6ee7b7" />
                  <YAxis stroke="#6ee7b7" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length > 1) {
                        return (
                          <div className="bg-[#0f1117] border border-green-500/30 p-2 text-xs">
                            <p className="text-green-400">{`Period: ${payload[0].payload.period}`}</p>
                            <p className="text-green-500">{`Portfolio: ${payload[0].value}%`}</p>
                            <p className="text-blue-500">{`${getBenchmarkName(benchmark)}: ${payload[1].value}%`}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="portfolio" name="Portfolio" fill="#10b981" />
                  <Bar dataKey="benchmark" name={getBenchmarkName(benchmark)} fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getBenchmarkName(benchmark: string): string {
  switch (benchmark) {
    case "nifty":
      return "Nifty 50"
    case "sensex":
      return "Sensex"
    case "bankNifty":
      return "Bank Nifty"
    case "midcap":
      return "Nifty Midcap 100"
    default:
      return "Benchmark"
  }
}

function getReturnForPeriod(period: string, dataKey: string): number {
  switch (period) {
    case "1M":
      return dataKey === "portfolio"
        ? 5.8
        : dataKey === "nifty"
          ? 3.5
          : dataKey === "sensex"
            ? 3.2
            : dataKey === "bankNifty"
              ? 4.2
              : 6.5
    case "3M":
      return dataKey === "portfolio"
        ? 18.5
        : dataKey === "nifty"
          ? 12.2
          : dataKey === "sensex"
            ? 11.5
            : dataKey === "bankNifty"
              ? 14.8
              : 20.5
    case "6M":
      return dataKey === "portfolio"
        ? 32.8
        : dataKey === "nifty"
          ? 22.5
          : dataKey === "sensex"
            ? 21.8
            : dataKey === "bankNifty"
              ? 25.5
              : 35.2
    case "1Y":
      return dataKey === "portfolio"
        ? 42.8
        : dataKey === "nifty"
          ? 28.5
          : dataKey === "sensex"
            ? 27.2
            : dataKey === "bankNifty"
              ? 32.5
              : 45.8
    case "3Y":
      return dataKey === "portfolio"
        ? 155.2
        : dataKey === "nifty"
          ? 82.5
          : dataKey === "sensex"
            ? 78.5
            : dataKey === "bankNifty"
              ? 95.2
              : 142.5
    default:
      return 0
  }
}

function getReturnComparisonData() {
  return [
    { period: "1M", portfolio: 5.8, nifty: 3.5, sensex: 3.2, bankNifty: 4.2, midcap: 6.5 },
    { period: "3M", portfolio: 18.5, nifty: 12.2, sensex: 11.5, bankNifty: 14.8, midcap: 20.5 },
    { period: "6M", portfolio: 32.8, nifty: 22.5, sensex: 21.8, bankNifty: 25.5, midcap: 35.2 },
    { period: "1Y", portfolio: 42.8, nifty: 28.5, sensex: 27.2, bankNifty: 32.5, midcap: 45.8 },
    { period: "3Y", portfolio: 155.2, nifty: 82.5, sensex: 78.5, bankNifty: 95.2, midcap: 142.5 },
  ]
}

const monthData = [
  { date: "Apr 01", portfolio: 100, nifty: 100, sensex: 100, bankNifty: 100, midcap: 100 },
  { date: "Apr 05", portfolio: 101.2, nifty: 100.8, sensex: 100.7, bankNifty: 101.0, midcap: 101.5 },
  { date: "Apr 10", portfolio: 102.5, nifty: 101.5, sensex: 101.3, bankNifty: 102.0, midcap: 103.0 },
  { date: "Apr 15", portfolio: 103.8, nifty: 102.2, sensex: 101.8, bankNifty: 102.8, midcap: 104.2 },
  { date: "Apr 20", portfolio: 104.5, nifty: 102.8, sensex: 102.5, bankNifty: 103.5, midcap: 105.0 },
  { date: "Apr 25", portfolio: 105.2, nifty: 103.2, sensex: 102.8, bankNifty: 103.8, midcap: 105.8 },
  { date: "Apr 30", portfolio: 105.8, nifty: 103.5, sensex: 103.2, bankNifty: 104.2, midcap: 106.5 },
]

const threeMonthData = [
  { date: "Feb 01", portfolio: 100, nifty: 100, sensex: 100, bankNifty: 100, midcap: 100 },
  { date: "Feb 15", portfolio: 105.2, nifty: 103.5, sensex: 103.0, bankNifty: 104.2, midcap: 106.5 },
  { date: "Mar 01", portfolio: 110.5, nifty: 106.8, sensex: 106.2, bankNifty: 108.5, midcap: 112.0 },
  { date: "Mar 15", portfolio: 114.8, nifty: 109.2, sensex: 108.5, bankNifty: 111.2, midcap: 115.5 },
  { date: "Apr 01", portfolio: 116.5, nifty: 110.5, sensex: 109.8, bankNifty: 112.8, midcap: 118.0 },
  { date: "Apr 15", portfolio: 117.8, nifty: 111.2, sensex: 110.5, bankNifty: 113.5, midcap: 119.2 },
  { date: "Apr 30", portfolio: 118.5, nifty: 112.2, sensex: 111.5, bankNifty: 114.8, midcap: 120.5 },
]

const sixMonthData = [
  { date: "Nov 01", portfolio: 100, nifty: 100, sensex: 100, bankNifty: 100, midcap: 100 },
  { date: "Dec 01", portfolio: 108.5, nifty: 105.2, sensex: 104.8, bankNifty: 106.5, midcap: 110.0 },
  { date: "Jan 01", portfolio: 115.2, nifty: 110.5, sensex: 109.8, bankNifty: 112.0, midcap: 118.5 },
  { date: "Feb 01", portfolio: 120.8, nifty: 114.8, sensex: 113.5, bankNifty: 116.5, midcap: 125.0 },
  { date: "Mar 01", portfolio: 126.5, nifty: 118.5, sensex: 117.2, bankNifty: 120.8, midcap: 130.2 },
  { date: "Apr 01", portfolio: 130.2, nifty: 121.2, sensex: 120.5, bankNifty: 124.2, midcap: 133.5 },
  { date: "Apr 30", portfolio: 132.8, nifty: 122.5, sensex: 121.8, bankNifty: 125.5, midcap: 135.2 },
]

const yearData = [
  { date: "May '23", portfolio: 100, nifty: 100, sensex: 100, bankNifty: 100, midcap: 100 },
  { date: "Jul '23", portfolio: 108.5, nifty: 105.2, sensex: 104.5, bankNifty: 106.8, midcap: 110.5 },
  { date: "Sep '23", portfolio: 115.8, nifty: 110.5, sensex: 109.8, bankNifty: 112.5, midcap: 118.2 },
  { date: "Nov '23", portfolio: 122.5, nifty: 115.8, sensex: 114.5, bankNifty: 118.2, midcap: 125.5 },
  { date: "Jan '24", portfolio: 130.2, nifty: 120.5, sensex: 119.2, bankNifty: 124.5, midcap: 135.8 },
  { date: "Mar '24", portfolio: 138.5, nifty: 125.2, sensex: 124.5, bankNifty: 130.2, midcap: 142.5 },
  { date: "Apr '24", portfolio: 142.8, nifty: 128.5, sensex: 127.2, bankNifty: 132.5, midcap: 145.8 },
]

const threeYearData = [
  { date: "2021", portfolio: 100, nifty: 100, sensex: 100, bankNifty: 100, midcap: 100 },
  { date: "2022 Q1", portfolio: 112.5, nifty: 108.5, sensex: 107.2, bankNifty: 110.5, midcap: 115.8 },
  { date: "2022 Q2", portfolio: 125.8, nifty: 115.2, sensex: 114.5, bankNifty: 118.2, midcap: 130.5 },
  { date: "2022 Q3", portfolio: 138.5, nifty: 122.5, sensex: 120.8, bankNifty: 125.5, midcap: 142.8 },
  { date: "2022 Q4", portfolio: 152.8, nifty: 130.2, sensex: 128.5, bankNifty: 135.8, midcap: 155.2 },
  { date: "2023 Q1", portfolio: 168.5, nifty: 138.5, sensex: 136.2, bankNifty: 145.2, midcap: 168.5 },
  { date: "2023 Q2", portfolio: 185.2, nifty: 145.8, sensex: 142.5, bankNifty: 155.8, midcap: 180.2 },
  { date: "2023 Q3", portfolio: 202.5, nifty: 155.2, sensex: 152.8, bankNifty: 165.5, midcap: 195.8 },
  { date: "2023 Q4", portfolio: 220.8, nifty: 165.5, sensex: 162.5, bankNifty: 175.2, midcap: 210.5 },
  { date: "2024 Q1", portfolio: 240.5, nifty: 175.8, sensex: 172.5, bankNifty: 185.8, midcap: 230.2 },
  { date: "2024 Q2", portfolio: 255.2, nifty: 182.5, sensex: 178.5, bankNifty: 195.2, midcap: 242.5 },
]

