"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/authentix/app-shell"
import { MediaPlayer } from "@/components/authentix/media-player"
import { ClassificationGrid } from "@/components/authentix/classification-grid"
import { ScanParameters } from "@/components/authentix/scan-parameters"
import { TextScanner } from "@/components/authentix/text-scanner"
import { AuthScreen } from "@/components/authentix/auth-screen"

const AUTH_KEY = "authentix-auth-state"

export default function Dashboard() {
  // CRITICAL: Default to false so login screen shows first
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Restore auth state from localStorage after hydration
  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_KEY)
    if (storedAuth === "true") {
      setIsAuthenticated(true)
    }
    setIsHydrated(true)
  }, [])

  // Handle successful authentication
  const handleAuthenticated = () => {
    setIsAuthenticated(true)
    localStorage.setItem(AUTH_KEY, "true")
  }

  // Prevent flash of content during hydration
  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0082FD] to-[#A459B5] shadow-lg shadow-purple-500/20 animate-pulse">
          <span className="text-2xl font-bold text-white">A</span>
        </div>
      </div>
    )
  }

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={handleAuthenticated} />
  }

  return (
    <AppShell activeItem="video" pageTitle="Video Forgery Analysis">
      <div className="grid flex-1 grid-cols-2 items-stretch gap-4">
        {/* Top Left - Media Player & Timeline */}
        <div className="flex min-h-[360px] flex-col">
          <MediaPlayer />
        </div>

        {/* Top Right - Classification Grid */}
        <div className="flex min-h-[360px] flex-col">
          <ClassificationGrid />
        </div>

        {/* Bottom Left - Scan Parameters */}
        <div className="flex min-h-[340px] flex-col">
          <ScanParameters />
        </div>

        {/* Bottom Right - Text Scanner */}
        <div className="flex min-h-[340px] flex-col">
          <TextScanner />
        </div>
      </div>
    </AppShell>
  )
}
