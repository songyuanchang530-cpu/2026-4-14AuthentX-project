"use client"

import { AppShell } from "@/components/authentix/app-shell"
import { MediaPlayer } from "@/components/authentix/media-player"
import { ClassificationGrid } from "@/components/authentix/classification-grid"
import { ScanParameters } from "@/components/authentix/scan-parameters"
import { TextScanner } from "@/components/authentix/text-scanner"

export default function Dashboard() {
  return (
    <AppShell activeItem="video" pageTitle="Video Forgery Analysis">
      {/* Responsive Grid: 1 column on mobile, 2 on tablet/desktop */}
      <div className="grid flex-1 grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
        {/* Media Player & Timeline */}
        <div className="flex min-h-[280px] flex-col lg:min-h-[360px]">
          <MediaPlayer />
        </div>

        {/* Classification Grid */}
        <div className="flex min-h-[280px] flex-col lg:min-h-[360px]">
          <ClassificationGrid />
        </div>

        {/* Scan Parameters */}
        <div className="flex min-h-[280px] flex-col lg:min-h-[340px]">
          <ScanParameters />
        </div>

        {/* Text Scanner */}
        <div className="flex min-h-[280px] flex-col lg:min-h-[340px]">
          <TextScanner />
        </div>
      </div>
    </AppShell>
  )
}
