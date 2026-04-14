"use client"

import Link from "next/link"
import {
  CloudUpload,
  Image,
  Video,
  AudioLines,
  FileText,
  CheckCircle2,
} from "lucide-react"

const toolCards = [
  {
    icon: Image,
    label: "Image Scan",
    href: "/image-detect",
    iconColor: "text-pink-500",
    bgGlow: "hover:shadow-pink-200/50",
  },
  {
    icon: Video,
    label: "Video Scan",
    href: "/",
    iconColor: "text-[#A459B5]",
    bgGlow: "hover:shadow-purple-200/50",
  },
  {
    icon: AudioLines,
    label: "Audio Scan",
    href: "/audio-detect",
    iconColor: "text-orange-500",
    bgGlow: "hover:shadow-orange-200/50",
  },
  {
    icon: FileText,
    label: "Text Scan",
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
    <div className="scrollbar-hide flex-1 overflow-y-auto">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Universal Drop Zone - Full Width */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-white p-8 shadow-xl shadow-indigo-100/50 md:flex-row dark:bg-[#1a1a2e] dark:shadow-none">
            {/* Left Text */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-semibold text-slate-800 dark:text-white">
                Welcome back. Let&apos;s verify your digital media.
              </h1>
              <p className="mt-3 text-lg text-slate-500">
                Drop any image, video, audio, or text file here for instant AI forensic analysis.
              </p>
            </div>

            {/* Right Drop Zone */}
            <div className="flex h-40 w-full max-w-xs items-center justify-center rounded-2xl bg-gradient-to-br from-[#0082FD]/5 to-[#A459B5]/5 ring-2 ring-dashed ring-[#0082FD]/20 transition-all hover:ring-[#0082FD]/40 dark:bg-zinc-800/30">
              <div className="flex flex-col items-center gap-3">
                <CloudUpload className="size-12 text-[#0082FD]" />
                <span className="text-sm font-medium text-slate-500">
                  Drag & drop or click to upload
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards 2-5: Tool Launchpad */}
        {toolCards.map((tool) => (
          <Link
            key={tool.label}
            href={tool.href}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-xl shadow-indigo-100/50 transition-all hover:scale-[0.98] hover:shadow-2xl ${tool.bgGlow} dark:bg-[#1a1a2e] dark:shadow-none dark:hover:bg-[#1e1e32]`}
          >
            <tool.icon className={`size-12 ${tool.iconColor}`} />
            <span className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">
              {tool.label}
            </span>
          </Link>
        ))}

        {/* Card 6: System Health - 2 Columns */}
        <div className="col-span-1 rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100/50 md:col-span-2 dark:bg-[#1a1a2e] dark:shadow-none">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">System Status</h2>
          <div className="mt-6 flex items-center gap-3">
            <div className="size-4 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
            <span className="text-base text-slate-600 dark:text-zinc-300">
              All Core Models Online & Secure
            </span>
          </div>
          <div className="mt-6">
            <p className="text-sm text-slate-400">Scans Today</p>
            <p className="mt-1 text-3xl font-bold text-slate-800 dark:text-white">1,204</p>
          </div>
        </div>

        {/* Card 7: Recent Activity - 2 Columns */}
        <div className="col-span-1 rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100/50 md:col-span-2 dark:bg-[#1a1a2e] dark:shadow-none">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Scans</h2>
          <div className="mt-4 flex flex-col gap-4">
            {recentScans.map((scan, index) => (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{scan.name}</p>
                    <p className="text-xs text-slate-400">{scan.time}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    scan.status === "authentic"
                      ? "bg-[#0082FD]/10 text-[#0082FD]"
                      : "bg-red-100 text-red-500 dark:bg-red-500/20 dark:text-red-400"
                  }`}
                >
                  {scan.status === "authentic" ? "Authentic" : "AI Detected"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
