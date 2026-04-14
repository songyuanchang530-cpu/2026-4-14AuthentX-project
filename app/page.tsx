"use client"

import { AppShell } from "@/components/authentix/app-shell"
import { MediaPlayer } from "@/components/authentix/media-player"
import { ClassificationGrid } from "@/components/authentix/classification-grid"
import { ScanParameters } from "@/components/authentix/scan-parameters"
import { TextScanner } from "@/components/authentix/text-scanner"

export default function Dashboard() {
  return (
    <AppShell activeItem="video" pageTitle="Video Forgery Analysis">
      <div className="grid flex-1 grid-cols-2 items-stretch gap-4">
        {/* Top Left - Media Player & Timeline */}
        <div className="flex min-h-[360px] flex-col">
          <MediaPlayer />
        </div>

        {/* Top Right - Classification Grid */}
        <div className="flex min-h-[360px] flex-col">
          <ClassificationGrid />
        </div>

        {/* Bottom Left - Scan Parameters */}
        <div className="flex min-h-[340px] flex-col">
          <ScanParameters />
        </div>

        {/* Bottom Right - Text Scanner */}
        <div className="flex min-h-[340px] flex-col">
          <TextScanner />
        </div>
      </div>
    </AppShell>
  )
}
