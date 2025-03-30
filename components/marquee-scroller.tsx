"use client"

import { useEffect, useState } from "react"
import Marquee from "react-fast-marquee"

export function MarqueeScroller() {
  const [tickerItems, setTickerItems] = useState([
    { name: "RELIANCE", price: "₹2,500", change: "+12.5%" },
    { name: "HDFCBANK", price: "₹1,650", change: "+8.2%" },
    { name: "INFY", price: "₹1,450", change: "-2.1%" },
    { name: "TATAMOTORS", price: "₹850", change: "+5.7%" },
    { name: "BHARTIARTL", price: "₹950", change: "-1.3%" },
    { name: "TCS", price: "₹3,450", change: "+1.9%" },
    { name: "ITC", price: "₹420", change: "+1.5%" },
    { name: "SBIN", price: "₹750", change: "+3.9%" },
    { name: "WIPRO", price: "₹420", change: "-3.5%" },
    { name: "ONGC", price: "₹210", change: "+7.2%" },
    { name: "AXISBANK", price: "₹950", change: "+1.2%" },
    { name: "BAJFINANCE", price: "₹7,200", change: "+3.5%" },
    { name: "HCLTECH", price: "₹1,250", change: "-0.8%" },
    { name: "ASIANPAINT", price: "₹3,100", change: "+1.9%" },
    { name: "M&M", price: "₹1,580", change: "+2.7%" },
  ])

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerItems((prevItems) =>
        prevItems.map((item) => {
          // Randomly update some prices
          if (Math.random() > 0.7) {
            const currentPrice = Number.parseFloat(item.price.replace("₹", "").replace(",", ""))
            const change = (Math.random() * 2 - 1) * (currentPrice * 0.01) // -1% to +1% change
            const newPrice = currentPrice + change
            const formattedPrice = `₹${newPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`

            const currentChange = Number.parseFloat(item.change.replace("%", "").replace("+", ""))
            const newChangeValue = currentChange + (Math.random() * 0.4 - 0.2) // -0.2% to +0.2% change
            const newChange = `${newChangeValue >= 0 ? "+" : ""}${newChangeValue.toFixed(1)}%`

            return { ...item, price: formattedPrice, change: newChange }
          }
          return item
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Marquee speed={40} gradient={false} className="text-sm">
      <div className="flex">
        {tickerItems.map((item, index) => (
          <div key={index} className="flex items-center mx-4">
            <span className="font-medium text-green-400">{item.name}</span>
            <span className="mx-2 text-green-400/70">{item.price}</span>
            <span className={`${item.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>{item.change}</span>
          </div>
        ))}
      </div>
    </Marquee>
  )
}

