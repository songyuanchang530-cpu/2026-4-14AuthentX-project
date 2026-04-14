"use client"

import { Scan, AlertTriangle, ShieldCheck } from "lucide-react"

const stats = [
  {
    label: "Total Scans (30 Days)",
    value: "1,248",
    icon: Scan,
    iconColor: "text-slate-500",
    iconBg: "bg-slate-100",
    valueColor: "text-slate-800",
  },
  {
    label: "AI Interventions Detected",
    value: "342",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    valueColor: "bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent",
  },
  {
    label: "Average Authenticity Score",
    value: "78%",
    icon: ShieldCheck,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50",
    valueColor: "text-cyan-600",
  },
] as const

export function HistoryStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl bg-white p-6 shadow-xl shadow-indigo-100/50"
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${stat.iconBg}`}>
              <stat.icon className={`size-5 ${stat.iconColor}`} />
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-500">
              {stat.label}
            </span>
          </div>
          <p className={`mt-4 text-4xl font-semibold tracking-tight ${stat.valueColor}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}
