"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ArrowDown, ArrowUp } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function SectorAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-green-400 mb-4">Sector Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0]
                      return (
                        <div className="bg-[#0f1117] border border-green-500/30 p-2 text-xs">
                          <p className="text-green-400">{`${data.name}: ${data.value}%`}</p>
                          <p className="text-green-400/70">{`Return: ${data.payload.return}%`}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <Card className="bg-[#0f1117] border-green-500/30">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium text-green-400 mb-2">Sector Performance</h4>
                <div className="space-y-3">
                  {sectorData.map((sector, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-green-400">{sector.name}</span>
                        <span className={`text-sm ${sector.return >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {sector.return >= 0 ? "+" : ""}
                          {sector.return}%
                        </span>
                      </div>
                      <Progress
                        value={Math.abs(sector.return)}
                        max={50}
                        className="h-2 bg-green-500/20"
                        indicatorClassName={sector.return >= 0 ? "bg-green-500" : "bg-red-500"}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-green-400 mb-4">Sector Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#0f1117] border-green-500/30">
            <CardContent className="p-4">
              <h4 className="text-sm font-medium text-green-400 mb-2">Top Performing Sectors</h4>
              <div className="space-y-2">
                {sectorData
                  .filter((sector) => sector.return > 0)
                  .sort((a, b) => b.return - a.return)
                  .slice(0, 3)
                  .map((sector, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md bg-green-500/5">
                      <div>
                        <div className="font-medium text-green-400">{sector.name}</div>
                        <div className="text-xs text-green-400/70">{sector.value}% of portfolio</div>
                      </div>
                      <div className="flex items-center gap-1 text-green-500">
                        <ArrowUp className="h-3 w-3" />
                        <span>{sector.return}%</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1117] border-green-500/30">
            <CardContent className="p-4">
              <h4 className="text-sm font-medium text-green-400 mb-2">Underperforming Sectors</h4>
              <div className="space-y-2">
                {sectorData
                  .filter((sector) => sector.return < 0)
                  .sort((a, b) => a.return - b.return)
                  .slice(0, 3)
                  .map((sector, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md bg-red-500/5">
                      <div>
                        <div className="font-medium text-green-400">{sector.name}</div>
                        <div className="text-xs text-green-400/70">{sector.value}% of portfolio</div>
                      </div>
                      <div className="flex items-center gap-1 text-red-500">
                        <ArrowDown className="h-3 w-3" />
                        <span>{sector.return}%</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"]

const sectorData = [
  { name: "IT", value: 25, return: 18.5 },
  { name: "Banking", value: 20, return: 22.5 },
  { name: "Energy", value: 15, return: -7.5 },
  { name: "FMCG", value: 12, return: 9.8 },
  { name: "Pharma", value: 10, return: -12.5 },
  { name: "Auto", value: 8, return: 15.2 },
  { name: "Metal", value: 6, return: -21.5 },
  { name: "Realty", value: 4, return: 32.5 },
]

