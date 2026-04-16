"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTheme } from "./theme-provider"
import {
  Menu,
  X,
  Globe,
  Sun,
  Moon,
  Sparkles,
  Home,
  Image,
  Video,
  AudioLines,
  FileText,
  History,
  Settings,
  User,
  ChevronRight,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { icon: Home, label: "Home", id: "home", href: "/home" },
  { icon: Image, label: "Image Detect", id: "image", href: "/image-detect" },
  { icon: Video, label: "Video Detect", id: "video", href: "/" },
  { icon: AudioLines, label: "Audio Detect", id: "audio", href: "/audio-detect" },
  { icon: FileText, label: "Text Detect", id: "text", href: "/text-detect" },
  { icon: History, label: "History", id: "history", href: "/history" },
  { icon: Settings, label: "Settings", id: "settings", href: "/settings" },
]

const AI_ASSISTANT_PATH = "/ai-assistant"
const PREVIOUS_VIEW_KEY = "authentix-previous-view"
const DEFAULT_VIEW = "/"

interface MobileHeaderProps {
  pageTitle: string
  activeItem?: string
}

export function MobileHeader({ pageTitle, activeItem = "video" }: MobileHeaderProps) {
  const [lang, setLang] = useState<"en" | "zh">("en")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const isAIAssistantActive = pathname === AI_ASSISTANT_PATH

  const handleAIToggle = useCallback(() => {
    if (isAIAssistantActive) {
      const previousView = localStorage.getItem(PREVIOUS_VIEW_KEY) || DEFAULT_VIEW
      router.push(previousView)
    } else {
      localStorage.setItem(PREVIOUS_VIEW_KEY, pathname || DEFAULT_VIEW)
      router.push(AI_ASSISTANT_PATH)
    }
  }, [isAIAssistantActive, pathname, router])

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-xl pt-safe dark:border-slate-700/40 dark:bg-[#0f0f1a]/90">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Left: Menu Button */}
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetTrigger asChild>
            <button
              className="flex size-10 items-center justify-center rounded-xl text-slate-500 transition-colors active:bg-slate-100 dark:text-slate-400 dark:active:bg-slate-800"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="flex h-full flex-col bg-white dark:bg-[#0f0f1a]">
              {/* Logo */}
              <div className="flex items-center gap-3 border-b border-slate-200/60 px-6 py-6 dark:border-slate-700/40">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0082FD] to-[#A459B5] shadow-lg shadow-purple-500/20">
                  <span className="text-lg font-bold text-white">A</span>
                </div>
                <span className="bg-gradient-to-r from-[#0082FD] to-[#A459B5] bg-clip-text text-xl font-bold tracking-tight text-transparent">
                  AuthentiX
                </span>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {navItems.map((item) => {
                  const isActive = item.id === activeItem
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                        isActive
                          ? "bg-gradient-to-r from-[#0082FD]/10 to-[#A459B5]/10"
                          : "active:bg-slate-100 dark:active:bg-slate-800/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon
                          className={cn(
                            "size-5 transition-colors",
                            isActive
                              ? "text-[#0082FD]"
                              : "text-slate-400 dark:text-slate-500"
                          )}
                        />
                        <span
                          className={cn(
                            "transition-colors",
                            isActive
                              ? "bg-gradient-to-r from-[#0082FD] to-[#A459B5] bg-clip-text text-transparent font-semibold"
                              : "text-slate-600 dark:text-slate-400"
                          )}
                        >
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight className={cn(
                        "size-4",
                        isActive ? "text-[#0082FD]" : "text-slate-300 dark:text-slate-600"
                      )} />
                    </Link>
                  )
                })}
              </nav>

              {/* Bottom Section */}
              <div className="border-t border-slate-200/60 px-4 py-4 dark:border-slate-700/40">
                {/* Protocol Status */}
                <div className="mb-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    Protocol Status
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="size-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">Active & Secure</span>
                  </div>
                </div>

                {/* Account */}
                <Link
                  href="/profile"
                  onClick={() => setDrawerOpen(false)}
                  className="flex w-full items-center gap-3 rounded-2xl p-3 transition-colors active:bg-slate-100 dark:active:bg-slate-800/80"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0082FD] to-[#A459B5] text-sm font-bold text-white shadow-md">
                    SY
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium text-slate-800 dark:text-white">Song Yuanchang</span>
                    <span className="text-xs text-slate-400">Personal Account</span>
                  </div>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Center: Page Title */}
        <h1 className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0082FD] to-[#A459B5] bg-clip-text text-base font-semibold tracking-tight text-transparent">
          {pageTitle}
        </h1>

        {/* Right: AI Assistant + Settings */}
        <div className="flex items-center gap-2">
          {/* AI Assistant Button with green indicator */}
          <button
            onClick={handleAIToggle}
            className={cn(
              "relative flex size-10 items-center justify-center rounded-xl transition-all duration-200 active:scale-95",
              isAIAssistantActive
                ? "bg-gradient-to-r from-[#0082FD] to-[#A459B5] text-white shadow-md shadow-purple-500/20"
                : "text-slate-500 active:bg-slate-100 dark:text-slate-400 dark:active:bg-slate-800"
            )}
            aria-label={isAIAssistantActive ? "Close AI Assistant" : "Open AI Assistant"}
          >
            {/* Always Online Notification Badge */}
            <span className="absolute -right-0.5 -top-0.5 z-10 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-white bg-green-500 dark:border-slate-900"></span>
            </span>
            <Sparkles className="size-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex size-10 items-center justify-center rounded-xl text-slate-500 transition-colors active:bg-slate-100 dark:text-slate-400 dark:active:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
