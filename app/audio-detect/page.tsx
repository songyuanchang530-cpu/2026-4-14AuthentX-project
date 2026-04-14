import { AppShell } from "@/components/authentix/app-shell"
import { AudioUpload } from "@/components/authentix/audio-upload"
import { AudioDetectionViewer } from "@/components/authentix/audio-detection-viewer"

export default function AudioDetectPage() {
  return (
    <AppShell activeItem="audio" pageTitle="Audio Forgery Analysis">
      <div className="grid min-h-[calc(100vh-140px)] grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Upload & Actions */}
        <div className="flex h-full flex-col">
          <AudioUpload />
        </div>

        {/* Right Column - Detection Viewer */}
        <div className="flex h-full flex-col">
          <AudioDetectionViewer />
        </div>
      </div>
    </AppShell>
  )
}
