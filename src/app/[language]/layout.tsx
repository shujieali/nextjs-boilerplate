import type { Metadata } from "next";
import RootProvider from "@/providers/root-provider";
import { dir } from "i18next";
import { languages } from "@/providers/i18n/config";
import ResponsiveAppBar from "@/components/app-bar";
import { getServerTranslation } from "@/services/i18n";
import "./globals.css";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "home");

  return {
    title: t("title"),
  };
}

export function generateStaticParams() {
  return languages.map((language) => ({ language }));
}

export default function RootLayout({
  children,
  params: { language },
}: {
  children: React.ReactNode;
  params: { language: string };
}) {
  return (
    <html lang={language} dir={dir(language)}>
      <body>
        <RootProvider>
          <ResponsiveAppBar />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
