import { AppShell } from "@/components/authentix/app-shell"
import { SettingsBento } from "@/components/authentix/settings-bento"

export default function SettingsPage() {
  return (
    <AppShell activeItem="settings" pageTitle="Protocol Settings">
      <div className="flex flex-1 flex-col">
        <SettingsBento />

        {/* Bottom Action */}
        <div className="mt-auto flex justify-center pt-10">
          <button className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 px-10 py-4 text-base font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[0.98] hover:shadow-indigo-500/40">
            Save All Changes
          </button>
        </div>
      </div>
    </AppShell>
  )
}
