"use client"

import { useState } from "react"
import { Filter, Search, SlidersHorizontal, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScreenerFilters } from "@/components/screener/screener-filters"
import { useToast } from "@/components/ui/use-toast"

export default function ScreenerPage() {
  const [showFilters, setShowFilters] = useState(false)
  const { toast } = useToast()

  const handleAddToWatchlist = (stockName: string) => {
    toast({
      title: "Added to Watchlist",
      description: `${stockName} has been added to your watchlist.`,
      variant: "success",
    })
  }

  return (
    <div className="container mx-auto p-4 text-green-400">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-bg.svg')] bg-repeat"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-green-500/10 to-transparent"></div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Screener header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-500">Stock Screener</h1>
            <p className="text-green-400/70">Find stocks based on specific criteria</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-500/50" />
              <Input
                type="search"
                placeholder="Search stocks..."
                className="pl-8 bg-[#0a0a14] border-green-500/30 text-green-400 w-[200px]"
              />
            </div>
            <Button
              variant="outline"
              className="border-green-500/50 text-green-400 hover:bg-green-500/20"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && <ScreenerFilters />}

        {/* Screener results */}
        <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle className="text-green-400">Screener Results</CardTitle>
                <CardDescription className="text-green-400/70">
                  Showing 50 stocks matching your criteria
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-green-500/30">
                      <SlidersHorizontal className="mr-2 h-4 w-4 text-green-400" />
                      Sort By
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#0f1117] border-green-500/30">
                    <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
                      Market Cap (High to Low)
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
                      Market Cap (Low to High)
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
                      Price (High to Low)
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
                      Price (Low to High)
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
                      P/E Ratio (High to Low)
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
                      P/E Ratio (Low to High)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-green-500/30 hover:bg-green-500/5">
                    <TableHead className="text-green-400">Stock</TableHead>
                    <TableHead className="text-green-400">Price</TableHead>
                    <TableHead className="text-green-400">Change</TableHead>
                    <TableHead className="text-green-400">Market Cap</TableHead>
                    <TableHead className="text-green-400">P/E Ratio</TableHead>
                    <TableHead className="text-green-400">Dividend Yield</TableHead>
                    <TableHead className="text-green-400">52W Range</TableHead>
                    <TableHead className="text-green-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {screenerResults.map((stock) => (
                    <TableRow key={stock.id} className="border-green-500/30 hover:bg-green-500/5">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold">
                            {stock.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-green-400">{stock.name}</div>
                            <div className="text-xs text-green-400/70">{stock.ticker}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">₹{stock.price.toFixed(2)}</TableCell>
                      <TableCell className="font-mono">
                        <span className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                          {stock.change >= 0 ? "+" : ""}
                          {stock.change.toFixed(2)}%
                        </span>
                      </TableCell>
                      <TableCell className="font-mono">₹{stock.marketCap} Cr</TableCell>
                      <TableCell className="font-mono">{stock.pe.toFixed(2)}</TableCell>
                      <TableCell className="font-mono">{stock.dividendYield.toFixed(2)}%</TableCell>
                      <TableCell className="font-mono">
                        <span className="text-red-400">₹{stock.low52w}</span> -{" "}
                        <span className="text-green-400">₹{stock.high52w}</span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10"
                          onClick={() => handleAddToWatchlist(stock.name)}
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const screenerResults = [
  {
    id: "1",
    name: "Reliance Industries",
    ticker: "RELIANCE",
    price: 2500,
    change: 1.85,
    marketCap: "16,85,000",
    pe: 28.5,
    dividendYield: 0.4,
    high52w: 2700,
    low52w: 1900,
  },
  {
    id: "2",
    name: "HDFC Bank",
    ticker: "HDFCBANK",
    price: 1650,
    change: -0.75,
    marketCap: "9,20,000",
    pe: 22.3,
    dividendYield: 0.8,
    high52w: 1800,
    low52w: 1400,
  },
  {
    id: "3",
    name: "Tata Consultancy Services",
    ticker: "TCS",
    price: 3450,
    change: 1.94,
    marketCap: "12,65,000",
    pe: 30.2,
    dividendYield: 1.2,
    high52w: 3600,
    low52w: 3100,
  },
  {
    id: "4",
    name: "Infosys",
    ticker: "INFY",
    price: 1450,
    change: -1.73,
    marketCap: "6,10,000",
    pe: 25.8,
    dividendYield: 2.5,
    high52w: 1700,
    low52w: 1300,
  },
  {
    id: "5",
    name: "Bharti Airtel",
    ticker: "BHARTIARTL",
    price: 850,
    change: 0.65,
    marketCap: "4,75,000",
    pe: 32.1,
    dividendYield: 0.3,
    high52w: 900,
    low52w: 750,
  },
  {
    id: "6",
    name: "ITC",
    ticker: "ITC",
    price: 420,
    change: 2.06,
    marketCap: "5,25,000",
    pe: 26.4,
    dividendYield: 3.8,
    high52w: 450,
    low52w: 350,
  },
  {
    id: "7",
    name: "Hindustan Unilever",
    ticker: "HINDUNILVR",
    price: 2450,
    change: -0.32,
    marketCap: "5,75,000",
    pe: 68.5,
    dividendYield: 1.5,
    high52w: 2600,
    low52w: 2300,
  },
  {
    id: "8",
    name: "Axis Bank",
    ticker: "AXISBANK",
    price: 950,
    change: 1.25,
    marketCap: "2,92,000",
    pe: 16.8,
    dividendYield: 0.6,
    high52w: 1000,
    low52w: 850,
  },
]

