"use client"

import { useState, useCallback } from "react"
import { FileText, X, Scan, Upload } from "lucide-react"

interface UploadedFile {
  name: string
  size: number
  type: string
}

export function TextInputConsole() {
  const [textContent, setTextContent] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [syntaxPattern, setSyntaxPattern] = useState(true)
  const [hallucinationCheck, setHallucinationCheck] = useState(true)

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
      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type,
      })
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
        setUploadedFile({
          name: file.name,
          size: file.size,
          type: file.type,
        })
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

  const handleRemoveFile = useCallback(() => {
    setUploadedFile(null)
  }, [])

  const handleScan = useCallback(() => {
    setIsScanning(true)
    setTimeout(() => setIsScanning(false), 2000)
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const hasContent = textContent.trim().length > 0 || uploadedFile !== null

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Text Input Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex h-72 flex-col rounded-2xl p-2 transition-all duration-300 ${
          isDragging
            ? "bg-indigo-50 ring-1 ring-indigo-300"
            : "bg-slate-50"
        }`}
      >
        <textarea
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Paste raw text, or drop a document (.txt, .pdf) for semantic analysis..."
          className="flex-1 resize-none bg-transparent p-4 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-0"
        />
        
        {/* Drop overlay */}
        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-indigo-50/90 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <Upload className="size-10 text-indigo-500" />
              <span className="text-sm text-indigo-600">Drop document here</span>
            </div>
          </div>
        )}

        {/* Character count */}
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-2">
          <button
            onClick={handleFileSelect}
            className="flex items-center gap-2 text-xs text-slate-500 transition-colors hover:text-slate-700"
          >
            <Upload className="size-3.5" />
            Upload Document
          </button>
          <span className="text-xs text-slate-400">
            {textContent.length} characters
          </span>
        </div>
      </div>

      {/* File Indicator */}
      {uploadedFile && (
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-100 p-2">
              <FileText className="size-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-slate-500">
                {formatFileSize(uploadedFile.size)}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveFile}
            className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Advanced Parameters Panel */}
      <div className="rounded-xl bg-slate-50 p-4">
        <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
          Advanced Parameters
        </h4>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm text-slate-700">LLM Syntax Pattern Recognition</span>
            <button
              onClick={() => setSyntaxPattern(!syntaxPattern)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                syntaxPattern ? "bg-indigo-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
                  syntaxPattern ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-slate-700">RAG/Context Hallucination Check</span>
            <button
              onClick={() => setHallucinationCheck(!hallucinationCheck)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                hallucinationCheck ? "bg-indigo-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
                  hallucinationCheck ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleScan}
        disabled={!hasContent || isScanning}
        className={`group relative w-full overflow-hidden rounded-xl py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
          hasContent
            ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200 hover:scale-[0.98] hover:shadow-xl hover:shadow-indigo-300"
            : "cursor-not-allowed bg-slate-200 text-slate-400"
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isScanning ? (
            <>
              <Scan className="size-5 animate-pulse" />
              Analyzing...
            </>
          ) : (
            <>
              <Scan className="size-5" />
              Initialize Semantic Scan
            </>
          )}
        </span>
        {hasContent && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </button>

      {/* Linguistic Diagnostics Panel */}
      <div className="flex-1 rounded-xl bg-slate-50 p-5">
        <h4 className="mb-5 text-[10px] font-medium uppercase tracking-widest text-slate-500">
          Real-Time Linguistic Metrics
        </h4>
        <div className="space-y-5">
          {/* Perplexity Metric */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">Perplexity (Predictability)</span>
              <span className="text-xs font-medium text-red-500">15%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{ width: "15%" }}
              />
            </div>
            <p className="text-[10px] text-slate-400">Low perplexity indicates highly predictable, AI-like patterns</p>
          </div>

          {/* Burstiness Metric */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">Burstiness (Sentence Variance)</span>
              <span className="text-xs font-medium text-red-500">20%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{ width: "20%" }}
              />
            </div>
            <p className="text-[10px] text-slate-400">Low variance suggests uniform, machine-generated structure</p>
          </div>

          {/* Vocabulary Richness Metric */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">Vocabulary Richness</span>
              <span className="text-xs font-medium text-blue-500">75%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-slate-400"
                style={{ width: "75%" }}
              />
            </div>
            <p className="text-[10px] text-slate-400">Higher diversity indicates more natural language usage</p>
          </div>
        </div>
      </div>
    </div>
  )
}
