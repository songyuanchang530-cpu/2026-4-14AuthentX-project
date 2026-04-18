"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Video, Image, AudioLines, FileText } from "lucide-react"

const mediaTypes = [
  {
    icon: Video,
    label: "Video",
    description: "Deepfake video detection",
    href: "/",
    color: "from-[#A459B5] to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-[#A459B5]",
  },
  {
    icon: Image,
    label: "Image",
    description: "Face swap & manipulation",
    href: "/image-detect",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    iconColor: "text-pink-500",
  },
  {
    icon: AudioLines,
    label: "Audio",
    description: "Voice clone detection",
    href: "/audio-detect",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    iconColor: "text-orange-500",
  },
  {
    icon: FileText,
    label: "Text",
    description: "AI-generated text scan",
    href: "/text-detect",
    color: "from-[#0082FD] to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-[#0082FD]",
  },
]

export function AnalyzeTypeSelector() {
  const pathname = usePathname()

  const getCurrentType = () => {
    if (pathname === "/") return "Video"
    if (pathname === "/image-detect") return "Image"
    if (pathname === "/audio-detect") return "Audio"
    if (pathname === "/text-detect") return "Text"
    return "Video"
  }

  const currentType = getCurrentType()

  return (
    <div className="mb-4 md:hidden">
      {/* Segmented Control Style Selector */}
      <div className="rounded-2xl bg-white p-2 shadow-lg shadow-slate-200/50 dark:bg-[#1a1a2e] dark:shadow-none">
        <div className="mb-3 px-2 pt-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Select Media Type
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {mediaTypes.map((type) => {
            const isActive = type.label === currentType
            return (
              <Link
                key={type.label}
                href={type.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5 rounded-xl p-3 transition-all duration-200 active:scale-95",
                  isActive
                    ? `bg-gradient-to-br ${type.color} text-white shadow-lg`
                    : `${type.bgColor} active:opacity-80`
                )}
              >
                <type.icon
                  className={cn(
                    "size-6",
                    isActive ? "text-white" : type.iconColor
                  )}
                  strokeWidth={isActive ? 2.2 : 1.5}
                />
                <span
                  className={cn(
                    "text-[11px] font-semibold",
                    isActive ? "text-white" : "text-slate-600 dark:text-slate-300"
                  )}
                >
                  {type.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
