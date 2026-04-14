import { AppShell } from "@/components/authentix/app-shell"
import { UserProfileBento } from "@/components/authentix/user-profile-bento"

export default function ProfilePage() {
  return (
    <AppShell activeItem="profile" pageTitle="User Profile">
      <div className="flex flex-1 flex-col">
        <UserProfileBento />
      </div>
    </AppShell>
  )
}
