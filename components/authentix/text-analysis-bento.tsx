"use client"

import { useState, useCallback } from "react"
import { Upload, Sparkles, FileText, X } from "lucide-react"

interface UploadedFile {
  name: string
  size: number
}

// Circular Progress Component - Responsive sizes
function CircularProgress({ percentage, size = "default" }: { percentage: number; size?: "default" | "large" }) {
  const radius = size === "large" ? 70 : 55
  const strokeWidth = size === "large" ? 12 : 10
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative">
      <svg width={radius * 2} height={radius * 2} className="-rotate-90">
        {/* Background circle */}
        <circle
          stroke="currentColor"
          className="text-slate-200 dark:text-zinc-800"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke="url(#progressGradient)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0082FD" />
            <stop offset="100%" stopColor="#A459B5" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-bold text-[#0082FD] ${size === "large" ? "text-4xl" : "text-3xl"}`}>{percentage}%</span>
      </div>
    </div>
  )
}

export function TextAnalysisBento() {
  const [textContent, setTextContent] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasResult, setHasResult] = useState(true)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      setUploadedFile({ name: file.name, size: file.size })
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setTextContent(event.target?.result as string)
        }
        reader.readAsText(file)
      }
    }
  }, [])

  const handleFileSelect = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".txt,.pdf,.doc,.docx"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setUploadedFile({ name: file.name, size: file.size })
        if (file.type === "text/plain" || file.name.endsWith(".txt")) {
          const reader = new FileReader()
          reader.onload = (event) => {
            setTextContent(event.target?.result as string)
          }
          reader.readAsText(file)
        }
      }
    }
    input.click()
  }, [])

  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setHasResult(true)
    }, 1500)
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const hasContent = textContent.trim().length > 0 || uploadedFile !== null

  // Demo analyzed text
  const analyzedSegments = [
    { text: "Ladies and gentlemen of the committee, the question before us today is not merely one of policy, but of principle. We must consider the fundamental implications of artificial intelligence regulation on innovation and societal progress.", isAI: false },
    { text: "The proponents of strict regulation argue that unchecked AI development poses existential risks to humanity, citing concerns about autonomous decision-making systems, potential job displacement at unprecedented scales, and the concentration of technological power in the hands of a few corporations.", isAI: true },
    { text: "However, this perspective fails to account for the transformative benefits already realized. Consider the advancements in medical diagnostics, where machine learning algorithms now detect certain cancers with greater accuracy than experienced radiologists.", isAI: false },
    { text: "The industrial revolution, the advent of computing, and the rise of the internet—each was heralded as the harbinger of mass unemployment. Yet each time, new industries emerged, creating opportunities previously unimaginable.", isAI: false },
    { text: "In conclusion, I urge this committee to adopt a framework that neither stifles progress nor abandons prudence. The future of artificial intelligence should be shaped by thoughtful policy, not by fear or unfounded optimism.", isAI: true },
  ]

  return (
    <div className="grid flex-1 grid-cols-1 items-stretch gap-4 md:gap-8 lg:grid-cols-12">
      {/* LEFT COLUMN - Input & Action Zone */}
      <div className="flex flex-col gap-4 md:gap-6 lg:col-span-5">
        {/* Input Canvas - Touch friendly text area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex min-h-[200px] flex-col rounded-2xl bg-white p-4 shadow-lg shadow-indigo-100/50 transition-all md:min-h-0 md:flex-1 md:rounded-3xl md:p-6 md:shadow-xl dark:bg-[#1a1a2e] dark:shadow-none ${
            isDragging ? "ring-2 ring-[#0082FD]/50" : ""
          }`}
        >
          <textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Paste your text here, or upload a document..."
            className="scrollbar-hide min-h-[120px] flex-1 resize-none bg-transparent text-base leading-relaxed text-slate-700 placeholder:text-slate-400 focus:outline-none md:min-h-0 md:text-lg dark:text-zinc-200 dark:placeholder:text-zinc-600"
          />

          {/* Drop overlay */}
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-[#0082FD]/10 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <Upload className="size-12 text-[#0082FD]" />
                <span className="text-lg text-[#0082FD]">Drop file here</span>
              </div>
            </div>
          )}

          {/* File indicator */}
          {uploadedFile && (
            <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-100 p-3 dark:bg-zinc-800/50">
              <FileText className="size-5 text-[#0082FD]" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-white">{uploadedFile.name}</p>
                <p className="text-xs text-slate-500">{formatFileSize(uploadedFile.size)}</p>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-zinc-700 dark:hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>
          )}

          {/* Bottom bar */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handleFileSelect}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              <Upload className="size-4" />
              Upload File
            </button>
            <span className="text-sm text-slate-400">
              {textContent.length.toLocaleString()} characters
            </span>
          </div>
        </div>

        {/* Big Action Button - Fixed height, pushed to bottom */}
        <button
          onClick={handleAnalyze}
          disabled={!hasContent || isAnalyzing}
          className={`group relative w-full overflow-hidden rounded-2xl py-5 text-lg font-bold uppercase tracking-wider transition-all duration-200 ${
            hasContent
              ? "bg-gradient-to-r from-[#0082FD] to-[#A459B5] text-white shadow-lg shadow-[#0082FD]/30 hover:scale-[0.98] hover:shadow-[0_0_60px_rgba(0,130,253,0.4)]"
              : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-zinc-800 dark:text-zinc-500"
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {isAnalyzing ? (
              <>
                <Sparkles className="size-6 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="size-6" />
                Analyze Text
              </>
            )}
          </span>
        </button>
      </div>

      {/* RIGHT COLUMN - Results & Reading Zone */}
      <div className="flex flex-col gap-4 md:gap-6 lg:col-span-7">
        {/* Visual Scorecard - Responsive */}
        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-lg shadow-indigo-100/50 md:gap-8 md:rounded-3xl md:p-6 md:shadow-xl dark:bg-[#1a1a2e] dark:shadow-none">
          {/* Circular Progress - Different size on mobile */}
          <div className="shrink-0">
            <div className="md:hidden">
              <CircularProgress percentage={85} size="default" />
            </div>
            <div className="hidden md:block">
              <CircularProgress percentage={85} size="large" />
            </div>
          </div>

          {/* Score Text */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-slate-800 md:text-2xl dark:text-white">Likely Human-Written</h2>
            <p className="mt-1 text-sm text-slate-500 md:text-base">No major AI patterns detected.</p>
          </div>
        </div>

        {/* Reading Viewer - Responsive */}
        <div className="relative flex min-h-[300px] flex-col rounded-2xl bg-white p-4 shadow-lg shadow-indigo-100/50 md:min-h-0 md:flex-1 md:rounded-3xl md:p-8 md:shadow-xl dark:bg-[#1a1a2e] dark:shadow-none">
          {/* Legend - Responsive */}
          <div className="mb-4 flex items-center justify-end gap-3 md:absolute md:right-6 md:top-6 md:mb-0 md:gap-4 md:rounded-full md:bg-slate-100 md:px-4 md:py-2 md:dark:bg-zinc-800/80">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="size-2 rounded-full bg-red-400 md:size-2.5" />
              <span className="text-[10px] text-slate-500 md:text-xs">AI</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="size-2 rounded-full bg-[#0082FD] md:size-2.5" />
              <span className="text-[10px] text-slate-500 md:text-xs">Human</span>
            </div>
          </div>

          {/* Analyzed text - scrollable */}
          <div className="scrollbar-hide flex-1 space-y-3 overflow-y-auto pr-2 text-sm leading-relaxed text-slate-600 md:mt-10 md:space-y-5 md:text-lg md:leading-loose dark:text-zinc-300">
            {hasResult ? (
              analyzedSegments.map((segment, index) => (
                <p
                  key={index}
                  className={`rounded-xl px-3 py-2.5 md:rounded-2xl md:px-4 md:py-3 ${
                    segment.isAI
                      ? "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-100"
                      : "bg-[#0082FD]/5 text-slate-700 dark:bg-cyan-500/8 dark:text-zinc-200"
                  }`}
                >
                  {segment.text}
                </p>
              ))
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                <p>Your analyzed text will appear here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
