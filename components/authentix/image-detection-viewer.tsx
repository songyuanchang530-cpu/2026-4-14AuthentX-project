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
    <div className="flex h-full flex-col gap-6">
      {/* Image Preview Card - Fixed height to match Upload zone on left */}
      <div className="relative h-[280px] overflow-hidden rounded-3xl bg-white p-2 shadow-xl shadow-indigo-100/50">
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

      {/* AI Insights & Face Detection Card - Matches Analysis Options on left */}
      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100/50">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">
            AI Insights & Face Detection
          </h4>
          <div className="flex items-center gap-1.5">
            <Cpu className="size-3 text-indigo-400" />
            <span className="text-[10px] text-slate-400">Vision-Pro Engine</span>
          </div>
        </div>

        {/* Face Detection Results */}
        <div className="grid grid-cols-2 gap-4">
          {mockBoundingBoxes.map((box) => (
            <button
              key={box.id}
              onClick={() => setSelectedBox(box.id)}
              className={`rounded-xl p-4 text-left transition-all ${
                selectedBox === box.id
                  ? box.isFake
                    ? "bg-red-50 ring-2 ring-red-200"
                    : "bg-blue-50 ring-2 ring-blue-200"
                  : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`flex size-8 items-center justify-center rounded-lg ${
                    box.isFake ? "bg-red-100" : "bg-blue-100"
                  }`}>
                    <User className={`size-4 ${box.isFake ? "text-red-500" : "text-blue-500"}`} />
                  </div>
                  <span className="font-medium text-slate-800">{box.label}</span>
                </div>
                {box.isFake ? (
                  <AlertTriangle className="size-4 text-red-500" />
                ) : (
                  <CheckCircle className="size-4 text-blue-500" />
                )}
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {box.isFake ? "Manipulated" : "Authentic"}
                </span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full ${
                        box.isFake
                          ? "bg-gradient-to-r from-red-500 to-red-400"
                          : "bg-gradient-to-r from-blue-500 to-blue-400"
                      }`}
                      style={{ width: `${box.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600">{box.confidence}%</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-4 flex items-center justify-around border-t border-slate-100 pt-4">
          <div className="text-center">
            <p className="text-xs text-slate-400">Resolution</p>
            <p className="text-sm font-semibold text-slate-700">1080p HD</p>
          </div>
          <div className="h-8 w-px bg-slate-100" />
          <div className="text-center">
            <p className="text-xs text-slate-400">Artifacts</p>
            <p className="text-sm font-semibold text-amber-600">2 Flagged</p>
          </div>
          <div className="h-8 w-px bg-slate-100" />
          <div className="text-center">
            <p className="text-xs text-slate-400">Detection</p>
            <p className="text-sm font-semibold text-red-600">Face Swap</p>
          </div>
        </div>
      </div>

      {/* Authenticity Score Bar - Aligns with button on left */}
      <div className="mt-auto flex items-center justify-between rounded-xl bg-gradient-to-br from-red-50 to-orange-50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-sm">
            <Scan className="size-5 text-red-500" />
          </div>
          <div>
            <span className="text-sm font-medium text-slate-800">Overall Authenticity Score</span>
            <p className="text-xs text-slate-500">Face Swap Detected</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-2.5 w-32 overflow-hidden rounded-full bg-white">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500"
              style={{ width: "14%" }}
            />
          </div>
          <span className="text-lg font-bold text-red-600">14%</span>
        </div>
      </div>
    </div>
  )
}
