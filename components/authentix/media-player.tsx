"use client"

import { useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const subjects = [
  { id: 1, label: "Subject A", color: "from-[#0082FD] to-cyan-400" },
  { id: 2, label: "Subject B", color: "from-[#A459B5] to-pink-400" },
  { id: 3, label: "Face #3", color: "from-orange-500 to-yellow-400" },
  { id: 4, label: "Voice #1", color: "from-emerald-500 to-teal-400" },
]

const timelineSegments = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  type: i % 7 === 0 ? "anomaly" : i % 5 === 0 ? "flagged" : "normal",
}))

export function MediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeSubject, setActiveSubject] = useState(1)
  const [scrubberPosition, setScrubberPosition] = useState(35)
  const [showSubjects, setShowSubjects] = useState(false)

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-4 shadow-xl shadow-indigo-100/50 md:p-6 dark:bg-[#1a1a2e] dark:shadow-none">
      <div className="mb-3 flex items-center justify-between md:mb-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Media Preview</h3>
        <span className="max-w-[120px] truncate text-xs text-slate-400 md:max-w-none">VIDEO_SAMPLE_001.mp4</span>
      </div>

      <div className="flex flex-1 flex-col gap-4 lg:flex-row">
        {/* Video Player Area */}
        <div className="flex flex-1 flex-col">
          {/* Video placeholder */}
          <div className="relative flex-1 overflow-hidden rounded-2xl bg-slate-100 dark:bg-zinc-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-slate-200 p-4 dark:bg-zinc-800">
                  <Play className="size-8 text-slate-400 dark:text-zinc-600" />
                </div>
                <span className="text-xs text-slate-400 dark:text-zinc-600">No media loaded</span>
              </div>
            </div>
            
            {/* Playback controls overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-center gap-4">
                <button className="rounded-full p-2 transition-colors hover:bg-white/10">
                  <SkipBack className="size-4 text-white/70" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="rounded-full bg-white/20 p-3 backdrop-blur-sm transition-transform hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="size-5 text-white" />
                  ) : (
                    <Play className="size-5 text-white" />
                  )}
                </button>
                <button className="rounded-full p-2 transition-colors hover:bg-white/10">
                  <SkipForward className="size-4 text-white/70" />
                </button>
                <button className="ml-4 rounded-full p-2 transition-colors hover:bg-white/10">
                  <Volume2 className="size-4 text-white/70" />
                </button>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-[10px] text-slate-400">
              <span>00:00:00</span>
              <span>00:01:52.50</span>
              <span>00:03:45.00</span>
            </div>
            
            {/* Segments track */}
            <div 
              className="relative h-8 cursor-pointer rounded-xl bg-slate-100 p-1 dark:bg-zinc-900"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const pos = ((e.clientX - rect.left) / rect.width) * 100
                setScrubberPosition(Math.max(0, Math.min(100, pos)))
              }}
            >
              <div className="flex h-full gap-[2px]">
                {timelineSegments.map((segment) => (
                  <div
                    key={segment.id}
                    className={cn(
                      "flex-1 rounded-sm transition-colors",
                      segment.type === "anomaly"
                        ? "bg-red-400/60"
                        : segment.type === "flagged"
                          ? "bg-amber-400/50"
                          : "bg-slate-300 dark:bg-zinc-700"
                    )}
                  />
                ))}
              </div>
              
              {/* Scrubber */}
              <div
                className="absolute top-0 h-full w-0.5 bg-gradient-to-b from-[#0082FD] to-[#A459B5] transition-all"
                style={{ left: `${scrubberPosition}%` }}
              >
                <div className="absolute -left-1.5 -top-1 size-3 rounded-full bg-[#0082FD] shadow-lg shadow-[#0082FD]/50" />
              </div>
            </div>

            {/* Legend */}
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-sm bg-red-400/60" />
                <span className="text-[10px] text-slate-500">Anomaly</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-sm bg-amber-400/50" />
                <span className="text-[10px] text-slate-500">Flagged</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-sm bg-slate-300 dark:bg-zinc-700" />
                <span className="text-[10px] text-slate-500">Normal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects panel - Collapsible on mobile */}
        <div className="lg:w-36">
          {/* Mobile: Collapsible header */}
          <button
            onClick={() => setShowSubjects(!showSubjects)}
            className="mb-3 flex w-full items-center justify-between lg:pointer-events-none"
          >
            <h4 className="text-xs uppercase tracking-wider text-slate-400">
              Subjects
            </h4>
            <div className="lg:hidden">
              {showSubjects ? (
                <ChevronUp className="size-4 text-slate-400" />
              ) : (
                <ChevronDown className="size-4 text-slate-400" />
              )}
            </div>
          </button>
          
          {/* Mobile: Grid layout when expanded, Desktop: Always visible column */}
          <div className={cn(
            "grid grid-cols-2 gap-2 lg:flex lg:flex-col",
            !showSubjects && "hidden lg:flex"
          )}>
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setActiveSubject(subject.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-all active:scale-[0.98] lg:py-2",
                  activeSubject === subject.id
                    ? "bg-slate-100 dark:bg-zinc-800"
                    : "bg-slate-50 active:bg-slate-100 lg:bg-transparent lg:hover:bg-slate-50 dark:bg-zinc-900/50 dark:active:bg-zinc-800 lg:dark:bg-transparent lg:dark:hover:bg-zinc-800/50"
                )}
              >
                <div
                  className={cn(
                    "size-3 rounded-full bg-gradient-to-br",
                    subject.color
                  )}
                />
                <span
                  className={cn(
                    "text-xs",
                    activeSubject === subject.id
                      ? "text-slate-800 font-medium dark:text-white"
                      : "text-slate-500 dark:text-zinc-400"
                  )}
                >
                  {subject.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
