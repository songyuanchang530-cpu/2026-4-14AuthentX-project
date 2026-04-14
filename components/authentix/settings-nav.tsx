"use client"

import { cn } from "@/lib/utils"

const settingsCategories = [
  { id: "general", label: "General" },
  { id: "api", label: "API & Webhooks" },
  { id: "thresholds", label: "Detection Thresholds" },
  { id: "ledger", label: "Decentralized Ledger" },
  { id: "workspace", label: "Workspace" },
]

interface SettingsNavProps {
  activeTab?: string
  onTabChange?: (id: string) => void
}

export function SettingsNav({ activeTab = "api", onTabChange }: SettingsNavProps) {
  return (
    <nav className="flex flex-col gap-1">
      {settingsCategories.map((category) => {
        const isActive = category.id === activeTab
        return (
          <button
            key={category.id}
            onClick={() => onTabChange?.(category.id)}
            className={cn(
              "rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            )}
          >
            {category.label}
          </button>
        )
      })}
    </nav>
  )
}
