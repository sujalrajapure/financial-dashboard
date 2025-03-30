"use client"

import type React from "react"

import { useState } from "react"

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

interface AddWatchlistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddWatchlist: (watchlist: { id: string; name: string }) => void
}

export function AddWatchlistDialog({ open, onOpenChange, onAddWatchlist }: AddWatchlistDialogProps) {
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) return

    onAddWatchlist({
      id: Date.now().toString(),
      name: name.trim(),
    })

    setName("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f1117] border-green-500/30 text-green-400 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-green-400">Create New Watchlist</DialogTitle>
          <DialogDescription className="text-green-400/70">
            Create a new watchlist to track stocks you're interested in.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="watchlist-name" className="text-green-400 mb-2 block">
                Watchlist Name
              </Label>
              <Input
                id="watchlist-name"
                placeholder="Enter watchlist name"
                className="bg-[#0a0a14] border-green-500/30 text-green-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-black" disabled={!name.trim()}>
              Create Watchlist
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

