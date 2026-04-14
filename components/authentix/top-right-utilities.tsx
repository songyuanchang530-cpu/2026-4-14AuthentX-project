"use client"

import { useState } from "react"
import { MoreVertical, Globe, X } from "lucide-react"

export function TopRightUtilities() {
  const [showMenu, setShowMenu] = useState(false)
  const [lang, setLang] = useState<"en" | "zh">("en")

  return (
    <div className="absolute top-6 right-8 z-50 flex items-center gap-3">
      {/* Language Selector */}
      <button
        onClick={() => setLang(lang === "en" ? "zh" : "en")}
        className="flex items-center gap-2 rounded-full bg-zinc-900/60 px-4 py-2 text-xs text-zinc-300 backdrop-blur-md transition-colors hover:bg-zinc-800"
      >
        <Globe className="size-3.5" />
        <span className={lang === "en" ? "text-white" : "text-zinc-500"}>EN</span>
        <span className="text-zinc-600">/</span>
        <span className={lang === "zh" ? "text-white" : "text-zinc-500"}>中文</span>
      </button>

      {/* Quick Links Menu */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex size-9 items-center justify-center rounded-full bg-zinc-900/60 text-zinc-400 backdrop-blur-md transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          {showMenu ? <X className="size-4" /> : <MoreVertical className="size-4" />}
        </button>

        {/* Dropdown */}
        {showMenu && (
          <div className="absolute top-full right-0 mt-2 w-40 overflow-hidden rounded-xl bg-zinc-900/90 p-1 backdrop-blur-md">
            <a
              href="#"
              className="block rounded-lg px-4 py-2.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="block rounded-lg px-4 py-2.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="block rounded-lg px-4 py-2.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              Protocol Docs
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
