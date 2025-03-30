"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function MarketHeatmap() {
  const [view, setView] = useState<"sector" | "stocks">("sector")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-green-500/30 text-green-400">
              {view === "sector" ? "Sector View" : "Stocks View"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#0f1117] border-green-500/30">
            <DropdownMenuItem
              className="text-green-400 focus:bg-green-500/20 focus:text-green-400"
              onClick={() => setView("sector")}
            >
              Sector View
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-green-400 focus:bg-green-500/20 focus:text-green-400"
              onClick={() => setView("stocks")}
            >
              Stocks View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {view === "sector" ? (
        <div className="grid grid-cols-4 gap-2">
          {sectorData.map((sector) => (
            <div
              key={sector.name}
              className="aspect-square p-2 flex flex-col justify-between rounded-md cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: getColorByPerformance(sector.performance),
                fontSize: `${Math.min(1 + sector.marketCap / 5000, 1.5)}rem`,
              }}
            >
              <div className="font-bold">{sector.name}</div>
              <div className="text-sm">
                {sector.performance > 0 ? "+" : ""}
                {sector.performance}%
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-8 gap-1">
          {stockData.map((stock) => (
            <div
              key={stock.ticker}
              className="aspect-square p-1 flex flex-col justify-center items-center rounded-md cursor-pointer hover:opacity-90 transition-opacity text-center"
              style={{
                backgroundColor: getColorByPerformance(stock.performance),
              }}
            >
              <div className="font-bold text-xs">{stock.ticker}</div>
              <div className="text-xs">
                {stock.performance > 0 ? "+" : ""}
                {stock.performance}%
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center items-center gap-2 mt-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ef4444" }}></div>
          <span className="text-xs text-green-400/70">-5%+</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f87171" }}></div>
          <span className="text-xs text-green-400/70">-2% to -5%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#fca5a5" }}></div>
          <span className="text-xs text-green-400/70">0% to -2%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#86efac" }}></div>
          <span className="text-xs text-green-400/70">0% to +2%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#4ade80" }}></div>
          <span className="text-xs text-green-400/70">+2% to +5%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10b981" }}></div>
          <span className="text-xs text-green-400/70">+5%+</span>
        </div>
      </div>
    </div>
  )
}

function getColorByPerformance(performance: number): string {
  if (performance <= -5) return "#ef4444" // Strong red
  if (performance <= -2) return "#f87171" // Medium red
  if (performance < 0) return "#fca5a5" // Light red
  if (performance <= 2) return "#86efac" // Light green
  if (performance <= 5) return "#4ade80" // Medium green
  return "#10b981" // Strong green
}

const sectorData = [
  { name: "IT", performance: -2.1, marketCap: 4500 },
  { name: "Banking", performance: 2.5, marketCap: 5000 },
  { name: "Energy", performance: 1.8, marketCap: 4200 },
  { name: "FMCG", performance: 0.9, marketCap: 3800 },
  { name: "Pharma", performance: -1.2, marketCap: 3500 },
  { name: "Auto", performance: 3.5, marketCap: 3200 },
  { name: "Metal", performance: -3.2, marketCap: 2800 },
  { name: "Realty", performance: 5.8, marketCap: 2200 },
  { name: "Media", performance: -0.7, marketCap: 1800 },
  { name: "Telecom", performance: 1.2, marketCap: 2500 },
  { name: "PSU", performance: 2.8, marketCap: 2000 },
  { name: "Oil & Gas", performance: -1.5, marketCap: 3000 },
]

const stockData = [
  { ticker: "REL", performance: 1.8 },
  { ticker: "TCS", performance: -1.2 },
  { ticker: "HDFC", performance: 2.5 },
  { ticker: "INFY", performance: -2.1 },
  { ticker: "ITC", performance: 0.9 },
  { ticker: "SBI", performance: 3.5 },
  { ticker: "AIRTEL", performance: 1.2 },
  { ticker: "L&T", performance: 0.5 },
  { ticker: "WIPRO", performance: -3.2 },
  { ticker: "ONGC", performance: -1.5 },
  { ticker: "AXIS", performance: 2.8 },
  { ticker: "BAJAJ", performance: 4.2 },
  { ticker: "HCL", performance: -0.8 },
  { ticker: "ASIAN", performance: 1.9 },
  { ticker: "M&M", performance: 2.7 },
  { ticker: "TATA", performance: 5.8 },
  { ticker: "ADANI", performance: -5.2 },
  { ticker: "NTPC", performance: 3.2 },
  { ticker: "COAL", performance: -1.9 },
  { ticker: "ICICI", performance: 1.5 },
  { ticker: "KOTAK", performance: 0.7 },
  { ticker: "HIND", performance: -0.3 },
  { ticker: "CIPLA", performance: -2.5 },
  { ticker: "TITAN", performance: 2.1 },
  { ticker: "GAIL", performance: -1.1 },
  { ticker: "MARUTI", performance: 3.8 },
  { ticker: "NESTLE", performance: 0.4 },
  { ticker: "ULTRA", performance: -0.6 },
  { ticker: "POWER", performance: 1.7 },
  { ticker: "TATA ST", performance: -2.2 },
  { ticker: "BAJFIN", performance: 3.5 },
  { ticker: "HEROMOTOCO", performance: 2.3 },
]

