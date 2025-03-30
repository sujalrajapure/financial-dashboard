"use client"

import { useState } from "react"
import { ArrowUpDown, Filter, Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddStockDialog } from "@/components/portfolio/add-stock-dialog"
import { PortfolioChart } from "@/components/portfolio/portfolio-chart"
import { PortfolioStats } from "@/components/portfolio/portfolio-stats"
import { PortfolioAllocation } from "@/components/portfolio/portfolio-allocation"
import { useToast } from "@/components/ui/use-toast"

export default function PortfolioPage() {
  const [isAddStockOpen, setIsAddStockOpen] = useState(false)
  const [portfolioData, setPortfolioData] = useState(initialPortfolioData)
  const { toast } = useToast()

  const handleAddStock = (stock: any) => {
    setPortfolioData([...portfolioData, stock])
    toast({
      title: "Stock Added",
      description: `${stock.name} has been added to your portfolio.`,
      variant: "success",
    })
    setIsAddStockOpen(false)
  }

  const handleDeleteStock = (stockId: string) => {
    setPortfolioData(portfolioData.filter((stock) => stock.id !== stockId))
    toast({
      title: "Stock Removed",
      description: "The stock has been removed from your portfolio.",
      variant: "destructive",
    })
  }

  const totalValue = portfolioData.reduce((sum, stock) => sum + stock.currentPrice * stock.quantity, 0)
  const totalInvestment = portfolioData.reduce((sum, stock) => sum + stock.buyPrice * stock.quantity, 0)
  const totalProfit = totalValue - totalInvestment
  const profitPercentage = (totalProfit / totalInvestment) * 100

  return (
    <div className="container mx-auto p-4 text-green-400">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-bg.svg')] bg-repeat"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-green-500/10 to-transparent"></div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Portfolio header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-500">My Portfolio</h1>
            <p className="text-green-400/70">Manage your stock investments</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-green-500/50 text-green-400 hover:bg-green-500/20"
              onClick={() => setIsAddStockOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Stock
            </Button>
          </div>
        </div>

        {/* Portfolio overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-green-400">Portfolio Performance</CardTitle>
              <CardDescription className="text-green-400/70">Historical value over time</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioChart />
            </CardContent>
          </Card>

          <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-green-400">Portfolio Stats</CardTitle>
              <CardDescription className="text-green-400/70">Current performance</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioStats
                totalValue={totalValue}
                totalInvestment={totalInvestment}
                totalProfit={totalProfit}
                profitPercentage={profitPercentage}
              />
            </CardContent>
          </Card>
        </div>

        {/* Portfolio allocation */}
        <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-400">Portfolio Allocation</CardTitle>
            <CardDescription className="text-green-400/70">Distribution by sector</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioAllocation portfolioData={portfolioData} />
          </CardContent>
        </Card>

        {/* Portfolio table */}
        <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle className="text-green-400">Holdings</CardTitle>
                <CardDescription className="text-green-400/70">Your stock investments</CardDescription>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-green-500/30">
                      <Filter className="h-4 w-4 text-green-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#0f1117] border-green-500/30">
                    <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
                      All Stocks
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
                      Profitable
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
                      Loss Making
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-green-500/30">
                      <SlidersHorizontal className="h-4 w-4 text-green-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#0f1117] border-green-500/30">
                    <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
                      Sort by Name
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
                      Sort by Value
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
                      Sort by Profit
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
                    <TableHead className="text-green-400">
                      <div className="flex items-center">
                        Quantity
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-green-400">
                      <div className="flex items-center">
                        Avg. Buy
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-green-400">
                      <div className="flex items-center">
                        Current
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-green-400">
                      <div className="flex items-center">
                        Value
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-green-400">
                      <div className="flex items-center">
                        P&L
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-green-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolioData.map((stock) => {
                    const currentValue = stock.currentPrice * stock.quantity
                    const investmentValue = stock.buyPrice * stock.quantity
                    const profit = currentValue - investmentValue
                    const profitPercentage = (profit / investmentValue) * 100

                    return (
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
                        <TableCell className="font-mono">{stock.quantity}</TableCell>
                        <TableCell className="font-mono">₹{stock.buyPrice.toFixed(2)}</TableCell>
                        <TableCell className="font-mono">₹{stock.currentPrice.toFixed(2)}</TableCell>
                        <TableCell className="font-mono">₹{currentValue.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className={`flex items-center ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                            <span className="font-mono">₹{profit.toFixed(2)}</span>
                            <span className="ml-2 text-xs">({profitPercentage.toFixed(2)}%)</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                              onClick={() => handleDeleteStock(stock.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddStockDialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen} onAddStock={handleAddStock} />
    </div>
  )
}

const initialPortfolioData = [
  {
    id: "1",
    name: "Reliance Industries",
    ticker: "RELIANCE",
    quantity: 50,
    buyPrice: 2200,
    currentPrice: 2500,
    sector: "Energy",
  },
  {
    id: "2",
    name: "HDFC Bank",
    ticker: "HDFCBANK",
    quantity: 100,
    buyPrice: 1400,
    currentPrice: 1650,
    sector: "Banking",
  },
  {
    id: "3",
    name: "Infosys",
    ticker: "INFY",
    quantity: 75,
    buyPrice: 1500,
    currentPrice: 1450,
    sector: "IT",
  },
  {
    id: "4",
    name: "Tata Motors",
    ticker: "TATAMOTORS",
    quantity: 200,
    buyPrice: 400,
    currentPrice: 550,
    sector: "Automotive",
  },
  {
    id: "5",
    name: "ITC",
    ticker: "ITC",
    quantity: 150,
    buyPrice: 350,
    currentPrice: 420,
    sector: "FMCG",
  },
]

