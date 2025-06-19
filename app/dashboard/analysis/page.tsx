import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ScreenshotAnalysis } from "@/components/dashboard/screenshot-analysis";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return {
    title: "Screenshot Analysis",
  };
}

export default async function AnalysisPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <DashboardLayout>
        <ScreenshotAnalysis />
      </DashboardLayout>
    </NextIntlClientProvider>
  );
}
