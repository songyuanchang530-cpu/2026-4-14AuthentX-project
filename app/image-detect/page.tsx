"use client"

import { AppShell } from "@/components/authentix/app-shell"
import { ImageUpload } from "@/components/authentix/image-upload"
import { ImageDetectionViewer } from "@/components/authentix/image-detection-viewer"

export default function ImageDetectPage() {
  return (
    <AppShell activeItem="image" pageTitle="Image Analysis">
      {/* Responsive grid: single column on mobile, two columns on desktop */}
      <div className="grid min-h-[calc(100vh-180px)] grid-cols-1 gap-4 md:min-h-[calc(100vh-140px)] md:gap-8 lg:grid-cols-2">
        {/* Upload & Actions */}
        <div className="flex flex-col">
          <ImageUpload />
        </div>

        {/* Detection Viewer */}
        <div className="flex flex-col">
          <ImageDetectionViewer />
        </div>
      </div>
    </AppShell>
  )
}
