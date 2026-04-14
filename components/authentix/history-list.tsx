"use client"

import { useState } from "react"
import { Search, FileText, Video, Image, Mic, ChevronRight } from "lucide-react"

const filterOptions = ["All", "Text", "Image", "Video", "Audio"] as const

const historyRecords = [
  {
    id: 1,
    type: "text" as const,
    icon: FileText,
    iconColor: "text-[#0082FD]",
    iconBg: "bg-[#0082FD]/10",
    filename: "Debate_Transcript_Living_For_Oneself.txt",
    date: "Nov 12, 2025",
    size: "24KB",
    status: "AI Synthesized (96%)",
    statusColor: "bg-red-100 text-red-500 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
  },
  {
    id: 2,
    type: "video" as const,
    icon: Video,
    iconColor: "text-[#A459B5]",
    iconBg: "bg-[#A459B5]/10",
    filename: "Campus_AI_Assistant_Demo.mp4",
    date: "Nov 10, 2025",
    size: "15.2MB",
    status: "Authentic (98%)",
    statusColor: "bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  },
  {
    id: 3,
    type: "image" as const,
    icon: Image,
    iconColor: "text-pink-500",
    iconBg: "bg-pink-100 dark:bg-pink-400/10",
    filename: "News_Broadcast_Frame_42.png",
    date: "Nov 09, 2025",
    size: "2.4MB",
    status: "Manipulation Detected (Face Swap)",
    statusColor: "bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  },
  {
    id: 4,
    type: "audio" as const,
    icon: Mic,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100 dark:bg-orange-400/10",
    filename: "interview_recording_raw.wav",
    date: "Nov 05, 2025",
    size: "8.1MB",
    status: "Authentic (92%)",
    statusColor: "bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  },
  {
    id: 5,
    type: "text" as const,
    icon: FileText,
    iconColor: "text-[#0082FD]",
    iconBg: "bg-[#0082FD]/10",
    filename: "Research_Paper_Draft_v3.docx",
    date: "Nov 03, 2025",
    size: "156KB",
    status: "AI Synthesized (88%)",
    statusColor: "bg-red-100 text-red-500 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
  },
  {
    id: 6,
    type: "video" as const,
    icon: Video,
    iconColor: "text-[#A459B5]",
    iconBg: "bg-[#A459B5]/10",
    filename: "Press_Conference_Clip.mp4",
    date: "Nov 01, 2025",
    size: "42.8MB",
    status: "Manipulation Detected (Lip Sync)",
    statusColor: "bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  },
] as const

export function HistoryList() {
  const [activeFilter, setActiveFilter] = useState<typeof filterOptions[number]>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRecords = historyRecords.filter((record) => {
    const matchesFilter = activeFilter === "All" || record.type.toLowerCase() === activeFilter.toLowerCase()
    const matchesSearch = record.filename.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100/50 dark:bg-[#1a1a2e] dark:shadow-none">
      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by filename, hash, or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full bg-slate-100 py-3 pl-11 pr-6 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0082FD]/30 dark:bg-zinc-900/50 dark:text-white dark:placeholder:text-zinc-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-[#0082FD] to-[#A459B5] text-white"
                  : "bg-slate-100 text-slate-500 hover:text-slate-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* History Records List */}
      <div className="mt-6 flex flex-col gap-3">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="group flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/80"
          >
            {/* Left: Icon & Info */}
            <div className="flex items-center gap-4">
              <div className={`rounded-xl p-2 ${record.iconBg}`}>
                <record.icon className={`size-5 ${record.iconColor}`} />
              </div>
              <div>
                <p className="font-medium text-slate-800 dark:text-white">{record.filename}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {record.date} • {record.size}
                </p>
              </div>
            </div>

            {/* Right: Status & Action */}
            <div className="flex items-center gap-4">
              <span
                className={`rounded-full border px-3 py-1 text-xs ${record.statusColor}`}
              >
                {record.status}
              </span>
              <ChevronRight className="size-5 text-slate-400 transition-colors group-hover:text-slate-600 dark:text-zinc-600 dark:group-hover:text-zinc-300" />
            </div>
          </div>
        ))}

        {filteredRecords.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-400">No records found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
