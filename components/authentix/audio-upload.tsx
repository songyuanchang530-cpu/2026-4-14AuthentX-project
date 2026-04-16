"use client"

import { useState, useCallback } from "react"
import { Mic, X, FileAudio, Scan, FolderOpen } from "lucide-react"

interface UploadedFile {
  name: string
  size: number
  type: string
}

export function AudioUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>({
    name: "interview_recording.wav",
    size: 8.2 * 1024 * 1024,
    type: "audio/wav",
  })
  const [isScanning, setIsScanning] = useState(false)
  const [deepVoiceClone, setDeepVoiceClone] = useState(true)
  const [noiseAnomaly, setNoiseAnomaly] = useState(true)

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
    }
  }, [])

  const handleFileSelect = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "audio/*,.wav,.mp3"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setUploadedFile({
          name: file.name,
          size: file.size,
          type: file.type,
        })
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

  return (
    <div className="flex h-full flex-col gap-4 md:gap-6">
      {/* Mobile Upload Buttons */}
      <div className="flex gap-3 md:hidden">
        <button
          onClick={handleFileSelect}
          className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#0082FD]/5 to-[#A459B5]/5 p-4 ring-1 ring-[#0082FD]/20 transition-all active:scale-[0.98]"
        >
          <div className="rounded-xl bg-[#0082FD]/10 p-3">
            <FolderOpen className="size-6 text-[#0082FD]" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Audio</span>
        </button>
        <button
          onClick={handleFileSelect}
          className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#A459B5]/5 to-pink-500/5 p-4 ring-1 ring-[#A459B5]/20 transition-all active:scale-[0.98]"
        >
          <div className="rounded-xl bg-[#A459B5]/10 p-3">
            <Mic className="size-6 text-[#A459B5]" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Record</span>
        </button>
      </div>

      {/* Drag & Drop Zone - Desktop only */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleFileSelect}
        className={`group relative hidden h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 md:flex md:h-64 ${
          isDragging
            ? "border-indigo-400 bg-indigo-50 shadow-[inset_0_0_30px_rgba(99,102,241,0.1)]"
            : "border-indigo-200 bg-indigo-50/30 hover:border-indigo-300 hover:bg-indigo-50/50"
        }`}
      >
        <div
          className={`mb-4 rounded-2xl p-4 transition-all duration-300 ${
            isDragging
              ? "bg-indigo-100 text-indigo-600"
              : "bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-500"
          }`}
        >
          <Mic className="size-12" strokeWidth={1.5} />
        </div>

        <p className="text-center text-slate-700">
          Drag & Drop audio file (.wav, .mp3) here
        </p>
        <p className="mt-1 text-sm text-slate-500">
          or click to browse
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <span>WAV, MP3, OGG</span>
          <span className="text-slate-300">•</span>
          <span>Max 100MB</span>
        </div>
      </div>

      {/* File Indicator */}
      {uploadedFile && (
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 shadow-sm md:px-4 md:py-3 dark:bg-slate-800/50">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="shrink-0 rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900/30">
              <FileAudio className="size-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-800 dark:text-white">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-slate-500">
                {formatFileSize(uploadedFile.size)}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleRemoveFile()
            }}
            className="ml-2 shrink-0 rounded-full p-2 text-slate-400 transition-colors active:bg-slate-200 md:p-1.5 md:hover:bg-slate-200 md:hover:text-slate-600"
          >
            <X className="size-5 md:size-4" />
          </button>
        </div>
      )}

      {/* Settings Panel - Touch friendly */}
      <div className="rounded-xl bg-slate-50 p-3 md:p-4 dark:bg-slate-800/50">
        <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
          Scan Options
        </h4>
        <div className="space-y-2 md:space-y-3">
          <label className="flex min-h-[48px] cursor-pointer items-center justify-between rounded-lg px-1 py-2 active:bg-slate-100 md:min-h-0 md:py-0 md:active:bg-transparent dark:active:bg-slate-700/50">
            <span className="text-sm text-slate-700 dark:text-slate-300">Deep Voice Clone Scan</span>
            <button
              onClick={() => setDeepVoiceClone(!deepVoiceClone)}
              className={`relative h-7 w-12 rounded-full transition-colors md:h-6 md:w-11 ${
                deepVoiceClone ? "bg-indigo-500" : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 size-6 rounded-full bg-white shadow-sm transition-transform md:size-5 ${
                  deepVoiceClone ? "translate-x-5 md:translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </label>
          <label className="flex min-h-[48px] cursor-pointer items-center justify-between rounded-lg px-1 py-2 active:bg-slate-100 md:min-h-0 md:py-0 md:active:bg-transparent dark:active:bg-slate-700/50">
            <span className="text-sm text-slate-700 dark:text-slate-300">Noise Anomaly Check</span>
            <button
              onClick={() => setNoiseAnomaly(!noiseAnomaly)}
              className={`relative h-7 w-12 rounded-full transition-colors md:h-6 md:w-11 ${
                noiseAnomaly ? "bg-indigo-500" : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 size-6 rounded-full bg-white shadow-sm transition-transform md:size-5 ${
                  noiseAnomaly ? "translate-x-5 md:translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Action Button - Touch friendly */}
      <div className="mt-auto">
        <button
          onClick={handleScan}
          disabled={!uploadedFile || isScanning}
          className={`group relative min-h-[52px] w-full overflow-hidden rounded-xl py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] md:py-4 ${
            uploadedFile
              ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200 md:hover:scale-[0.98] md:hover:shadow-xl md:hover:shadow-indigo-300"
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          }`}
        >
        <span className="relative z-10 flex items-center justify-center gap-2">
            {isScanning ? (
              <>
                <Scan className="size-5 animate-pulse" />
                Scanning...
              </>
            ) : (
              <>
                <Scan className="size-5" />
                <span className="hidden md:inline">Initialize Audio Scan</span>
                <span className="md:hidden">Start Scan</span>
              </>
            )}
          </span>
        {uploadedFile && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </button>
      </div>
    </div>
  )
}
