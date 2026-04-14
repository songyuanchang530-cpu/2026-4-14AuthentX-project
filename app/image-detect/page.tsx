"use client"

import { AppShell } from "@/components/authentix/app-shell"
import { ImageUpload } from "@/components/authentix/image-upload"
import { ImageDetectionViewer } from "@/components/authentix/image-detection-viewer"

export default function ImageDetectPage() {
  return (
    <AppShell activeItem="image" pageTitle="Image Forgery Analysis">
      <div className="grid min-h-[calc(100vh-140px)] grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Upload & Actions */}
        <div className="flex h-full flex-col">
          <ImageUpload />
        </div>

        {/* Right Column - Detection Viewer */}
        <div className="flex h-full flex-col">
          <ImageDetectionViewer />
        </div>
      </div>
    </AppShell>
  )
}
