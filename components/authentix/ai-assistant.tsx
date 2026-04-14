"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  PanelLeft,
  Edit,
  Sparkles,
  Video,
  Paperclip,
  ArrowUp,
  Zap,
  Search,
  Lightbulb,
} from "lucide-react"

export function AIAssistant() {
  return (
    <div className="absolute inset-0 z-20 flex h-full w-full flex-col overflow-hidden bg-white animate-in fade-in zoom-in-95 duration-200 ease-out dark:bg-slate-950">
        {/* Top Header Area */}
      <div className="flex items-center justify-between px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          aria-label="Toggle history panel"
        >
          <PanelLeft className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          aria-label="New chat"
        >
          <Edit className="size-5" />
        </Button>
      </div>

      {/* Centered Empty State (Welcome Screen) */}
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center space-y-6 text-center">
          {/* File Context Pill */}
          <Badge
            variant="secondary"
            className="gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800/60 dark:text-slate-400"
          >
            <Video className="size-3.5" />
            正在分析: interview_ceo_2024.mp4
          </Badge>

          {/* Main Icon */}
          <div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0082FD] to-[#A459B5] shadow-lg shadow-[#0082FD]/20">
            <Sparkles className="size-10 text-white" />
          </div>

          {/* Greeting */}
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-white sm:text-3xl">
            我能帮您什么？
          </h1>

          {/* Subtitle */}
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            我正在分析 &apos;interview_ceo_2024.mp4&apos;，您可以问我关于此媒体的任何问题。
          </p>

          {/* Quick Actions Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Button
              variant="ghost"
              className="h-9 gap-2 rounded-full border border-[#0082FD]/20 bg-[#0082FD]/5 px-4 text-sm font-medium text-[#0082FD] shadow-sm transition-all hover:border-[#0082FD]/40 hover:bg-[#0082FD]/10 dark:border-[#0082FD]/30 dark:bg-[#0082FD]/10 dark:text-[#0082FD] dark:hover:border-[#0082FD]/50 dark:hover:bg-[#0082FD]/20"
            >
              <Zap className="size-4" />
              快捷扫描
            </Button>
            <Button
              variant="ghost"
              className="h-9 gap-2 rounded-full border border-[#0082FD]/20 bg-[#0082FD]/5 px-4 text-sm font-medium text-[#0082FD] shadow-sm transition-all hover:border-[#0082FD]/40 hover:bg-[#0082FD]/10 dark:border-[#0082FD]/30 dark:bg-[#0082FD]/10 dark:text-[#0082FD] dark:hover:border-[#0082FD]/50 dark:hover:bg-[#0082FD]/20"
            >
              <Search className="size-4" />
              查找风险
            </Button>
            <Button
              variant="ghost"
              className="h-9 gap-2 rounded-full border border-[#0082FD]/20 bg-[#0082FD]/5 px-4 text-sm font-medium text-[#0082FD] shadow-sm transition-all hover:border-[#0082FD]/40 hover:bg-[#0082FD]/10 dark:border-[#0082FD]/30 dark:bg-[#0082FD]/10 dark:text-[#0082FD] dark:hover:border-[#0082FD]/50 dark:hover:bg-[#0082FD]/20"
            >
              <Lightbulb className="size-4" />
              解释结果
            </Button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Input Area */}
      <div className="sticky bottom-0 px-4 pb-6 pt-4">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-2 shadow-lg shadow-slate-200/50 transition-all focus-within:border-[#0082FD]/40 focus-within:ring-2 focus-within:ring-[#0082FD]/20 dark:border-slate-700 dark:bg-slate-800/50 dark:shadow-none dark:focus-within:border-[#0082FD]/60 dark:focus-within:ring-[#0082FD]/30">
            {/* Attachment Button */}
            <Button
              variant="ghost"
              size="icon"
              className="size-9 shrink-0 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              aria-label="Attach file"
            >
              <Paperclip className="size-5" />
            </Button>

            {/* Input Field */}
            <input
              type="text"
              placeholder="输入您的问题... (Enter 发送，Shift+Enter 换行)"
              className="min-w-0 flex-1 bg-transparent px-2 py-1 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
            />

            {/* Send Button */}
            <Button
              size="icon"
              className="size-9 shrink-0 rounded-full bg-[#0082FD] text-white shadow-md shadow-[#0082FD]/20 transition-all hover:bg-[#0082FD]/90 hover:shadow-lg hover:shadow-[#0082FD]/30"
              aria-label="Send message"
            >
              <ArrowUp className="size-5" />
            </Button>
          </div>
          {/* Hint text */}
          <p className="mt-2 text-center text-xs text-muted-foreground">
            AI 助手可能会出错，请核实重要信息。
          </p>
        </div>
      </div>
    </div>
  )
}
