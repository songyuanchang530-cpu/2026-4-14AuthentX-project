"use client"

import { Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "30-Day Free Trial",
    tag: "Get Started",
    price: "$0",
    period: "",
    description: "Perfect for trying out AuthentiX",
    features: [
      "10 scans per day",
      "Basic text detection",
      "Basic image detection",
      "Community support",
    ],
    buttonStyle: "outlined",
    highlighted: false,
  },
  {
    name: "Monthly Subscription",
    tag: "Flexible",
    price: "$19",
    period: "/ month",
    description: "For regular users and small teams",
    features: [
      "Unlimited scans",
      "All modalities (video/audio)",
      "Priority support",
      "Advanced detection models",
      "Export reports",
    ],
    buttonStyle: "solid",
    highlighted: false,
  },
  {
    name: "Annual Subscription",
    tag: "Best Value",
    price: "$15",
    period: "/ month",
    billedAs: "Billed annually at $180",
    description: "Maximum value for power users",
    features: [
      "Everything in Monthly",
      "API access",
      "Deep forensic reports",
      "Custom integrations",
      "Dedicated account manager",
      "Early access to new features",
    ],
    buttonStyle: "gradient",
    highlighted: true,
  },
]

export function SubscriptionPlans() {
  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 md:text-5xl">
          Welcome to AuthentiX
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
          The world&apos;s most advanced, yet easiest to use, AI media detection platform. 
          Protect yourself from deepfakes and AI forgery in seconds.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-3xl bg-white p-8 shadow-xl shadow-indigo-100/60 transition-transform hover:-translate-y-1",
              plan.highlighted && "ring-2 ring-[#A459B5] bg-purple-50/30"
            )}
          >
            {/* Best Value Badge */}
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0082FD] to-[#A459B5] px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                  <Sparkles className="size-3.5" />
                  {plan.tag}
                </span>
              </div>
            )}

            {/* Tag (for non-highlighted) */}
            {!plan.highlighted && (
              <span className="mb-4 inline-block w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {plan.tag}
              </span>
            )}

            {/* Plan Name */}
            <h3 className={cn(
              "text-xl font-semibold text-slate-800",
              plan.highlighted && "mt-4"
            )}>
              {plan.name}
            </h3>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
              {plan.period && (
                <span className="text-slate-500">{plan.period}</span>
              )}
            </div>
            {plan.billedAs && (
              <p className="mt-1 text-sm text-slate-500">{plan.billedAs}</p>
            )}

            {/* Description */}
            <p className="mt-4 text-sm text-slate-500">{plan.description}</p>

            {/* Features */}
            <ul className="mt-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0082FD]/10">
                    <Check className="size-3 text-[#0082FD]" />
                  </div>
                  <span className="text-sm text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              className={cn(
                "mt-8 w-full rounded-xl py-3.5 text-sm font-semibold transition-all",
                plan.buttonStyle === "outlined" &&
                  "border-2 border-[#0082FD] text-[#0082FD] hover:bg-[#0082FD]/5",
                plan.buttonStyle === "solid" &&
                  "bg-[#0082FD] text-white hover:bg-[#0082FD]/90 shadow-lg shadow-[#0082FD]/25",
                plan.buttonStyle === "gradient" &&
                  "bg-gradient-to-r from-[#0082FD] to-[#A459B5] text-white hover:opacity-90 shadow-lg shadow-purple-500/25"
              )}
            >
              {plan.price === "$0" ? "Start Free Trial" : "Subscribe Now"}
            </button>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-16 text-center">
        <p className="text-sm text-slate-400">
          Trusted by researchers, journalists, and organizations worldwide
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-50">
          <div className="h-8 w-24 rounded bg-slate-200" />
          <div className="h-8 w-20 rounded bg-slate-200" />
          <div className="h-8 w-28 rounded bg-slate-200" />
          <div className="h-8 w-24 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  )
}
