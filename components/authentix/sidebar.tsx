"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Home,
  Image,
  Video,
  AudioLines,
  FileText,
  History,
  Settings,
  MoreHorizontal,
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

interface SidebarProps {
  activeItem?: string
  onItemClick?: (id: string) => void
}

export function Sidebar({ activeItem = "video", onItemClick }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white/90 backdrop-blur-md" translate="no">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
          <span className="text-lg font-bold text-white">A</span>
        </div>
        <span className="bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold tracking-tight text-transparent">
          AuthentiX
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = item.id === activeItem
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => onItemClick?.(item.id)}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-indigo-50 shadow-sm"
                  : "hover:bg-slate-100"
              )}
            >
              <item.icon
                className={cn(
                  "size-5 transition-colors",
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              <span
                className={cn(
                  "transition-colors",
                  isActive
                    ? "text-indigo-700 font-semibold"
                    : "text-slate-600 group-hover:text-slate-800"
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
        <div className="mb-4 rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Protocol Status
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="size-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-sm text-slate-700">Active & Secure</span>
          </div>
        </div>

        {/* Account Block - ChatGPT Style */}
        <Link
          href="/profile"
          className="flex w-full items-center gap-3 rounded-xl p-3 transition-colors hover:bg-slate-100"
        >
          {/* Avatar */}
          <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">
            SY
          </div>
          {/* Info */}
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-medium text-slate-800">Song Yuanchang</span>
            <span className="text-xs text-slate-500">Personal Account</span>
          </div>
          {/* More Icon */}
          <MoreHorizontal className="size-4 text-slate-400" />
        </Link>
      </div>
    </aside>
  )
}
