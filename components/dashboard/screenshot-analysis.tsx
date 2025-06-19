"use client"
import { useLanguage } from "@/hooks/use-language"

const ScreenshotAnalysis = () => {
  const { t } = useLanguage()

  return (
    <div>
      <h1>{t("screenshotAnalysis.title")}</h1>
      <p>{t("screenshotAnalysis.description")}</p>
      {/* Add more content here as needed */}
    </div>
  )
}

export default ScreenshotAnalysis
export { ScreenshotAnalysis }
