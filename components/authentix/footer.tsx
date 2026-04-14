export function Footer() {
  return (
    <footer className="mt-auto">
      {/* Gradient line separator */}
      <div className="mx-8 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="flex items-center justify-between px-8 py-6">
        {/* Language selector */}
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
          <span className="text-sm font-medium text-slate-800">EN</span>
          <span className="text-slate-300">/</span>
          <span className="text-sm text-slate-400">CN</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-xs text-slate-500 transition-colors hover:text-slate-700"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-xs text-slate-500 transition-colors hover:text-slate-700"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-xs text-slate-500 transition-colors hover:text-slate-700"
          >
            Protocol
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-400">AuthentiX Protocol &copy; 2026</p>
      </div>
    </footer>
  )
}
