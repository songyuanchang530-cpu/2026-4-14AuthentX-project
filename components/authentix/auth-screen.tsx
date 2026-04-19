"use client"

import { useState } from "react"
import { Eye, EyeOff, ScanFace, Fingerprint, Lock, Mail, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuthScreenProps {
  onAuthenticated: () => void
}

export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [biometricLoading, setBiometricLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Demo: Accept any non-empty credentials
    if (email && password) {
      onAuthenticated()
    } else {
      setError("Please enter your email and password")
    }
    setIsLoading(false)
  }

  const handleBiometricAuth = async () => {
    setBiometricLoading(true)
    setError("")

    // Simulate Face ID / Touch ID authentication
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Demo: Biometric always succeeds
    onAuthenticated()
    setBiometricLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      {/* Background gradient decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-[#0082FD]/20 to-[#A459B5]/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[#A459B5]/20 to-[#0082FD]/10 blur-3xl" />
      </div>

      {/* Auth Card */}
      <div className="relative z-10 mx-4 w-full max-w-md">
        <div className="rounded-3xl bg-white p-8 shadow-2xl shadow-indigo-100/50 dark:bg-[#1a1a2e] dark:shadow-none">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0082FD] to-[#A459B5] shadow-lg shadow-purple-500/20">
              <span className="text-2xl font-bold text-white">A</span>
            </div>
            <h1 className="bg-gradient-to-r from-[#0082FD] to-[#A459B5] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
              AuthentiX
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Next-Gen Media & Copyright Protection
            </p>
          </div>

          {/* Biometric Login Section */}
          <div className="mb-6">
            <button
              onClick={handleBiometricAuth}
              disabled={biometricLoading}
              className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#0082FD] to-[#A459B5] px-6 py-4 text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-xl hover:shadow-purple-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {biometricLoading ? (
                <Loader2 className="size-6 animate-spin" />
              ) : (
                <>
                  <ScanFace className="size-6" />
                  <span className="font-semibold">Sign in with Face ID</span>
                </>
              )}
            </button>
            <div className="mt-3 flex items-center justify-center gap-4">
              <button
                onClick={handleBiometricAuth}
                disabled={biometricLoading}
                className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                <Fingerprint className="size-4" />
                Touch ID
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200 dark:bg-zinc-700" />
            <span className="text-xs uppercase tracking-widest text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-zinc-700" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                <Mail className="size-5 text-slate-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-xl bg-slate-100 py-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0082FD]/30 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800/80"
              />
            </div>

            {/* Password Input with Eye Toggle */}
            <div className="relative">
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                <Lock className="size-5 text-slate-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl bg-slate-100 py-4 pl-12 pr-12 text-slate-800 placeholder:text-slate-400 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0082FD]/30 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800/80"
              />
              {/* Password Visibility Toggle - Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-4 font-semibold text-white transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <button className="text-slate-500 transition-colors hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200">
              Forgot password?
            </button>
            <button className="text-[#0082FD] transition-colors hover:text-[#0082FD]/80">
              Create account
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-emerald-400" />
            256-bit SSL Encryption
          </span>
          <span className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-emerald-400" />
            GDPR Compliant
          </span>
        </div>
      </div>
    </div>
  )
}
