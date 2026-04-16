"use client"

import Link from "next/link"
import {
  CloudUpload,
  Image,
  Video,
  AudioLines,
  FileText,
  CheckCircle2,
  Plus,
} from "lucide-react"

const toolCards = [
  {
    icon: Image,
    label: "Image Scan",
    shortLabel: "Image",
    href: "/image-detect",
    iconColor: "text-pink-500",
    bgGlow: "hover:shadow-pink-200/50",
  },
  {
    icon: Video,
    label: "Video Scan",
    shortLabel: "Video",
    href: "/",
    iconColor: "text-[#A459B5]",
    bgGlow: "hover:shadow-purple-200/50",
  },
  {
    icon: AudioLines,
    label: "Audio Scan",
    shortLabel: "Audio",
    href: "/audio-detect",
    iconColor: "text-orange-500",
    bgGlow: "hover:shadow-orange-200/50",
  },
  {
    icon: FileText,
    label: "Text Scan",
    shortLabel: "Text",
    href: "/text-detect",
    iconColor: "text-[#0082FD]",
    bgGlow: "hover:shadow-blue-200/50",
  },
]

const recentScans = [
  { name: "interview_audio.wav", time: "2 mins ago", status: "authentic" },
  { name: "product_photo.jpg", time: "15 mins ago", status: "ai-detected" },
  { name: "meeting_notes.txt", time: "1 hour ago", status: "authentic" },
]

export function HomeDashboard() {
  return (
    <div className="scrollbar-hide flex-1 overflow-y-auto pb-4">
      {/* Bento Grid - Responsive */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {/* Card 1: Universal Drop Zone - Full Width */}
        <div className="col-span-2 lg:col-span-4">
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-white p-4 shadow-xl shadow-indigo-100/50 md:flex-row md:gap-8 md:p-8 dark:bg-[#1a1a2e] dark:shadow-none">
            {/* Left Text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-xl font-semibold text-slate-800 md:text-3xl dark:text-white">
                Welcome back. Let&apos;s verify your digital media.
              </h1>
              <p className="mt-2 text-sm text-slate-500 md:mt-3 md:text-lg">
                Drop any image, video, audio, or text file here for instant AI forensic analysis.
              </p>
            </div>

            {/* Right Drop Zone - Mobile optimized */}
            <button className="flex h-28 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#0082FD]/5 to-[#A459B5]/5 ring-2 ring-dashed ring-[#0082FD]/20 transition-all active:scale-[0.98] active:ring-[#0082FD]/40 md:h-40 md:max-w-xs md:hover:ring-[#0082FD]/40 dark:bg-zinc-800/30">
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <CloudUpload className="size-8 text-[#0082FD] md:size-12" />
                <span className="text-xs font-medium text-slate-500 md:text-sm">
                  Tap to upload media
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Cards 2-5: Tool Launchpad - Compact on mobile */}
        {toolCards.map((tool) => (
          <Link
            key={tool.label}
            href={tool.href}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl bg-white p-4 text-center shadow-lg shadow-indigo-100/50 transition-all active:scale-[0.97] md:rounded-3xl md:p-8 md:shadow-xl md:hover:scale-[0.98] md:hover:shadow-2xl ${tool.bgGlow} dark:bg-[#1a1a2e] dark:shadow-none dark:active:bg-[#1e1e32] md:dark:hover:bg-[#1e1e32]`}
          >
            <tool.icon className={`size-8 md:size-12 ${tool.iconColor}`} />
            <span className="mt-2 text-sm font-semibold text-slate-800 md:mt-4 md:text-lg dark:text-white">
              <span className="md:hidden">{tool.shortLabel}</span>
              <span className="hidden md:inline">{tool.label}</span>
            </span>
          </Link>
        ))}

        {/* Card 6: System Health */}
        <div className="col-span-1 rounded-2xl bg-white p-4 shadow-lg shadow-indigo-100/50 md:col-span-1 md:rounded-3xl md:p-6 md:shadow-xl lg:col-span-2 dark:bg-[#1a1a2e] dark:shadow-none">
          <h2 className="text-base font-semibold text-slate-800 md:text-lg dark:text-white">System Status</h2>
          <div className="mt-3 flex items-center gap-2 md:mt-6 md:gap-3">
            <div className="size-3 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)] md:size-4" />
            <span className="text-sm text-slate-600 md:text-base dark:text-zinc-300">
              All Models Online
            </span>
          </div>
          <div className="mt-3 md:mt-6">
            <p className="text-xs text-slate-400 md:text-sm">Scans Today</p>
            <p className="mt-1 text-2xl font-bold text-slate-800 md:text-3xl dark:text-white">1,204</p>
          </div>
        </div>

        {/* Card 7: Recent Activity */}
        <div className="col-span-1 rounded-2xl bg-white p-4 shadow-lg shadow-indigo-100/50 md:col-span-1 md:rounded-3xl md:p-6 md:shadow-xl lg:col-span-2 dark:bg-[#1a1a2e] dark:shadow-none">
          <h2 className="text-base font-semibold text-slate-800 md:text-lg dark:text-white">Recent Scans</h2>
          <div className="mt-3 flex flex-col gap-3 md:mt-4 md:gap-4">
            {recentScans.map((scan, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
                  <CheckCircle2 className="size-4 shrink-0 text-slate-400 md:size-5" />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-slate-800 md:text-sm dark:text-white">{scan.name}</p>
                    <p className="text-[10px] text-slate-400 md:text-xs">{scan.time}</p>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium md:px-3 md:py-1 md:text-xs ${
                    scan.status === "authentic"
                      ? "bg-[#0082FD]/10 text-[#0082FD]"
                      : "bg-red-100 text-red-500 dark:bg-red-500/20 dark:text-red-400"
                  }`}
                >
                  {scan.status === "authentic" ? "Authentic" : "AI"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
