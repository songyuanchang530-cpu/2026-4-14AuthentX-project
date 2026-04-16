"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Image,
  Video,
  AudioLines,
  FileText,
  History,
  Settings,
  User,
} from "lucide-react"

const navItems = [
  { icon: Home, label: "首页", id: "home", href: "/home" },
  { icon: Video, label: "视频", id: "video", href: "/" },
  { icon: Image, label: "图片", id: "image", href: "/image-detect" },
  { icon: AudioLines, label: "音频", id: "audio", href: "/audio-detect" },
  { icon: User, label: "我的", id: "profile", href: "/profile" },
]

interface MobileBottomNavProps {
  activeItem?: string
}

export function MobileBottomNav({ activeItem = "video" }: MobileBottomNavProps) {
  const pathname = usePathname()

  // Determine active based on pathname if not provided
  const getActiveItem = () => {
    if (pathname === "/home") return "home"
    if (pathname === "/") return "video"
    if (pathname === "/image-detect") return "image"
    if (pathname === "/audio-detect") return "audio"
    if (pathname === "/profile") return "profile"
    if (pathname === "/history") return "history"
    if (pathname === "/settings") return "settings"
    if (pathname === "/text-detect") return "text"
    return activeItem
  }

  const currentActive = getActiveItem()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/60 bg-white/95 backdrop-blur-xl pb-safe dark:border-slate-700/40 dark:bg-[#0f0f1a]/95">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = item.id === currentActive
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex min-w-[56px] flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 transition-all duration-200 active:scale-95",
                isActive
                  ? "text-[#0082FD]"
                  : "text-slate-400 active:bg-slate-100 dark:text-slate-500 dark:active:bg-slate-800"
              )}
            >
              <item.icon
                className={cn(
                  "size-6 transition-colors",
                  isActive && "text-[#0082FD]"
                )}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors",
                  isActive && "text-[#0082FD]"
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 h-1 w-8 rounded-full bg-gradient-to-r from-[#0082FD] to-[#A459B5]" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
