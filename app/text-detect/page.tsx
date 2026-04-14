import { AppShell } from "@/components/authentix/app-shell"
import { TextAnalysisBento } from "@/components/authentix/text-analysis-bento"

export default function TextDetectPage() {
  return (
    <AppShell activeItem="text" pageTitle="Text Analysis">
      <div className="flex flex-1 flex-col">
        <TextAnalysisBento />
      </div>
    </AppShell>
  )
}
