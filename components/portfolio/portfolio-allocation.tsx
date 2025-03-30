"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface PortfolioAllocationProps {
  portfolioData: any[]
}

export function PortfolioAllocation({ portfolioData }: PortfolioAllocationProps) {
  // Calculate sector allocation
  const sectorAllocation = portfolioData.reduce((acc: Record<string, number>, stock) => {
    const value = stock.currentPrice * stock.quantity
    if (acc[stock.sector]) {
      acc[stock.sector] += value
    } else {
      acc[stock.sector] = value
    }
    return acc
  }, {})

  const totalValue = Object.values(sectorAllocation).reduce((sum, value) => sum + (value as number), 0)

  const pieData = Object.entries(sectorAllocation).map(([sector, value]) => ({
    name: sector,
    value: ((value as number) / totalValue) * 100,
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#0f1117] border border-green-500/30 p-2 text-xs">
                      <p className="text-green-400">{`${payload[0].name}: ${payload[0].value.toFixed(1)}%`}</p>
                    </div>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {pieData.map((sector, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-green-500/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="text-green-400">{sector.name}</span>
            </div>
            <div className="text-sm text-green-400">{sector.value.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"]

