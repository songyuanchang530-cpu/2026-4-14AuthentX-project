"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  ScanSearch,
  History,
  User,
} from "lucide-react"

// Simplified bottom nav with 4 main sections for iPhone
const navItems = [
  { icon: Home, label: "Home", id: "home", href: "/home" },
  { icon: ScanSearch, label: "Analyze", id: "analyze", href: "/" },
  { icon: History, label: "History", id: "history", href: "/history" },
  { icon: User, label: "Profile", id: "profile", href: "/profile" },
]

interface MobileBottomNavProps {
  activeItem?: string
}

export function MobileBottomNav({ activeItem = "video" }: MobileBottomNavProps) {
  const pathname = usePathname()

  // Determine active based on pathname
  const getActiveItem = () => {
    if (pathname === "/home") return "home"
    // All analysis pages map to "analyze"
    if (pathname === "/" || pathname === "/image-detect" || pathname === "/audio-detect" || pathname === "/text-detect") return "analyze"
    if (pathname === "/history") return "history"
    if (pathname === "/profile" || pathname === "/settings") return "profile"
    return activeItem
  }

  const currentActive = getActiveItem()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/60 bg-white/98 backdrop-blur-2xl pb-safe dark:border-slate-700/40 dark:bg-[#0f0f1a]/98">
      <div className="flex h-20 items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = item.id === currentActive
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "relative flex min-h-[52px] min-w-[64px] flex-col items-center justify-center gap-1.5 rounded-2xl px-4 py-2 transition-all duration-300 active:scale-[0.92]",
                isActive
                  ? "text-[#0082FD]"
                  : "text-slate-400 active:bg-slate-100/80 dark:text-slate-500 dark:active:bg-slate-800/80"
              )}
            >
              {/* Active background glow */}
              {isActive && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0082FD]/10 to-[#A459B5]/10" />
              )}
              <item.icon
                className={cn(
                  "relative z-10 size-7 transition-all duration-300",
                  isActive ? "text-[#0082FD]" : ""
                )}
                strokeWidth={isActive ? 2.2 : 1.5}
              />
              <span
                className={cn(
                  "relative z-10 text-[11px] font-semibold tracking-wide transition-colors",
                  isActive 
                    ? "bg-gradient-to-r from-[#0082FD] to-[#A459B5] bg-clip-text text-transparent" 
                    : ""
                )}
              >
                {item.label}
              </span>
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute -top-0.5 h-1 w-12 rounded-full bg-gradient-to-r from-[#0082FD] to-[#A459B5] shadow-lg shadow-[#0082FD]/30" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
