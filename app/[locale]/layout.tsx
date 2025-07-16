import type { Metadata } from "next";

export const dynamicParams = true;

export async function generateStaticParams() {
  return ["en", "pt-BR", "es", "fr"].map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  );
}
