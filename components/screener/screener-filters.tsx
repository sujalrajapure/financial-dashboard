"use client"

import { useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function ScreenerFilters() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [marketCapRange, setMarketCapRange] = useState<[number, number]>([0, 20000])
  const [peRange, setPeRange] = useState<[number, number]>([0, 100])
  const [dividendYieldRange, setDividendYieldRange] = useState<[number, number]>([0, 10])

  return (
    <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-green-400">Filter Stocks</h3>
          <Button variant="outline" size="sm" className="border-green-500/30 text-green-400 hover:bg-green-500/20">
            <X className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sector Filter */}
          <div>
            <Label htmlFor="sector" className="text-green-400 mb-2 block">
              Sector
            </Label>
            <Select>
              <SelectTrigger className="bg-[#0a0a14] border-green-500/30 text-green-400">
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f1117] border-green-500/30 text-green-400">
                <SelectItem value="all" className="focus:bg-green-500/20 focus:text-green-400">
                  All Sectors
                </SelectItem>
                <SelectItem value="it" className="focus:bg-green-500/20 focus:text-green-400">
                  IT
                </SelectItem>
                <SelectItem value="banking" className="focus:bg-green-500/20 focus:text-green-400">
                  Banking
                </SelectItem>
                <SelectItem value="energy" className="focus:bg-green-500/20 focus:text-green-400">
                  Energy
                </SelectItem>
                <SelectItem value="fmcg" className="focus:bg-green-500/20 focus:text-green-400">
                  FMCG
                </SelectItem>
                <SelectItem value="pharma" className="focus:bg-green-500/20 focus:text-green-400">
                  Pharma
                </SelectItem>
                <SelectItem value="auto" className="focus:bg-green-500/20 focus:text-green-400">
                  Auto
                </SelectItem>
                <SelectItem value="metal" className="focus:bg-green-500/20 focus:text-green-400">
                  Metal
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Market Cap Filter */}
          <div>
            <Label className="text-green-400 mb-2 block">Market Cap (₹ Cr)</Label>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 20000]}
                max={20000}
                step={100}
                value={marketCapRange}
                onValueChange={(value) => setMarketCapRange(value as [number, number])}
                className="py-4"
              />
              <div className="flex justify-between items-center gap-2">
                <Input
                  type="number"
                  value={marketCapRange[0]}
                  onChange={(e) => setMarketCapRange([Number(e.target.value), marketCapRange[1]])}
                  className="bg-[#0a0a14] border-green-500/30 text-green-400 h-8"
                />
                <span className="text-green-400">to</span>
                <Input
                  type="number"
                  value={marketCapRange[1]}
                  onChange={(e) => setMarketCapRange([marketCapRange[0], Number(e.target.value)])}
                  className="bg-[#0a0a14] border-green-500/30 text-green-400 h-8"
                />
              </div>
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <Label className="text-green-400 mb-2 block">Price Range (₹)</Label>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 10000]}
                max={10000}
                step={100}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="py-4"
              />
              <div className="flex justify-between items-center gap-2">
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="bg-[#0a0a14] border-green-500/30 text-green-400 h-8"
                />
                <span className="text-green-400">to</span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="bg-[#0a0a14] border-green-500/30 text-green-400 h-8"
                />
              </div>
            </div>
          </div>

          {/* P/E Ratio Filter */}
          <div>
            <Label className="text-green-400 mb-2 block">P/E Ratio</Label>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={1}
                value={peRange}
                onValueChange={(value) => setPeRange(value as [number, number])}
                className="py-4"
              />
              <div className="flex justify-between items-center gap-2">
                <Input
                  type="number"
                  value={peRange[0]}
                  onChange={(e) => setPeRange([Number(e.target.value), peRange[1]])}
                  className="bg-[#0a0a14] border-green-500/30 text-green-400 h-8"
                />
                <span className="text-green-400">to</span>
                <Input
                  type="number"
                  value={peRange[1]}
                  onChange={(e) => setPeRange([peRange[0], Number(e.target.value)])}
                  className="bg-[#0a0a14] border-green-500/30 text-green-400 h-8"
                />
              </div>
            </div>
          </div>

          {/* Dividend Yield Filter */}
          <div>
            <Label className="text-green-400 mb-2 block">Dividend Yield (%)</Label>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 10]}
                max={10}
                step={0.1}
                value={dividendYieldRange}
                onValueChange={(value) => setDividendYieldRange(value as [number, number])}
                className="py-4"
              />
              <div className="flex justify-between items-center gap-2">
                <Input
                  type="number"
                  value={dividendYieldRange[0]}
                  onChange={(e) => setDividendYieldRange([Number(e.target.value), dividendYieldRange[1]])}
                  className="bg-[#0a0a14] border-green-500/30 text-green-400 h-8"
                />
                <span className="text-green-400">to</span>
                <Input
                  type="number"
                  value={dividendYieldRange[1]}
                  onChange={(e) => setDividendYieldRange([dividendYieldRange[0], Number(e.target.value)])}
                  className="bg-[#0a0a14] border-green-500/30 text-green-400 h-8"
                />
              </div>
            </div>
          </div>

          {/* 52 Week Range */}
          <div>
            <Label htmlFor="52w-range" className="text-green-400 mb-2 block">
              52 Week Range
            </Label>
            <Select>
              <SelectTrigger className="bg-[#0a0a14] border-green-500/30 text-green-400">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f1117] border-green-500/30 text-green-400">
                <SelectItem value="any" className="focus:bg-green-500/20 focus:text-green-400">
                  Any
                </SelectItem>
                <SelectItem value="near-high" className="focus:bg-green-500/20 focus:text-green-400">
                  Near 52W High
                </SelectItem>
                <SelectItem value="near-low" className="focus:bg-green-500/20 focus:text-green-400">
                  Near 52W Low
                </SelectItem>
                <SelectItem value="breaking-high" className="focus:bg-green-500/20 focus:text-green-400">
                  Breaking 52W High
                </SelectItem>
                <SelectItem value="breaking-low" className="focus:bg-green-500/20 focus:text-green-400">
                  Breaking 52W Low
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Volume Filter */}
          <div>
            <Label htmlFor="volume" className="text-green-400 mb-2 block">
              Volume
            </Label>
            <Select>
              <SelectTrigger className="bg-[#0a0a14] border-green-500/30 text-green-400">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f1117] border-green-500/30 text-green-400">
                <SelectItem value="any" className="focus:bg-green-500/20 focus:text-green-400">
                  Any
                </SelectItem>
                <SelectItem value="high" className="focus:bg-green-500/20 focus:text-green-400">
                  High Volume
                </SelectItem>
                <SelectItem value="low" className="focus:bg-green-500/20 focus:text-green-400">
                  Low Volume
                </SelectItem>
                <SelectItem value="increasing" className="focus:bg-green-500/20 focus:text-green-400">
                  Increasing Volume
                </SelectItem>
                <SelectItem value="decreasing" className="focus:bg-green-500/20 focus:text-green-400">
                  Decreasing Volume
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Performance Filter */}
          <div>
            <Label htmlFor="performance" className="text-green-400 mb-2 block">
              Performance
            </Label>
            <Select>
              <SelectTrigger className="bg-[#0a0a14] border-green-500/30 text-green-400">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f1117] border-green-500/30 text-green-400">
                <SelectItem value="any" className="focus:bg-green-500/20 focus:text-green-400">
                  Any
                </SelectItem>
                <SelectItem value="up-today" className="focus:bg-green-500/20 focus:text-green-400">
                  Up Today
                </SelectItem>
                <SelectItem value="down-today" className="focus:bg-green-500/20 focus:text-green-400">
                  Down Today
                </SelectItem>
                <SelectItem value="up-week" className="focus:bg-green-500/20 focus:text-green-400">
                  Up This Week
                </SelectItem>
                <SelectItem value="down-week" className="focus:bg-green-500/20 focus:text-green-400">
                  Down This Week
                </SelectItem>
                <SelectItem value="up-month" className="focus:bg-green-500/20 focus:text-green-400">
                  Up This Month
                </SelectItem>
                <SelectItem value="down-month" className="focus:bg-green-500/20 focus:text-green-400">
                  Down This Month
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button className="bg-green-500 hover:bg-green-600 text-black">Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  )
}

