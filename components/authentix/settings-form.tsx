"use client"

import { useState } from "react"
import { Copy, Plus } from "lucide-react"

const apiKeys = [
  { name: "Campus_AI_Assistant_Dev", key: "authx_live_••••••••••••••••8a9f" },
  { name: "Video_Target_Detection_Prod", key: "authx_test_••••••••••••••••b2c4" },
]

export function SettingsForm() {
  const [strictMode, setStrictMode] = useState(true)
  const [sensitivity, setSensitivity] = useState(80)
  const [workspaceName, setWorkspaceName] = useState("White Ocean AI Engine")

  return (
    <div className="flex flex-col gap-10">
      {/* Section 1: Developer API Keys */}
      <section>
        <h3 className="text-lg font-semibold text-slate-800">API Authentication</h3>
        <p className="mb-4 mt-1 text-sm text-slate-500">
          Manage keys for integrating AuthentiX core models into your applications.
        </p>

        <div className="flex flex-col gap-3">
          {apiKeys.map((apiKey, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl bg-slate-50 p-5 shadow-sm"
            >
              <div>
                <p className="text-sm text-slate-800">{apiKey.name}</p>
                <p className="mt-1 font-mono text-xs text-slate-500">{apiKey.key}</p>
              </div>
              <button className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700">
                <Copy className="size-3.5" />
                Copy
              </button>
            </div>
          ))}
        </div>

        <button className="mt-4 inline-flex w-max items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-indigo-600 transition-colors hover:bg-indigo-50">
          <Plus className="size-4" />
          Generate New Key
        </button>
      </section>

      {/* Section 2: Global Detection Parameters */}
      <section>
        <h3 className="text-lg font-semibold text-slate-800">System Thresholds</h3>
        <p className="mb-4 mt-1 text-sm text-slate-500">
          Adjust the baseline sensitivity for the multi-modal detection models.
        </p>

        <div className="flex flex-col gap-6">
          {/* Strict Mode Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">Strict Mode (Zero Tolerance)</span>
            <button
              onClick={() => setStrictMode(!strictMode)}
              className={cn(
                "relative h-6 w-11 rounded-full transition-all duration-200",
                strictMode
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                  : "bg-slate-300"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 size-5 rounded-full bg-white shadow-md transition-all duration-200",
                  strictMode ? "left-[22px]" : "left-0.5"
                )}
              />
            </button>
          </div>

          {/* Sensitivity Slider */}
          <div>
            <label className="mb-3 block text-sm text-slate-700">
              RAG Context Hallucination Sensitivity
            </label>
            <div className="relative">
              <div className="h-1.5 rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                  style={{ width: `${sensitivity}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="absolute inset-0 h-1.5 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>0%</span>
              <span className="text-indigo-600 font-medium">{sensitivity}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Environment Setup */}
      <section>
        <h3 className="text-lg font-semibold text-slate-800">Workspace Configuration</h3>
        <p className="mb-4 mt-1 text-sm text-slate-500">
          Configure your workspace environment settings.
        </p>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-slate-500">
            Environment Name
          </label>
          <input
            type="text"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-800 transition-all focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </section>

      {/* Bottom Action */}
      <div className="flex justify-end pt-4">
        <button className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-200 transition-all hover:scale-[0.98] hover:shadow-indigo-300">
          Save Configuration
        </button>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
