import { AppShell } from "@/components/authentix/app-shell"
import { HomeDashboard } from "@/components/authentix/home-dashboard"

export default function HomePage() {
  return (
    <AppShell activeItem="home" pageTitle="Dashboard">
      <div className="flex flex-1 flex-col">
        <HomeDashboard />
      </div>
    </AppShell>
  )
}
