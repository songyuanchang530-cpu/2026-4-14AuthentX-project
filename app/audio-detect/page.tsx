import { AppShell } from "@/components/authentix/app-shell"
import { AudioUpload } from "@/components/authentix/audio-upload"
import { AudioDetectionViewer } from "@/components/authentix/audio-detection-viewer"

export default function AudioDetectPage() {
  return (
    <AppShell activeItem="audio" pageTitle="Audio Analysis">
      {/* Responsive grid: single column on mobile, two columns on desktop */}
      <div className="grid min-h-[calc(100vh-180px)] grid-cols-1 gap-4 md:min-h-[calc(100vh-140px)] md:gap-8 lg:grid-cols-2">
        {/* Upload & Actions */}
        <div className="flex flex-col">
          <AudioUpload />
        </div>

        {/* Detection Viewer */}
        <div className="flex flex-col">
          <AudioDetectionViewer />
        </div>
      </div>
    </AppShell>
  )
}
