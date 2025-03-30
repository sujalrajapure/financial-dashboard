"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Bell, Calendar, Clock, Menu, Search, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"

export function Header() {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-green-500/30 bg-[#0a0a14] px-4">
      <div className="flex items-center gap-2 lg:gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-green-400 hover:bg-green-500/10 hover:text-green-500"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="hidden md:flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-green-500" />
          <h1 className="text-xl font-bold tracking-wider text-green-500">
            BULL RUN <span className="text-xs opacity-70">v1992</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-6 ml-6">
          <Link
            href="/"
            className={`text-sm ${pathname === "/" ? "text-green-500 font-medium" : "text-green-400/70 hover:text-green-400"}`}
          >
            Dashboard
          </Link>
          <Link
            href="/portfolio"
            className={`text-sm ${pathname === "/portfolio" ? "text-green-500 font-medium" : "text-green-400/70 hover:text-green-400"}`}
          >
            Portfolio
          </Link>
          <Link
            href="/market"
            className={`text-sm ${pathname === "/market" ? "text-green-500 font-medium" : "text-green-400/70 hover:text-green-400"}`}
          >
            Market
          </Link>
          <Link
            href="/watchlist"
            className={`text-sm ${pathname === "/watchlist" ? "text-green-500 font-medium" : "text-green-400/70 hover:text-green-400"}`}
          >
            Watchlist
          </Link>
          <Link
            href="/screener"
            className={`text-sm ${pathname === "/screener" ? "text-green-500 font-medium" : "text-green-400/70 hover:text-green-400"}`}
          >
            Screener
          </Link>
          <Link
            href="/analytics"
            className={`text-sm ${pathname === "/analytics" ? "text-green-500 font-medium" : "text-green-400/70 hover:text-green-400"}`}
          >
            Analytics
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-400/70" />
            <span className="text-sm text-green-400/70">{currentTime.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-400/70" />
            <span className="text-sm text-green-400/70">{currentTime.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-green-500/50" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 bg-[#0a0a14] border-green-500/30 text-green-400 w-[200px]"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative text-green-400 hover:bg-green-500/10 hover:text-green-500"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500"></span>
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 border border-green-500/30 bg-green-500/10 text-green-500"
            >
              <User className="h-4 w-4" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#0f1117] border-green-500/30">
            <DropdownMenuLabel className="text-green-400">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-green-500/30" />
            <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-green-400 focus:bg-green-500/20 focus:text-green-400">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-green-500/30" />
            <DropdownMenuItem className="text-red-400 focus:bg-red-500/20 focus:text-red-400">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

