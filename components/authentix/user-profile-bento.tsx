"use client"

import { useState } from "react"
import { ChevronDown, Sparkles, BookOpen, Languages } from "lucide-react"
import { cn } from "@/lib/utils"

export function UserProfileBento() {
  const [highContrast, setHighContrast] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[600px]" translate="no">
      {/* Left Column - Digital ID Card */}
      <div className="lg:col-span-4 flex flex-col h-full rounded-3xl bg-white p-8 items-center text-center relative overflow-hidden shadow-xl shadow-indigo-100/50 dark:bg-[#1a1a2e] dark:shadow-none">
        {/* Subtle glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-[#0082FD]/10 to-[#A459B5]/5 rounded-full blur-3xl" />
        
        {/* Avatar */}
        <div className="relative z-10 w-32 h-32 rounded-full ring-4 ring-slate-100 dark:ring-zinc-800 mb-6 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-zinc-700 dark:to-zinc-800">
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-400 dark:text-zinc-500">
            SY
          </div>
        </div>

        {/* Name */}
        <h2 className="relative z-10 text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
          Song Yuanchang
        </h2>

        {/* Role/Bio */}
        <p className="relative z-10 text-slate-500 text-sm mt-2 leading-relaxed max-w-[240px]">
          CS Student & AI Engineering Researcher at Beijing City University
        </p>

        {/* Edit Profile Button - pushed to bottom */}
        <button className="mt-auto w-full relative z-10 group rounded-2xl bg-slate-100 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-slate-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#0082FD] hover:to-[#A459B5] hover:text-white hover:shadow-lg hover:shadow-[#0082FD]/25 dark:bg-zinc-800/60 dark:text-zinc-400">
          Edit Profile
        </button>
      </div>

      {/* Right Column - Bento Grid Details */}
      <div className="lg:col-span-8 flex flex-col h-full gap-6">
        {/* Top Row - Stats & Plan */}
        <div className="flex gap-6 flex-1">
          {/* Box A - Stats */}
          <div className="flex-1 rounded-3xl bg-white p-6 flex flex-col justify-center shadow-xl shadow-indigo-100/50 dark:bg-[#1a1a2e] dark:shadow-none">
            <span className="bg-gradient-to-r from-[#0082FD] to-[#A459B5] bg-clip-text text-4xl font-bold text-transparent">
              342
            </span>
            <span className="text-slate-500 text-sm mt-1">Files Authenticated</span>
          </div>

          {/* Box B - Plan Status */}
          <div className="flex-1 rounded-3xl bg-white p-6 flex flex-col justify-center relative shadow-xl shadow-indigo-100/50 dark:bg-[#1a1a2e] dark:shadow-none">
            <span className="text-slate-500 text-sm">Current Plan</span>
            <span className="text-slate-800 dark:text-white text-xl font-semibold mt-1">AuthentiX Edu Pro</span>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 dark:bg-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse dark:bg-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400 text-xs font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Middle Row - Achievements/Badges */}
        <div className="w-full flex-1 rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100/50 dark:bg-[#1a1a2e] dark:shadow-none">
          <h3 className="text-slate-800 dark:text-white text-sm font-medium mb-4">Active Modules & Badges</h3>
          <div className="flex flex-wrap gap-3">
            {/* Badge 1 - White Ocean Debate Logic */}
            <div className="flex items-center gap-2 rounded-2xl bg-sky-50 px-4 py-3 transition-transform hover:scale-105 dark:bg-sky-500/10">
              <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center dark:bg-sky-500/20">
                <Sparkles className="w-4 h-4 text-sky-500 dark:text-sky-400" />
              </div>
              <span className="text-sky-600 dark:text-sky-300 text-sm font-medium">White Ocean Debate Logic</span>
            </div>

            {/* Badge 2 - TOEFL 105 Linguistic Model */}
            <div className="flex items-center gap-2 rounded-2xl bg-violet-50 px-4 py-3 transition-transform hover:scale-105 dark:bg-violet-500/10">
              <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center dark:bg-violet-500/20">
                <BookOpen className="w-4 h-4 text-violet-500 dark:text-violet-400" />
              </div>
              <span className="text-violet-600 dark:text-violet-300 text-sm font-medium">TOEFL 105 Linguistic Model</span>
            </div>
          </div>
        </div>

        {/* Bottom Row - Quick Preferences */}
        <div className="w-full flex-1 rounded-3xl bg-white p-6 flex items-center justify-between shadow-xl shadow-indigo-100/50 dark:bg-[#1a1a2e] dark:shadow-none">
          {/* Language Selector */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center dark:bg-zinc-800">
              <Languages className="w-5 h-5 text-slate-500 dark:text-zinc-400" />
            </div>
            <div>
              <span className="text-slate-400 text-xs block">App Language</span>
              <div className="relative">
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className="flex items-center gap-2 mt-1 text-slate-800 dark:text-white text-sm font-medium"
                >
                  English
                  <ChevronDown className={cn("w-4 h-4 transition-transform", languageOpen && "rotate-180")} />
                </button>
                {languageOpen && (
                  <div className="absolute top-full left-0 mt-2 rounded-xl bg-white py-2 min-w-[120px] shadow-xl ring-1 ring-slate-100 z-10 dark:bg-zinc-800 dark:ring-zinc-700">
                    <button className="w-full px-4 py-2 text-left text-sm text-slate-800 hover:bg-slate-100 transition-colors dark:text-white dark:hover:bg-zinc-700">English</button>
                    <button className="w-full px-4 py-2 text-left text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white">中文</button>
                    <button className="w-full px-4 py-2 text-left text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white">日本語</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-sm">High-Contrast Mode</span>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={cn(
                "relative w-16 h-9 rounded-full transition-all duration-300",
                highContrast
                  ? "bg-gradient-to-r from-[#0082FD] to-[#A459B5]"
                  : "bg-slate-300 dark:bg-zinc-700"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 w-7 h-7 rounded-full bg-white shadow-lg transition-all duration-300",
                  highContrast ? "left-8" : "left-1"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
