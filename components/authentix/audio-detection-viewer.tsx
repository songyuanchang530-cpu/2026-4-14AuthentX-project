"use client"

import { useState } from "react"
import { Play, Pause, AlertTriangle, Shield, Radio, Waves, Activity } from "lucide-react"

// Static waveform data to prevent hydration mismatch
const WAVEFORM_DATA = [
  51, 45, 52, 63, 66, 79, 64, 71, 72, 77,
  72, 78, 77, 79, 79, 72, 57, 60, 59, 48,
  46, 45, 40, 31, 31, 37, 33, 14, 32, 17,
  30, 25, 29, 13, 28, 35, 28, 32, 29, 45,
  50, 53, 45, 61, 66, 72, 79, 80, 67, 78,
  74, 76, 80, 73, 80, 73, 64, 54, 63, 54,
  54, 46, 41, 41, 36, 31, 30, 24, 18, 12,
  30, 17, 13, 27, 34, 37, 31, 42, 37, 35,
  50, 59, 59, 56, 69, 73, 66, 78, 70, 69,
  79, 80, 78, 80, 66, 78, 79, 75, 64, 62,
  61, 58, 39, 31, 41, 22, 21, 16, 31, 24,
  16, 12, 12, 11, 15, 19, 25, 30, 35, 40
] as const

// Segment boundaries
const FORGERY_START = 35
const FORGERY_END = 55
const AUTHENTIC_START = 70
const AUTHENTIC_END = 90
const TOTAL_BARS = WAVEFORM_DATA.length

