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
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100/50 dark:bg-[#1a1a2e] dark:shadow-none">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Text Segment Scanner</h3>
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-[#0082FD]" />
          <span className="text-xs text-slate-400">AI-Generated Markers</span>
        </div>
      </div>

      {/* Text content area */}
      <div className="flex-1 overflow-auto rounded-2xl bg-slate-50 p-5 dark:bg-zinc-900/50">
        <p className="text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
          {textContent.map((segment, index) => (
            <span key={index}>
              {segment.highlight ? (
                <span className="inline-block rounded-lg bg-[#0082FD]/10 px-1.5 py-0.5 text-slate-700 dark:text-zinc-200">
                  {segment.text}
                </span>
              ) : (
                segment.text
              )}{" "}
            </span>
          ))}
        </p>
      </div>

      {/* Analysis stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-slate-50 p-3 dark:bg-zinc-900/50">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">
            Segments
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-800 dark:text-white">
            {textContent.filter((s) => s.highlight).length}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3 dark:bg-zinc-900/50">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">
            Confidence
          </p>
          <p className="mt-1 text-lg font-semibold text-[#0082FD]">87.3%</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3 dark:bg-zinc-900/50">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">
            Model
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-800 dark:text-white">GPT-5</p>
        </div>
      </div>

      {/* Primary Action Button */}
      <button className="mt-4 rounded-2xl bg-gradient-to-r from-[#0082FD] to-[#A459B5] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#0082FD]/25 transition-transform hover:scale-[0.98] active:scale-[0.96]">
        INITIALIZE WORD-LEVEL TEXT SCAN
      </button>
    </div>
  )
}
