"use client"

import { TrendingDown, TrendingUp } from "lucide-react"

export function MarketIndices() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {marketIndices.map((index) => (
        <div
          key={index.name}
          className="bg-[#0f1117] border border-green-500/30 rounded-lg p-4 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-green-400">{index.name}</h3>
            {index.change >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
          <p className="text-2xl font-bold text-green-500">{index.value.toLocaleString()}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-sm ${index.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {index.change >= 0 ? "+" : ""}
              {index.change}%
            </span>
            <span className="text-xs text-green-400/70">
              ({index.changeValue >= 0 ? "+" : ""}
              {index.changeValue.toLocaleString()})
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

const marketIndices = [
  {
    name: "SENSEX",
    value: 72568,
    change: 1.2,
    changeValue: 865,
  },
  {
    name: "NIFTY 50",
    value: 22045,
    change: 0.9,
    changeValue: 198,
  },
  {
    name: "NIFTY BANK",
    value: 47250,
    change: 0.75,
    changeValue: 350,
  },
  {
    name: "NIFTY IT",
    value: 32450,
    change: -0.5,
    changeValue: -162,
  },
]

