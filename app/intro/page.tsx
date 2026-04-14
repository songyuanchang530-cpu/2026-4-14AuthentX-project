import { AppShell } from "@/components/authentix/app-shell"
import { SubscriptionPlans } from "@/components/authentix/subscription-plans"

export default function IntroPage() {
  return (
    <AppShell activeItem="" pageTitle="Plans & Pricing">
      <SubscriptionPlans />
    </AppShell>
  )
}
