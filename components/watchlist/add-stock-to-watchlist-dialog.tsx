"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddStockToWatchlistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddStock: (stock: any) => void
}

export function AddStockToWatchlistDialog({ open, onOpenChange, onAddStock }: AddStockToWatchlistDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStock, setSelectedStock] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedStock) return

    const stockDetails = availableStocks.find((stock) => stock.name === selectedStock)

    if (!stockDetails) return

    onAddStock({
      id: Date.now().toString(),
      name: stockDetails.name,
      ticker: stockDetails.ticker,
      lastPrice: stockDetails.price,
      change: stockDetails.change,
      changePercent: stockDetails.changePercent,
      high52w: stockDetails.high52w,
      low52w: stockDetails.low52w,
    })

    // Reset form
    setSearchTerm("")
    setSelectedStock(null)
  }

  const filteredStocks = searchTerm
    ? availableStocks.filter(
        (stock) =>
          stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : availableStocks

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f1117] border-green-500/30 text-green-400 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-green-400">Add Stock to Watchlist</DialogTitle>
          <DialogDescription className="text-green-400/70">
            Add a stock to your watchlist to track its performance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="relative">
              <Label htmlFor="stock-search" className="text-green-400 mb-2 block">
                Search Stock
              </Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-500/50" />
                <Input
                  id="stock-search"
                  type="search"
                  placeholder="Search by name or ticker..."
                  className="pl-8 bg-[#0a0a14] border-green-500/30 text-green-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-[250px] overflow-y-auto">
              {filteredStocks.map((stock) => (
                <div
                  key={stock.ticker}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                    selectedStock === stock.name
                      ? "bg-green-500/20 border border-green-500/50"
                      : "hover:bg-green-500/10 border border-transparent"
                  }`}
                  onClick={() => setSelectedStock(stock.name)}
                >
                  <div>
                    <p className="font-medium text-green-400">{stock.name}</p>
                    <p className="text-xs text-green-400/70">{stock.ticker}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400">₹{stock.price}</p>
                    <p className={`text-xs ${stock.changePercent >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {stock.changePercent >= 0 ? "+" : ""}
                      {stock.changePercent}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-black" disabled={!selectedStock}>
              Add to Watchlist
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const availableStocks = [
  {
    name: "Reliance Industries",
    ticker: "RELIANCE",
    price: 2500,
    change: 45.5,
    changePercent: 1.85,
    high52w: 2700,
    low52w: 1900,
  },
  {
    name: "HDFC Bank",
    ticker: "HDFCBANK",
    price: 1650,
    change: -12.5,
    changePercent: -0.75,
    high52w: 1800,
    low52w: 1400,
  },
  {
    name: "Tata Consultancy Services",
    ticker: "TCS",
    price: 3450,
    change: 65.75,
    changePercent: 1.94,
    high52w: 3600,
    low52w: 3100,
  },
  {
    name: "Infosys",
    ticker: "INFY",
    price: 1450,
    change: -25.5,
    changePercent: -1.73,
    high52w: 1700,
    low52w: 1300,
  },
  {
    name: "Bharti Airtel",
    ticker: "BHARTIARTL",
    price: 950,
    change: -12.5,
    changePercent: -1.3,
    high52w: 1050,
    low52w: 850,
  },
  {
    name: "ITC",
    ticker: "ITC",
    price: 420,
    change: 8.5,
    changePercent: 2.06,
    high52w: 450,
    low52w: 350,
  },
  {
    name: "State Bank of India",
    ticker: "SBIN",
    price: 750,
    change: 28.5,
    changePercent: 3.95,
    high52w: 800,
    low52w: 550,
  },
  {
    name: "Hindustan Unilever",
    ticker: "HINDUNILVR",
    price: 2450,
    change: -8.5,
    changePercent: -0.35,
    high52w: 2600,
    low52w: 2300,
  },
  {
    name: "ICICI Bank",
    ticker: "ICICIBANK",
    price: 1050,
    change: 15.5,
    changePercent: 1.5,
    high52w: 1100,
    low52w: 850,
  },
  {
    name: "Larsen & Toubro",
    ticker: "LT",
    price: 2850,
    change: 42.5,
    changePercent: 1.51,
    high52w: 3000,
    low52w: 2400,
  },
]

