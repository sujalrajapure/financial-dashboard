"use client"

import { useState } from "react"
import { Bell, Plus, Search, Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddWatchlistDialog } from "@/components/watchlist/add-watchlist-dialog"
import { AddStockToWatchlistDialog } from "@/components/watchlist/add-stock-to-watchlist-dialog"
import { useToast } from "@/components/ui/use-toast"

export default function WatchlistPage() {
  const [isAddWatchlistOpen, setIsAddWatchlistOpen] = useState(false)
  const [isAddStockOpen, setIsAddStockOpen] = useState(false)
  const [watchlists, setWatchlists] = useState(initialWatchlists)
  const [activeWatchlist, setActiveWatchlist] = useState("default")
  const { toast } = useToast()

  const handleAddWatchlist = (watchlist: { id: string; name: string }) => {
    setWatchlists([...watchlists, { ...watchlist, stocks: [] }])
    setActiveWatchlist(watchlist.id)
    toast({
      title: "Watchlist Created",
      description: `${watchlist.name} has been created.`,
      variant: "success",
    })
    setIsAddWatchlistOpen(false)
  }

  const handleAddStock = (stock: any) => {
    setWatchlists(
      watchlists.map((watchlist) =>
        watchlist.id === activeWatchlist ? { ...watchlist, stocks: [...watchlist.stocks, stock] } : watchlist,
      ),
    )
    toast({
      title: "Stock Added",
      description: `${stock.name} has been added to your watchlist.`,
      variant: "success",
    })
    setIsAddStockOpen(false)
  }

  const handleRemoveStock = (watchlistId: string, stockId: string) => {
    setWatchlists(
      watchlists.map((watchlist) =>
        watchlist.id === watchlistId
          ? {
              ...watchlist,
              stocks: watchlist.stocks.filter((stock) => stock.id !== stockId),
            }
          : watchlist,
      ),
    )
    toast({
      title: "Stock Removed",
      description: "The stock has been removed from your watchlist.",
      variant: "destructive",
    })
  }

  const activeWatchlistData = watchlists.find((w) => w.id === activeWatchlist) || watchlists[0]

  return (
    <div className="container mx-auto p-4 text-green-400">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-bg.svg')] bg-repeat"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-green-500/10 to-transparent"></div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Watchlist header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-500">Watchlists</h1>
            <p className="text-green-400/70">Track stocks you're interested in</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-green-500/50 text-green-400 hover:bg-green-500/20"
              onClick={() => setIsAddWatchlistOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Watchlist
            </Button>
            <Button
              variant="outline"
              className="border-green-500/50 text-green-400 hover:bg-green-500/20"
              onClick={() => setIsAddStockOpen(true)}
            >
              <Star className="mr-2 h-4 w-4" />
              Add Stock
            </Button>
          </div>
        </div>

        {/* Watchlist tabs */}
        <Tabs value={activeWatchlist} onValueChange={setActiveWatchlist} className="w-full">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <TabsList className="bg-[#0f1117] border border-green-500/30">
              {watchlists.map((watchlist) => (
                <TabsTrigger
                  key={watchlist.id}
                  value={watchlist.id}
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
                >
                  {watchlist.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {watchlists.map((watchlist) => (
            <TabsContent key={watchlist.id} value={watchlist.id} className="mt-6">
              <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <CardTitle className="text-green-400">{watchlist.name}</CardTitle>
                      <CardDescription className="text-green-400/70">{watchlist.stocks.length} stocks</CardDescription>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-500/50" />
                      <Input
                        type="search"
                        placeholder="Search stocks..."
                        className="pl-8 bg-[#0a0a14] border-green-500/30 text-green-400 w-[200px]"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {watchlist.stocks.length === 0 ? (
                    <div className="text-center py-12">
                      <Star className="h-12 w-12 text-green-500/30 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-green-400 mb-2">No stocks in this watchlist</h3>
                      <p className="text-green-400/70 mb-4">Add stocks to track their performance</p>
                      <Button
                        variant="outline"
                        className="border-green-500/50 text-green-400 hover:bg-green-500/20"
                        onClick={() => setIsAddStockOpen(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Stock
                      </Button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-green-500/30 hover:bg-green-500/5">
                            <TableHead className="text-green-400">Stock</TableHead>
                            <TableHead className="text-green-400">Last Price</TableHead>
                            <TableHead className="text-green-400">Change</TableHead>
                            <TableHead className="text-green-400">Change %</TableHead>
                            <TableHead className="text-green-400">52W High</TableHead>
                            <TableHead className="text-green-400">52W Low</TableHead>
                            <TableHead className="text-green-400">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {watchlist.stocks.map((stock) => (
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
                              <TableCell className="font-mono">₹{stock.lastPrice.toFixed(2)}</TableCell>
                              <TableCell className="font-mono">
                                <span className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                                  {stock.change >= 0 ? "+" : ""}₹{stock.change.toFixed(2)}
                                </span>
                              </TableCell>
                              <TableCell className="font-mono">
                                <span className={stock.changePercent >= 0 ? "text-green-500" : "text-red-500"}>
                                  {stock.changePercent >= 0 ? "+" : ""}
                                  {stock.changePercent.toFixed(2)}%
                                </span>
                              </TableCell>
                              <TableCell className="font-mono">₹{stock.high52w.toFixed(2)}</TableCell>
                              <TableCell className="font-mono">₹{stock.low52w.toFixed(2)}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10"
                                  >
                                    <Bell className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                    onClick={() => handleRemoveStock(watchlist.id, stock.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <AddWatchlistDialog
        open={isAddWatchlistOpen}
        onOpenChange={setIsAddWatchlistOpen}
        onAddWatchlist={handleAddWatchlist}
      />

      <AddStockToWatchlistDialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen} onAddStock={handleAddStock} />
    </div>
  )
}

const initialWatchlists = [
  {
    id: "default",
    name: "Default",
    stocks: [
      {
        id: "1",
        name: "Reliance Industries",
        ticker: "RELIANCE",
        lastPrice: 2500,
        change: 45.5,
        changePercent: 1.85,
        high52w: 2700,
        low52w: 1900,
      },
      {
        id: "2",
        name: "HDFC Bank",
        ticker: "HDFCBANK",
        lastPrice: 1650,
        change: -12.5,
        changePercent: -0.75,
        high52w: 1800,
        low52w: 1400,
      },
      {
        id: "3",
        name: "Tata Consultancy Services",
        ticker: "TCS",
        lastPrice: 3450,
        change: 65.75,
        changePercent: 1.94,
        high52w: 3600,
        low52w: 3100,
      },
    ],
  },
  {
    id: "tech",
    name: "Tech Stocks",
    stocks: [
      {
        id: "3",
        name: "Tata Consultancy Services",
        ticker: "TCS",
        lastPrice: 3450,
        change: 65.75,
        changePercent: 1.94,
        high52w: 3600,
        low52w: 3100,
      },
      {
        id: "4",
        name: "Infosys",
        ticker: "INFY",
        lastPrice: 1450,
        change: -25.5,
        changePercent: -1.73,
        high52w: 1700,
        low52w: 1300,
      },
      {
        id: "5",
        name: "Wipro",
        ticker: "WIPRO",
        lastPrice: 420,
        change: 8.5,
        changePercent: 2.06,
        high52w: 450,
        low52w: 350,
      },
    ],
  },
]

