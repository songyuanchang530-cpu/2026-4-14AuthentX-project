"use client"

import { useState } from "react"
import { User, Fingerprint, Sliders, Code, Bell, Copy, Plus } from "lucide-react"

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export function SettingsBento() {
  const [biometricLogin, setBiometricLogin] = useState(true)
  const [sensitivity, setSensitivity] = useState<"low" | "standard" | "strict">("standard")
  const [emailReports, setEmailReports] = useState(true)
  const [realtimeWarnings, setRealtimeWarnings] = useState(true)
  const [workspaceName, setWorkspaceName] = useState("White Ocean AI")

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {/* Card 1: Workspace & Profile */}
      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100/50 dark:bg-[#1a1a2e] dark:shadow-none">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0082FD] to-[#A459B5]">
            <User className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Account Details</h3>
            <p className="text-xs text-slate-400">Your workspace profile</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-slate-400">
              Environment Name
            </label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="White Ocean AI"
              className="w-full rounded-xl bg-slate-100 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0082FD]/30 dark:bg-zinc-800/60 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800"
            />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-zinc-800/40">
            <span className="text-sm text-slate-500">Current Role</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              Admin
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: Security & Passkeys */}
      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100/50 dark:bg-[#1a1a2e] dark:shadow-none">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/20">
            <Fingerprint className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Easy Login & Security</h3>
            <p className="text-xs text-slate-400">Quick access options</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-800 dark:text-white">Biometric Login</p>
              <p className="text-xs text-slate-400">Face / Touch ID</p>
            </div>
            <button
              onClick={() => setBiometricLogin(!biometricLogin)}
              className={cn(
                "relative h-8 w-14 rounded-full transition-all duration-200",
                biometricLogin
                  ? "bg-gradient-to-r from-[#0082FD] to-[#A459B5]"
                  : "bg-slate-300 dark:bg-zinc-700"
              )}
            >
              <span
                className={cn(
                  "absolute top-1 size-6 rounded-full bg-white shadow-md transition-all duration-200",
                  biometricLogin ? "left-7" : "left-1"
                )}
              />
            </button>
          </div>

          <button className="w-full rounded-xl bg-slate-100 py-3 text-sm text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-800 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white">
            Manage Devices
          </button>
        </div>
      </div>

      {/* Card 3: Detection Sensitivity */}
      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100/50 dark:bg-[#1a1a2e] dark:shadow-none">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0082FD] to-[#A459B5]">
            <Sliders className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">AI Scan Sensitivity</h3>
            <p className="text-xs text-slate-400">Detection threshold level</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {(["low", "standard", "strict"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setSensitivity(level)}
              className={cn(
                "rounded-xl py-4 text-sm font-medium transition-all",
                sensitivity === level
                  ? "bg-gradient-to-r from-[#0082FD] to-[#A459B5] text-white shadow-lg shadow-[#0082FD]/20"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:bg-zinc-800/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              )}
            >
              {level === "low" && "Low"}
              {level === "standard" && "Standard"}
              {level === "strict" && "Strict"}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">
          {sensitivity === "low" && "Minimal false positives, lower detection rate"}
          {sensitivity === "standard" && "Balanced accuracy and coverage"}
          {sensitivity === "strict" && "Maximum detection, higher sensitivity"}
        </p>
      </div>

      {/* Card 4: Developer & API (wider) */}
      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100/50 md:col-span-2 dark:bg-[#1a1a2e] dark:shadow-none">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/20">
            <Code className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Developer Keys</h3>
            <p className="text-xs text-slate-400">API access for integrations</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-zinc-800/60">
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-white">Campus_Assistant_Dev</p>
              <p className="mt-1 font-mono text-xs text-slate-400">
                authx_live_••••••••••••8a9f
              </p>
            </div>
            <button className="flex size-10 items-center justify-center rounded-lg bg-slate-200 text-slate-500 transition-colors hover:bg-slate-300 hover:text-slate-700 dark:bg-zinc-700/50 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white">
              <Copy className="size-4" />
            </button>
          </div>

          <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#0082FD] transition-colors hover:bg-[#0082FD]/10">
            <Plus className="size-4" />
            New Key
          </button>
        </div>
      </div>

      {/* Card 5: Notifications & Alerts */}
      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100/50 dark:bg-[#1a1a2e] dark:shadow-none">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/20">
            <Bell className="size-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Alert Preferences</h3>
            <p className="text-xs text-slate-400">Notification settings</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-800 dark:text-white">Email Reports</span>
            <button
              onClick={() => setEmailReports(!emailReports)}
              className={cn(
                "relative h-8 w-14 rounded-full transition-all duration-200",
                emailReports
                  ? "bg-gradient-to-r from-[#0082FD] to-[#A459B5]"
                  : "bg-slate-300 dark:bg-zinc-700"
              )}
            >
              <span
                className={cn(
                  "absolute top-1 size-6 rounded-full bg-white shadow-md transition-all duration-200",
                  emailReports ? "left-7" : "left-1"
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-800 dark:text-white">Real-time Warnings</span>
            <button
              onClick={() => setRealtimeWarnings(!realtimeWarnings)}
              className={cn(
                "relative h-8 w-14 rounded-full transition-all duration-200",
                realtimeWarnings
                  ? "bg-gradient-to-r from-[#0082FD] to-[#A459B5]"
                  : "bg-slate-300 dark:bg-zinc-700"
              )}
            >
              <span
                className={cn(
                  "absolute top-1 size-6 rounded-full bg-white shadow-md transition-all duration-200",
                  realtimeWarnings ? "left-7" : "left-1"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
