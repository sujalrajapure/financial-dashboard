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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddStockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddStock: (stock: any) => void
}

export function AddStockDialog({ open, onOpenChange, onAddStock }: AddStockDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStock, setSelectedStock] = useState<string | null>(null)
  const [quantity, setQuantity] = useState("")
  const [buyPrice, setBuyPrice] = useState("")
  const [sector, setSector] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedStock || !quantity || !buyPrice || !sector) return

    const stockDetails = availableStocks.find((stock) => stock.name === selectedStock)

    if (!stockDetails) return

    onAddStock({
      id: Date.now().toString(),
      name: selectedStock,
      ticker: stockDetails.ticker,
      quantity: Number.parseInt(quantity),
      buyPrice: Number.parseFloat(buyPrice),
      currentPrice: stockDetails.price,
      sector,
    })

    // Reset form
    setSearchTerm("")
    setSelectedStock(null)
    setQuantity("")
    setBuyPrice("")
    setSector("")
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
          <DialogTitle className="text-green-400">Add Stock to Portfolio</DialogTitle>
          <DialogDescription className="text-green-400/70">
            Add a new stock to your investment portfolio.
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

            <div className="grid grid-cols-1 gap-2 max-h-[150px] overflow-y-auto">
              {filteredStocks.map((stock) => (
                <div
                  key={stock.ticker}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                    selectedStock === stock.name
                      ? "bg-green-500/20 border border-green-500/50"
                      : "hover:bg-green-500/10 border border-transparent"
                  }`}
                  onClick={() => {
                    setSelectedStock(stock.name)
                    setBuyPrice(stock.price.toString())
                  }}
                >
                  <div>
                    <p className="font-medium text-green-400">{stock.name}</p>
                    <p className="text-xs text-green-400/70">{stock.ticker}</p>
                  </div>
                  <p className="text-green-400">₹{stock.price}</p>
                </div>
              ))}
            </div>

            {selectedStock && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity" className="text-green-400 mb-2 block">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Number of shares"
                      className="bg-[#0a0a14] border-green-500/30 text-green-400"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="buy-price" className="text-green-400 mb-2 block">
                      Buy Price
                    </Label>
                    <Input
                      id="buy-price"
                      type="number"
                      placeholder="Price per share"
                      className="bg-[#0a0a14] border-green-500/30 text-green-400"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="sector" className="text-green-400 mb-2 block">
                    Sector
                  </Label>
                  <Select value={sector} onValueChange={setSector}>
                    <SelectTrigger className="bg-[#0a0a14] border-green-500/30 text-green-400">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f1117] border-green-500/30 text-green-400">
                      <SelectItem value="IT" className="focus:bg-green-500/20 focus:text-green-400">
                        IT
                      </SelectItem>
                      <SelectItem value="Banking" className="focus:bg-green-500/20 focus:text-green-400">
                        Banking
                      </SelectItem>
                      <SelectItem value="Energy" className="focus:bg-green-500/20 focus:text-green-400">
                        Energy
                      </SelectItem>
                      <SelectItem value="FMCG" className="focus:bg-green-500/20 focus:text-green-400">
                        FMCG
                      </SelectItem>
                      <SelectItem value="Pharma" className="focus:bg-green-500/20 focus:text-green-400">
                        Pharma
                      </SelectItem>
                      <SelectItem value="Auto" className="focus:bg-green-500/20 focus:text-green-400">
                        Auto
                      </SelectItem>
                      <SelectItem value="Metal" className="focus:bg-green-500/20 focus:text-green-400">
                        Metal
                      </SelectItem>
                      <SelectItem value="Telecom" className="focus:bg-green-500/20 focus:text-green-400">
                        Telecom
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-black"
              disabled={!selectedStock || !quantity || !buyPrice || !sector}
            >
              Add to Portfolio
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const availableStocks = [
  { name: "Reliance Industries", ticker: "RELIANCE", price: 2500 },
  { name: "HDFC Bank", ticker: "HDFCBANK", price: 1650 },
  { name: "Tata Consultancy Services", ticker: "TCS", price: 3450 },
  { name: "Infosys", ticker: "INFY", price: 1450 },
  { name: "Bharti Airtel", ticker: "BHARTIARTL", price: 950 },
  { name: "ITC", ticker: "ITC", price: 420 },
  { name: "State Bank of India", ticker: "SBIN", price: 750 },
  { name: "Hindustan Unilever", ticker: "HINDUNILVR", price: 2450 },
  { name: "ICICI Bank", ticker: "ICICIBANK", price: 1050 },
  { name: "Larsen & Toubro", ticker: "LT", price: 2850 },
  { name: "Kotak Mahindra Bank", ticker: "KOTAKBANK", price: 1750 },
  { name: "Axis Bank", ticker: "AXISBANK", price: 950 },
  { name: "Bajaj Finance", ticker: "BAJFINANCE", price: 7200 },
  { name: "Asian Paints", ticker: "ASIANPAINT", price: 3100 },
  { name: "HCL Technologies", ticker: "HCLTECH", price: 1250 },
]

