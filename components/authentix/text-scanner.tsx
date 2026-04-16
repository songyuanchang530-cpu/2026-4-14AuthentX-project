"use client"

import { cn } from "@/lib/utils"

const textContent = [
  { text: "The rapid advancement of", highlight: false },
  { text: "artificial intelligence", highlight: true },
  { text: "has led to significant concerns about", highlight: false },
  { text: "digital authenticity", highlight: true },
  { text: ". Modern", highlight: false },
  { text: "deepfake technology", highlight: true },
  { text: "can generate highly convincing synthetic media that is", highlight: false },
  { text: "virtually indistinguishable", highlight: true },
  { text: "from genuine content. This poses serious risks to", highlight: false },
  { text: "information integrity", highlight: true },
  { text: "and public trust. The", highlight: false },
  { text: "AuthentiX Protocol", highlight: true },
  { text: "utilizes advanced", highlight: false },
  { text: "neural network analysis", highlight: true },
  { text: "to identify subtle patterns and artifacts that indicate", highlight: false },
  { text: "synthetic manipulation", highlight: true },
  { text: ".", highlight: false },
]

export function TextScanner() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-lg shadow-indigo-100/50 md:rounded-3xl md:p-6 md:shadow-xl dark:bg-[#1a1a2e] dark:shadow-none">
      <div className="mb-3 flex items-center justify-between md:mb-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Text Scanner</h3>
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="size-2 rounded-full bg-[#0082FD]" />
          <span className="text-[10px] text-slate-400 md:text-xs">AI Markers</span>
        </div>
      </div>

      {/* Text content area */}
      <div className="flex-1 overflow-auto rounded-xl bg-slate-50 p-3 md:rounded-2xl md:p-5 dark:bg-zinc-900/50">
        <p className="text-xs leading-relaxed text-slate-500 md:text-sm dark:text-zinc-400">
          {textContent.map((segment, index) => (
            <span key={index}>
              {segment.highlight ? (
                <span className="inline-block rounded-md bg-[#0082FD]/10 px-1 py-0.5 text-slate-700 md:rounded-lg md:px-1.5 dark:text-zinc-200">
                  {segment.text}
                </span>
              ) : (
                segment.text
              )}{" "}
            </span>
          ))}
        </p>
      </div>

      {/* Analysis stats - Responsive */}
      <div className="mt-3 grid grid-cols-3 gap-2 md:mt-4 md:gap-3">
        <div className="rounded-xl bg-slate-50 p-2 md:rounded-2xl md:p-3 dark:bg-zinc-900/50">
          <p className="text-[9px] uppercase tracking-wider text-slate-400 md:text-[10px]">
            Segments
          </p>
          <p className="mt-0.5 text-base font-semibold text-slate-800 md:mt-1 md:text-lg dark:text-white">
            {textContent.filter((s) => s.highlight).length}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2 md:rounded-2xl md:p-3 dark:bg-zinc-900/50">
          <p className="text-[9px] uppercase tracking-wider text-slate-400 md:text-[10px]">
            Confidence
          </p>
          <p className="mt-0.5 text-base font-semibold text-[#0082FD] md:mt-1 md:text-lg">87.3%</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2 md:rounded-2xl md:p-3 dark:bg-zinc-900/50">
          <p className="text-[9px] uppercase tracking-wider text-slate-400 md:text-[10px]">
            Model
          </p>
          <p className="mt-0.5 text-base font-semibold text-slate-800 md:mt-1 md:text-lg dark:text-white">GPT-5</p>
        </div>
      </div>

      {/* Primary Action Button - Touch friendly */}
      <button className="mt-3 min-h-[48px] rounded-xl bg-gradient-to-r from-[#0082FD] to-[#A459B5] px-4 py-3 text-xs font-semibold text-white shadow-lg shadow-[#0082FD]/25 transition-transform active:scale-[0.97] md:mt-4 md:min-h-0 md:rounded-2xl md:px-6 md:py-4 md:text-sm md:hover:scale-[0.98]">
        <span className="hidden md:inline">INITIALIZE WORD-LEVEL TEXT SCAN</span>
        <span className="md:hidden">START TEXT SCAN</span>
      </button>
    </div>
  )
}
