"use client"

import type React from "react"
import { useLanguage } from "@/context/LanguageContext"

const AICoachInterface: React.FC = () => {
  const { t } = useLanguage()

  return (
    <div>
      <h1>{t("aiCoach.title")}</h1>
      <p>{t("aiCoach.subtitle")}</p>

      <div>
        <h2>{t("aiCoach.section1Title")}</h2>
        <p>{t("aiCoach.section1Description")}</p>
      </div>

      <div>
        <h2>{t("aiCoach.section2Title")}</h2>
        <p>{t("aiCoach.section2Description")}</p>
      </div>

      <button>{t("aiCoach.buttonText")}</button>

      <p>{t("aiCoach.footerText")}</p>
    </div>
  )
}

export default AICoachInterface
