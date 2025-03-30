"use client"

import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from "chart.js"
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react"

ChartJS.register(ArcElement, ChartTooltip, Legend)

export function MarketSentiment() {
  const sentimentData = {
    labels: ["Bullish", "Bearish", "Neutral"],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: ["#10b981", "#ef4444", "#6b7280"],
        borderColor: ["#10b981", "#ef4444", "#6b7280"],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#a7f3d0",
          font: {
            size: 12,
          },
        },
      },
    },
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-green-400">Market Sentiment</h3>

      <div className="h-[200px] flex justify-center">
        <Doughnut data={sentimentData} options={options} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-green-500/10 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-green-400/70">FII Activity</span>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="flex items-center gap-1">
            <ArrowUp className="h-3 w-3 text-green-500" />
            <span className="text-green-500">₹1,250 Cr</span>
          </div>
        </div>

        <div className="p-3 bg-green-500/10 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-green-400/70">DII Activity</span>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
          <div className="flex items-center gap-1">
            <ArrowDown className="h-3 w-3 text-red-500" />
            <span className="text-red-500">₹850 Cr</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-green-400">Analyst Recommendations</h4>

        <div className="flex items-center gap-2">
          <div className="w-full bg-green-500/20 h-2 rounded-full">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "55%" }}></div>
          </div>
          <span className="text-xs text-green-400 min-w-[40px]">55% Buy</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-full bg-green-500/20 h-2 rounded-full">
            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "30%" }}></div>
          </div>
          <span className="text-xs text-green-400 min-w-[40px]">30% Hold</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-full bg-green-500/20 h-2 rounded-full">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: "15%" }}></div>
          </div>
          <span className="text-xs text-green-400 min-w-[40px]">15% Sell</span>
        </div>
      </div>
    </div>
  )
}

