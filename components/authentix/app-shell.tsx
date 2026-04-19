"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTheme } from "./theme-provider"
import {
  Home,
  Image,
  Video,
  AudioLines,
  FileText,
  Sparkles,
  History,
  Settings,
  MoreHorizontal,
  MoreVertical,
  Globe,
  X,
  Sun,
  Moon,
  PanelLeft,
  LogOut,
} from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", id: "home", href: "/home" },
  { icon: Image, label: "Image Fake Detect", id: "image", href: "/image-detect" },
  { icon: Video, label: "Video Fake Detect", id: "video", href: "/" },
  { icon: AudioLines, label: "Audio Fake Detect", id: "audio", href: "/audio-detect" },
  { icon: FileText, label: "Text Fake Detect", id: "text", href: "/text-detect" },
  { icon: History, label: "Detection History", id: "history", href: "/history" },
  { icon: Settings, label: "Protocol Settings", id: "settings", href: "/settings" },
]

interface AppShellProps {
  children: React.ReactNode
  activeItem?: string
  pageTitle: string
}

const AI_ASSISTANT_PATH = "/ai-assistant"
const PREVIOUS_VIEW_KEY = "authentix-previous-view"
const DEFAULT_VIEW = "/"

export function AppShell({ children, activeItem = "video", pageTitle }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [lang, setLang] = useState<"en" | "zh">("en")
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const isAIAssistantActive = pathname === AI_ASSISTANT_PATH

  // Save the current view when navigating away from AI Assistant
  useEffect(() => {
    if (!isAIAssistantActive && pathname) {
      // Only save non-AI-assistant paths
      localStorage.setItem(PREVIOUS_VIEW_KEY, pathname)
    }
  }, [pathname, isAIAssistantActive])

  // Toggle handler with memory
  const handleAIToggle = useCallback(() => {
    if (isAIAssistantActive) {
      // Currently on AI Assistant, go back to previous view
      const previousView = localStorage.getItem(PREVIOUS_VIEW_KEY) || DEFAULT_VIEW
      router.push(previousView)
    } else {
      // Not on AI Assistant, save current view and go to AI Assistant
      localStorage.setItem(PREVIOUS_VIEW_KEY, pathname || DEFAULT_VIEW)
      router.push(AI_ASSISTANT_PATH)
    }
  }, [isAIAssistantActive, pathname, router])

  // Sign out handler - clears auth state and redirects to login
  const handleSignOut = useCallback(() => {
    localStorage.removeItem("authentix-auth-state")
    // Force a full page reload to reset all state and show login screen
    window.location.href = "/"
  }, [])

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200/60 bg-white/90 backdrop-blur-md transition-all duration-300 dark:border-slate-700/40 dark:bg-[#0f0f1a]/90",
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        )}
        translate="no"
      >
        {/* Logo + Toggle - Now Clickable */}
        <div className="flex items-center justify-between px-6 py-8">
          <Link href="/intro" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0082FD] to-[#A459B5] shadow-lg shadow-purple-500/20">
              <span className="text-lg font-bold text-white">A</span>
            </div>
            <span className="bg-gradient-to-r from-[#0082FD] to-[#A459B5] bg-clip-text text-xl font-bold tracking-tight text-transparent">
              AuthentiX
            </span>
          </Link>
          {/* Sidebar Toggle (inside) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Collapse sidebar"
          >
            <PanelLeft className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = item.id === activeItem
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-[#0082FD]/10 to-[#A459B5]/10 shadow-sm"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800/50"
                )}
              >
                <item.icon
                  className={cn(
                    "size-5 transition-colors",
                    isActive
                      ? "text-[#0082FD]"
                      : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                  )}
                />
                <span
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "bg-gradient-to-r from-[#0082FD] to-[#A459B5] bg-clip-text text-transparent font-semibold"
                      : "text-slate-600 group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-200"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="mt-auto px-4 pb-4">
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

        {/* Account Block */}
        <Link
          href="/profile"
          className="flex w-full items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80"
        >
          <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0082FD] to-[#A459B5] text-xs font-bold text-white shadow-md">
            SY
          </div>
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-medium text-slate-800 dark:text-white">Song Yuanchang</span>
            <span className="text-xs text-slate-400">Personal Account</span>
          </div>
          <MoreHorizontal className="size-4 text-slate-400" />
        </Link>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="mt-2 flex w-full items-center gap-3 rounded-2xl p-3 text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
        >
          <LogOut className="size-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
      </aside>

      {/* Main content area */}
      <main
        className={cn(
          "relative flex min-h-screen flex-1 flex-col transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200/60 bg-white/80 px-8 pb-4 pt-6 backdrop-blur-xl dark:border-slate-700/40 dark:bg-[#0f0f1a]/80">
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle (when collapsed) */}
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Expand sidebar"
              >
                <PanelLeft className="size-5" />
              </button>
            )}
            {/* Page Title */}
            <h1 className="bg-gradient-to-r from-[#0082FD] to-[#A459B5] bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
              {pageTitle}
            </h1>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center gap-3">
            {/* AI Assistant Toggle Button */}
            <button
              onClick={handleAIToggle}
              className={cn(
                "relative flex cursor-pointer items-center gap-2 overflow-visible rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-out active:scale-95",
                isAIAssistantActive
                  ? "bg-gradient-to-r from-[#0082FD] to-[#A459B5] text-white shadow-md shadow-purple-500/20"
                  : "bg-slate-100 text-slate-500 shadow-none hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              )}
              aria-label={isAIAssistantActive ? "Close AI Assistant" : "Open AI Assistant"}
            >
              {/* Always Online Notification Badge */}
              <span className="absolute -right-1 -top-1 z-10 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-white bg-green-500 dark:border-slate-900"></span>
              </span>
              <Sparkles className="size-4" />
              AI 助手
            </button>

            {/* Language Selector */}
            <button
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <Globe className="size-3.5" />
              <span className={lang === "en" ? "text-slate-800 font-medium dark:text-white" : "text-slate-400"}>EN</span>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <span className={lang === "zh" ? "text-slate-800 font-medium dark:text-white" : "text-slate-400"}>CN</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </button>

            {/* Quick Links Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              >
                {showMenu ? <X className="size-4" /> : <MoreVertical className="size-4" />}
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-2xl bg-white p-1.5 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 dark:bg-slate-800/90 dark:shadow-none dark:ring-slate-700">
                  <a
                    href="#"
                    className="block rounded-xl px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="block rounded-xl px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                  >
                    Terms of Service
                  </a>
                  <a
                    href="#"
                    className="block rounded-xl px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
                  >
                    Protocol Docs
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="relative flex min-h-[calc(100vh-100px)] flex-1 flex-col px-8 pb-8 pt-6">
          {children}
        </div>
      </main>
    </div>
  )
}