export function AudioDetectionViewer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(14)
  const totalTime = 225

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercent = (currentTime / totalTime) * 100

  return (
    <div className="flex h-full flex-col gap-4 md:gap-6">
      {/* Waveform Card - Responsive height */}
      <div className="relative flex h-[260px] flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-lg shadow-indigo-100/50 md:h-[320px] md:rounded-3xl md:p-6 md:shadow-xl dark:bg-[#1a1a2e] dark:shadow-none">
        {/* Waveform Title */}
        <div className="mb-3 flex items-center justify-between md:mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Audio Waveform
          </h4>
          <div className="flex items-center gap-3 text-[10px] text-slate-500 md:gap-4 md:text-xs">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-red-500 md:size-2" />
              <span className="hidden md:inline">Manipulated</span>
              <span className="md:hidden">AI</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-blue-500 md:size-2" />
              <span className="hidden md:inline">Authentic</span>
              <span className="md:hidden">Real</span>
            </span>
          </div>
        </div>

        {/* Waveform Visualization */}
        <div className="relative flex-1 overflow-hidden rounded-xl bg-slate-50">
          {/* Segment highlight overlays */}
          <div 
            className="absolute top-0 h-full border-t-2 border-red-500 bg-red-100/50"
            style={{ 
              left: `${(FORGERY_START / TOTAL_BARS) * 100}%`,
              width: `${((FORGERY_END - FORGERY_START + 1) / TOTAL_BARS) * 100}%`
            }}
          />
          <div 
            className="absolute top-0 h-full bg-blue-100/40"
            style={{ 
              left: `${(AUTHENTIC_START / TOTAL_BARS) * 100}%`,
              width: `${((AUTHENTIC_END - AUTHENTIC_START + 1) / TOTAL_BARS) * 100}%`
            }}
          />

          {/* Waveform bars container */}
          <div className="flex h-full w-full items-center justify-between gap-px md:gap-0.5">
            {WAVEFORM_DATA.map((height, index) => {
              const isInForgery = index >= FORGERY_START && index <= FORGERY_END
              const isInAuthentic = index >= AUTHENTIC_START && index <= AUTHENTIC_END
              
              let barColorClass = "bg-slate-300"
              if (isInForgery) {
                barColorClass = "bg-red-400"
              } else if (isInAuthentic) {
                barColorClass = "bg-blue-400"
              }
              
              return (
                <div
                  key={index}
                  className="flex h-full flex-1 items-center justify-center"
                >
                  <div
                    className={`w-full max-w-1 rounded-full transition-colors ${barColorClass}`}
                    style={{ height: `${height}%` }}
                  />
                </div>
              )
            })}
          </div>

          {/* Forgery Tooltip */}
          <div
            className="absolute top-2 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${((FORGERY_START + FORGERY_END) / 2 / TOTAL_BARS) * 100}%` }}
          >
            <div className="rounded-lg bg-white px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-3 text-red-500" />
                <span className="text-xs font-medium text-red-600">AI Voice Clone</span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">Confidence: 92%</p>
            </div>
            <div className="size-0 border-x-4 border-t-4 border-transparent border-t-white" />
          </div>

          {/* Authentic Tooltip */}
          <div
            className="absolute top-2 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${((AUTHENTIC_START + AUTHENTIC_END) / 2 / TOTAL_BARS) * 100}%` }}
          >
            <div className="rounded-lg bg-white px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <Shield className="size-3 text-blue-500" />
                <span className="text-xs font-medium text-blue-600">Authentic</span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">Confidence: 88%</p>
            </div>
            <div className="size-0 border-x-4 border-t-4 border-transparent border-t-white" />
          </div>
        </div>

        {/* Playback Controls - Touch friendly, larger on mobile */}
        <div className="mt-3 flex items-center gap-3 md:mt-4 md:gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0082FD] to-[#A459B5] text-white shadow-lg shadow-[#0082FD]/25 transition-all active:scale-95 md:size-12 md:bg-slate-100 md:text-slate-700 md:shadow-none md:hover:bg-slate-200"
          >
            {isPlaying ? (
              <Pause className="size-6 md:size-5" />
            ) : (
              <Play className="ml-0.5 size-6 md:size-5" />
            )}
          </button>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 md:gap-3 md:text-sm md:font-normal md:text-slate-500 dark:text-slate-400">
            <span className="font-mono text-base md:text-sm">{formatTime(currentTime)}</span>
            <span className="text-slate-400">/</span>
            <span className="font-mono text-base md:text-sm">{formatTime(totalTime)}</span>
          </div>

          {/* Progress Track - Larger touch target on mobile */}
          <div className="relative flex-1 py-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 md:h-1 dark:bg-slate-700">
              <div
                className="h-full bg-gradient-to-r from-[#0082FD] to-[#A459B5]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={totalTime}
              value={currentTime}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
        </div>
      </div>

      {/* Acoustic Fingerprint & Metadata Card - Vertical stack on mobile */}
      <div className="rounded-2xl bg-white p-4 shadow-lg shadow-indigo-100/50 md:rounded-3xl md:p-6 md:shadow-xl dark:bg-[#1a1a2e] dark:shadow-none">
        <div className="mb-3 flex items-center justify-between md:mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Acoustic Metadata
          </h4>
          <span className="text-[10px] text-slate-400">White Ocean Engine</span>
        </div>
        
        {/* Vertical stack on mobile, horizontal on desktop */}
        <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4">
          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-3 md:bg-transparent md:p-0 dark:bg-slate-800/50 md:dark:bg-transparent">
            <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-100 md:size-10 md:bg-indigo-50 dark:bg-indigo-900/30">
              <Radio className="size-6 text-indigo-500 md:size-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 md:text-xs">Bitrate</p>
              <p className="text-base font-bold text-slate-700 md:text-sm md:font-semibold dark:text-white">320 kbps</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-3 md:bg-transparent md:p-0 dark:bg-slate-800/50 md:dark:bg-transparent">
            <div className="flex size-12 items-center justify-center rounded-xl bg-purple-100 md:size-10 md:bg-purple-50 dark:bg-purple-900/30">
              <Waves className="size-6 text-purple-500 md:size-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 md:text-xs">Frequency</p>
              <p className="text-base font-bold text-slate-700 md:text-sm md:font-semibold dark:text-white">20Hz - 18kHz</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-amber-50 p-3 md:bg-transparent md:p-0 dark:bg-amber-900/20 md:dark:bg-transparent">
            <div className="flex size-12 items-center justify-center rounded-xl bg-amber-100 md:size-10 md:bg-amber-50 dark:bg-amber-900/30">
              <Activity className="size-6 text-amber-500 md:size-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 md:text-xs">Synthesis</p>
              <p className="text-base font-bold text-amber-600 md:text-sm md:font-semibold">67% Likely</p>
            </div>
          </div>
        </div>
      </div>

      {/* Authenticity Score Bar - Touch friendly */}
      <div className="mt-auto flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-4 md:flex-row md:items-center md:justify-between md:rounded-xl md:px-6 md:py-4 dark:from-red-900/20 dark:to-orange-900/20">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-white shadow-sm md:size-auto md:rounded-none md:bg-transparent md:shadow-none dark:bg-slate-800 md:dark:bg-transparent">
            <AlertTriangle className="size-6 text-red-500 md:size-5" />
          </div>
          <div>
            <span className="text-sm font-semibold text-slate-800 md:font-medium dark:text-white">Authenticity Score</span>
            <p className="text-xs font-medium text-red-500 md:font-normal md:text-slate-500">Voice Synthesis Detected</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 md:gap-3">
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-white md:h-2.5 md:w-32 md:flex-initial dark:bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500"
              style={{ width: "34%" }}
            />
          </div>
          <span className="text-2xl font-bold text-red-600 md:text-lg">34%</span>
        </div>
      </div>
    </div>
  )
}
