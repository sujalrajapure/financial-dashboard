"use client"

import { ArrowUp } from "lucide-react"

interface PortfolioStatsProps {
  totalValue: number
  totalInvestment: number
  totalProfit: number
  profitPercentage: number
}

export function PortfolioStats({ totalValue, totalInvestment, totalProfit, profitPercentage }: PortfolioStatsProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
        <p className="text-sm text-green-400/70 mb-1">Total Portfolio Value</p>
        <p className="text-3xl font-bold text-green-500">₹{totalValue.toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
          <p className="text-sm text-green-400/70 mb-1">Invested</p>
          <p className="text-xl font-bold text-green-400">₹{totalInvestment.toLocaleString()}</p>
        </div>

        <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
          <p className="text-sm text-green-400/70 mb-1">Returns</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-green-500">₹{totalProfit.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUp className="h-3 w-3" />
              <span>{profitPercentage.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-green-400/70">Today's Change</p>
          <div className="flex items-center gap-1 text-green-500 text-sm">
            <ArrowUp className="h-3 w-3" />
            <span>+1.2%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-green-400/70">1 Month Change</p>
          <div className="flex items-center gap-1 text-green-500 text-sm">
            <ArrowUp className="h-3 w-3" />
            <span>+5.8%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

