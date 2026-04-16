"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, User, Cpu, Scan } from "lucide-react"

interface BoundingBox {
  id: string
  x: number
  y: number
  width: number
  height: number
  confidence: number
  isFake: boolean
  label: string
}

const mockBoundingBoxes: BoundingBox[] = [
  {
    id: "face-1",
    x: 18,
    y: 22,
    width: 22,
    height: 32,
    confidence: 13,
    isFake: true,
    label: "Face A",
  },
  {
    id: "face-2",
    x: 58,
    y: 20,
    width: 24,
    height: 34,
    confidence: 87,
    isFake: false,
    label: "Face B",
  },
]

export function ImageDetectionViewer() {
  const [selectedBox, setSelectedBox] = useState<string | null>("face-1")

  return (
    <div className="flex h-full flex-col gap-4 md:gap-6">
      {/* Image Preview Card - Responsive height */}
      <div className="relative h-[200px] overflow-hidden rounded-2xl bg-white p-2 shadow-lg shadow-indigo-100/50 md:h-[280px] md:rounded-3xl md:shadow-xl dark:bg-[#1a1a2e] dark:shadow-none">
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-slate-100">
          {/* Placeholder Image - News Broadcast Scene */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
            {/* News desk simulation */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-300/30 to-transparent" />
            
            {/* Two person silhouettes */}
            <div className="absolute bottom-[15%] left-[12%] h-[55%] w-[28%] rounded-t-full bg-slate-300/50" />
            <div className="absolute bottom-[15%] right-[12%] h-[58%] w-[30%] rounded-t-full bg-slate-300/50" />
            
            {/* News ticker simulation */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-red-500/10">
              <div className="flex h-full items-center px-4">
                <span className="text-xs font-medium uppercase tracking-wider text-red-500/70">
                  Breaking News
                </span>
                <span className="ml-4 text-xs text-slate-400">
                  Live Analysis Feed
                </span>
              </div>
            </div>
          </div>

          {/* Bounding Boxes */}
          {mockBoundingBoxes.map((box) => (
            <div
              key={box.id}
              onClick={() => setSelectedBox(box.id)}
              className={`absolute cursor-pointer transition-all duration-300 ${
                selectedBox === box.id ? "z-20" : "z-10"
              }`}
              style={{
                left: `${box.x}%`,
                top: `${box.y}%`,
                width: `${box.width}%`,
                height: `${box.height}%`,
              }}
            >
              {/* Corner brackets */}
              <div className="absolute inset-0">
                <div
                  className={`absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 ${
                    box.isFake
                      ? "border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                      : "border-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.4)]"
                  }`}
                />
                <div
                  className={`absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 ${
                    box.isFake
                      ? "border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                      : "border-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.4)]"
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 ${
                    box.isFake
                      ? "border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                      : "border-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.4)]"
                  }`}
                />
                <div
                  className={`absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 ${
                    box.isFake
                      ? "border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                      : "border-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.4)]"
                  }`}
                />

                {/* Fill on selected */}
                <div
                  className={`absolute inset-0 transition-opacity ${
                    selectedBox === box.id ? "opacity-100" : "opacity-0"
                  } ${box.isFake ? "bg-red-500/10" : "bg-blue-500/10"}`}
                />
              </div>

              {/* Label */}
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs shadow-lg ${
                  box.isFake ? "bg-red-50 text-red-700" : "bg-white text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`size-1.5 rounded-full ${
                      box.isFake ? "bg-red-500 animate-pulse" : "bg-blue-500"
                    }`}
                  />
                  <span>{box.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights & Face Detection Card */}
      <div className="rounded-2xl bg-white p-4 shadow-lg shadow-indigo-100/50 md:rounded-3xl md:p-6 md:shadow-xl dark:bg-[#1a1a2e] dark:shadow-none">
        <div className="mb-3 flex items-center justify-between md:mb-4">
          <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">
            AI Insights
          </h4>
          <div className="flex items-center gap-1.5">
            <Cpu className="size-3 text-indigo-400" />
            <span className="text-[10px] text-slate-400">Vision-Pro</span>
          </div>
        </div>

        {/* Face Detection Results - Touch friendly */}
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {mockBoundingBoxes.map((box) => (
            <button
              key={box.id}
              onClick={() => setSelectedBox(box.id)}
              className={`rounded-xl p-3 text-left transition-all active:scale-[0.98] md:p-4 ${
                selectedBox === box.id
                  ? box.isFake
                    ? "bg-red-50 ring-2 ring-red-200 dark:bg-red-900/20 dark:ring-red-800"
                    : "bg-blue-50 ring-2 ring-blue-200 dark:bg-blue-900/20 dark:ring-blue-800"
                  : "bg-slate-50 active:bg-slate-100 md:hover:bg-slate-100 dark:bg-slate-800/50 dark:active:bg-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`flex size-7 items-center justify-center rounded-lg md:size-8 ${
                    box.isFake ? "bg-red-100 dark:bg-red-900/30" : "bg-blue-100 dark:bg-blue-900/30"
                  }`}>
                    <User className={`size-3.5 md:size-4 ${box.isFake ? "text-red-500" : "text-blue-500"}`} />
                  </div>
                  <span className="text-sm font-medium text-slate-800 dark:text-white">{box.label}</span>
                </div>
                {box.isFake ? (
                  <AlertTriangle className="size-4 text-red-500" />
                ) : (
                  <CheckCircle className="size-4 text-blue-500" />
                )}
              </div>
              
              <div className="mt-2 flex items-center justify-between md:mt-3">
                <span className="text-[10px] text-slate-500 md:text-xs">
                  {box.isFake ? "Manipulated" : "Authentic"}
                </span>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-200 md:w-16 dark:bg-slate-700">
                    <div
                      className={`h-full rounded-full ${
                        box.isFake
                          ? "bg-gradient-to-r from-red-500 to-red-400"
                          : "bg-gradient-to-r from-blue-500 to-blue-400"
                      }`}
                      style={{ width: `${box.confidence}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-slate-600 md:text-xs dark:text-slate-400">{box.confidence}%</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats - Responsive */}
        <div className="mt-3 flex items-center justify-around border-t border-slate-100 pt-3 md:mt-4 md:pt-4 dark:border-slate-700">
          <div className="text-center">
            <p className="text-[10px] text-slate-400 md:text-xs">Resolution</p>
            <p className="text-xs font-semibold text-slate-700 md:text-sm dark:text-slate-300">1080p</p>
          </div>
          <div className="h-6 w-px bg-slate-100 md:h-8 dark:bg-slate-700" />
          <div className="text-center">
            <p className="text-[10px] text-slate-400 md:text-xs">Artifacts</p>
            <p className="text-xs font-semibold text-amber-600 md:text-sm">2</p>
          </div>
          <div className="h-6 w-px bg-slate-100 md:h-8 dark:bg-slate-700" />
          <div className="text-center">
            <p className="text-[10px] text-slate-400 md:text-xs">Type</p>
            <p className="text-xs font-semibold text-red-600 md:text-sm">Face Swap</p>
          </div>
        </div>
      </div>

      {/* Authenticity Score Bar - Touch friendly */}
      <div className="mt-auto flex items-center justify-between rounded-xl bg-gradient-to-br from-red-50 to-orange-50 px-4 py-3 md:px-6 md:py-4 dark:from-red-900/20 dark:to-orange-900/20">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-white shadow-sm md:size-10 dark:bg-slate-800">
            <Scan className="size-4 text-red-500 md:size-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-800 md:text-sm dark:text-white">Authenticity Score</span>
            <p className="text-[10px] text-slate-500 md:text-xs">Face Swap Detected</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden h-2.5 w-24 overflow-hidden rounded-full bg-white md:block md:w-32 dark:bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500"
              style={{ width: "14%" }}
            />
          </div>
          <span className="text-base font-bold text-red-600 md:text-lg">14%</span>
        </div>
      </div>
    </div>
  )
}
