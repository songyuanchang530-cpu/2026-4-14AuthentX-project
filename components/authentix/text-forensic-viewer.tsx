"use client"

import { AlertTriangle, Shield, Bot } from "lucide-react"

export function TextForensicViewer() {
  return (
    <div className="relative flex h-full min-h-[500px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl shadow-indigo-100/50">
      {/* Document Content */}
      <div className="flex-1 overflow-y-auto p-8 pb-28">
        <div className="space-y-8 text-base leading-8 text-slate-700">
          {/* Document Title */}
          <div className="mb-8">
            <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Document Analysis — Debate Transcript
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Total words: 247 | Analyzed segments: 12
            </p>
          </div>

          {/* Paragraph 1 */}
          <p>
            Ladies and gentlemen of the committee, the question before us today is not merely one of policy,
            but of principle. We must consider the fundamental implications of artificial intelligence
            regulation on innovation and societal progress.
          </p>

          {/* Paragraph 2 - Contains AI-generated segment */}
          <p className="relative pt-14">
            The proponents of strict regulation argue that{" "}
            <span className="relative inline">
              {/* AI Detection Tooltip */}
              <span className="absolute -top-14 left-0 z-10 flex flex-col items-start">
                <span className="whitespace-nowrap rounded-lg bg-white px-3 py-2 shadow-xl">
                  <span className="flex items-center gap-2">
                    <Bot className="size-3 text-red-500" />
                    <span className="text-xs font-medium text-red-600">AI Generated</span>
                    <span className="text-xs text-slate-300">|</span>
                    <span className="text-xs text-slate-500">Probability: 96%</span>
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-400">Detected Model: GPT-4</span>
                </span>
                <span className="ml-4 size-0 border-x-4 border-t-4 border-transparent border-t-white" />
              </span>
              {/* Highlighted text */}
              <span className="rounded-sm border-b-2 border-red-400 bg-red-50 px-0.5 text-red-700">
                unchecked AI development poses existential risks to humanity, citing concerns about autonomous
                decision-making systems, potential job displacement at unprecedented scales, and the concentration
                of technological power in the hands of a few corporations
              </span>
            </span>
            . However, this perspective fails to account for the transformative benefits already realized.
          </p>

          {/* Paragraph 3 */}
          <p>
            Consider the advancements in medical diagnostics, where machine learning algorithms now detect
            certain cancers with greater accuracy than experienced radiologists. Examine the democratization
            of education through personalized learning systems that adapt to individual student needs.
          </p>

          {/* Paragraph 4 - Contains authentic segment */}
          <p className="relative pt-12">
            My esteemed colleague from the opposition has raised the specter of unemployment, yet historical
            precedent suggests otherwise.{" "}
            <span className="relative inline">
              {/* Authentic Tooltip */}
              <span className="absolute -top-12 left-0 z-10 flex flex-col items-start">
                <span className="whitespace-nowrap rounded-lg bg-white px-3 py-2 shadow-xl">
                  <span className="flex items-center gap-2">
                    <Shield className="size-3 text-blue-500" />
                    <span className="text-xs font-medium text-blue-600">Human Written</span>
                    <span className="text-xs text-slate-300">|</span>
                    <span className="text-xs text-slate-500">Confidence: 94%</span>
                  </span>
                </span>
                <span className="ml-4 size-0 border-x-4 border-t-4 border-transparent border-t-white" />
              </span>
              {/* Highlighted text */}
              <span className="rounded-sm border-b border-blue-400 bg-blue-50 px-0.5 text-blue-700">
                The industrial revolution, the advent of computing, and the rise of the internet—each
                was heralded as the harbinger of mass unemployment
              </span>
            </span>
            . Yet each time, new industries emerged, creating opportunities previously unimaginable.
          </p>

          {/* Paragraph 5 */}
          <p>
            The question we must ask ourselves is not whether to regulate, but how to regulate wisely.
            A balanced approach that encourages innovation while establishing reasonable guardrails
            represents the path forward.
          </p>

          {/* Paragraph 6 */}
          <p>
            In conclusion, I urge this committee to adopt a framework that neither stifles progress
            nor abandons prudence. The future of artificial intelligence should be shaped by thoughtful
            policy, not by fear or unfounded optimism. Let us be architects of a future that harnesses
            this technology for the benefit of all humanity.
          </p>
        </div>
      </div>

      {/* Global Metric Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-slate-100 bg-white/90 p-5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <AlertTriangle className="size-4 text-amber-500" />
          <span className="text-sm">
            <span className="text-slate-500">Status:</span>{" "}
            <span className="font-medium text-amber-600">AI Intervention Detected</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">Human Authorship Score</span>
          <div className="flex items-center gap-3">
            <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-500"
                style={{ width: "22%" }}
              />
            </div>
            <span className="min-w-[3rem] text-right text-sm font-bold text-slate-800">22%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
