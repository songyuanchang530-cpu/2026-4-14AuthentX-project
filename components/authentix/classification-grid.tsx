"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  ScanFace,
  AudioWaveform,
  Mic,
  Fingerprint,
  Eye,
  Brain,
  Layers,
  ShieldAlert,
} from "lucide-react"

const modules = [
  {
    id: "face-swap",
    icon: ScanFace,
    label: "Face Swap Analysis",
    description: "Deep neural face replacement detection",
  },
  {
    id: "lip-sync",
    icon: AudioWaveform,
    label: "Lip Sync Detection",
    description: "Audio-visual sync anomaly scanner",
  },
  {
    id: "voice-clone",
    icon: Mic,
    label: "Voice Clone Check",
    description: "Synthetic voice pattern recognition",
  },
  {
    id: "artifacts",
    icon: Layers,
    label: "Contextual Artifacts",
    description: "Environmental inconsistency detector",
  },
  {
    id: "biometric",
    icon: Fingerprint,
    label: "Biometric Markers",
    description: "Micro-expression & gaze analysis",
  },
  {
    id: "gaze",
    icon: Eye,
    label: "Gaze Tracking",
    description: "Eye movement pattern verification",
  },
  {
    id: "neural",
    icon: Brain,
    label: "Neural Signature",
    description: "GAN fingerprint extraction",
  },
  {
    id: "threat",
    icon: ShieldAlert,
    label: "Threat Assessment",
    description: "Risk level classification engine",
  },
]

export function ClassificationGrid() {
  const [activeModules, setActiveModules] = useState<string[]>([
    "face-swap",
    "voice-clone",
  ])

  const toggleModule = (id: string) => {
    setActiveModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-4 shadow-xl shadow-indigo-100/50 md:p-6 dark:bg-[#1a1a2e] dark:shadow-none">
      <div className="mb-3 flex items-center justify-between md:mb-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Analysis Modules</h3>
        <span className="rounded-full bg-[#0082FD]/10 px-2 py-0.5 text-xs font-medium text-[#0082FD]">
          {activeModules.length} selected
        </span>
      </div>

      {/* 2 columns on mobile, 2 on tablet/desktop */}
      <div className="grid flex-1 grid-cols-2 gap-2 md:gap-3">
        {modules.map((module) => {
          const isActive = activeModules.includes(module.id)
          return (
            <button
              key={module.id}
              onClick={() => toggleModule(module.id)}
              className={cn(
                "group relative flex flex-col items-start rounded-2xl p-3 text-left transition-all duration-200 active:scale-[0.98] md:p-4",
                isActive
                  ? "bg-gradient-to-br from-[#0082FD]/5 to-[#A459B5]/5 ring-1 ring-[#0082FD]/20"
                  : "bg-slate-50 active:bg-slate-100 md:hover:bg-slate-100 dark:bg-zinc-900/50 dark:active:bg-zinc-900 md:dark:hover:bg-zinc-900"
              )}
            >
              <div className="relative z-10 flex w-full items-start justify-between">
                <module.icon
                  className={cn(
                    "size-5 transition-colors",
                    isActive ? "text-[#0082FD]" : "text-slate-400 dark:text-zinc-500"
                  )}
                />
                <div
                  className={cn(
                    "size-3 rounded-full transition-colors md:size-2",
                    isActive ? "bg-[#0082FD]" : "bg-slate-300 dark:bg-zinc-700"
                  )}
                />
              </div>

              <h4
                className={cn(
                  "relative z-10 mt-2 text-[11px] font-medium leading-tight transition-colors md:mt-3 md:text-xs",
                  isActive ? "text-slate-800 dark:text-white" : "text-slate-600 dark:text-zinc-300"
                )}
              >
                {module.label}
              </h4>
              <p className="relative z-10 mt-1 hidden text-[10px] leading-relaxed text-slate-400 md:block dark:text-zinc-500">
                {module.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
