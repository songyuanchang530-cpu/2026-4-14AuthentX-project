"use client"

import { useState, useCallback } from "react"
import { CloudUpload, X, FileImage, Scan } from "lucide-react"

interface UploadedFile {
  name: string
  size: number
  type: string
}

export function ImageUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>({
    name: "sample_news_broadcast.png",
    size: 2.4 * 1024 * 1024,
    type: "image/png",
  })
  const [isScanning, setIsScanning] = useState(false)

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
    input.accept = "image/*"
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
    <div className="flex h-full flex-col gap-6">
      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleFileSelect}
        className={`group relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 ${
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
          <CloudUpload className="size-12" strokeWidth={1.5} />
        </div>

        <p className="text-center text-slate-700">
          Drag & Drop image here
        </p>
        <p className="mt-1 text-sm text-slate-500">
          or click to browse
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <span>PNG, JPG, WEBP</span>
          <span className="text-slate-300">•</span>
          <span>Max 50MB</span>
        </div>
      </div>

      {/* File Indicator */}
      {uploadedFile && (
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-100 p-2">
              <FileImage className="size-5 text-indigo-600" />
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
            onClick={(e) => {
              e.stopPropagation()
              handleRemoveFile()
            }}
            className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Analysis Options */}
      <div className="rounded-xl bg-slate-50 p-4">
        <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
          Analysis Options
        </h4>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Deep Face Analysis</span>
            <input
              type="checkbox"
              defaultChecked
              className="size-4 rounded border-slate-300 bg-white text-indigo-600 focus:ring-indigo-500/50"
            />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Artifact Detection</span>
            <input
              type="checkbox"
              defaultChecked
              className="size-4 rounded border-slate-300 bg-white text-indigo-600 focus:ring-indigo-500/50"
            />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Metadata Analysis</span>
            <input
              type="checkbox"
              className="size-4 rounded border-slate-300 bg-white text-indigo-600 focus:ring-indigo-500/50"
            />
          </label>
        </div>
      </div>

      {/* Action Button - mt-auto pushes to bottom */}
      <div className="mt-auto">
        <button
          onClick={handleScan}
          disabled={!uploadedFile || isScanning}
          className={`group relative w-full overflow-hidden rounded-xl py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
          uploadedFile
            ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200 hover:scale-[0.98] hover:shadow-xl hover:shadow-indigo-300"
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
              Initialize Image Scan
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
