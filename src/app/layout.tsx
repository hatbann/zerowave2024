/** @format */

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import Main from "./main";
import Header from "@/components/common/Header";
import SupabaseProvider from "@/components/common/SupabaseProvider";
import Recoil from "@/components/common/Recoil";
import "../styles/globals.scss";
import Script from "next/script";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "zerowave",
  description: "제로웨이브를 통해 일상 속에서 환경보호를 실천해보세요",
  openGraph: {
    title: "Zerowave",
    description: "제로웨이브를 통해 일상 속에서 환경보호를 실천해보세요",
    url: "https://zerowave.vercel.app/",
    siteName: "Zerowave",
    images: [
      {
        url: "/images/png/mainLogo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko-KR",
    type: "website",
  },
  keywords: [
    "zerowave",
    "제로웨이브",
    "환경오염",
    "제로웨이스트",
    "환경",
    "environment",
  ],
  verification: {
    google: "UGkMOJplAyKAPziRSSgLOeaEOMHH3h6lwBQbfv93gnI",
  },
  alternates: {
    canonical: "https://zerowave.vercel.app",
  },
  authors: [
    {
      url: "https://github.com/hatbann",
      name: "Hyebin Cho",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "zerowave",
    description:
      "제로웨이브를 통해 일상 속에서 환경보호를 실천해보세요. 제로웨이스트를 실천할 수 있는 곳을 방문하고 후기를 작성해 제로웨이스트를 널리 공유하는 공간 입니다.",
    keywords: [
      "zerowave",
      "제로웨이브",
      "환경오염",
      "제로웨이스트",
      "환경",
      "environment",
    ],
    url: "https://zerowave.vercel.app/",
    image: "/images/png/mainLogo.png",
    author: {
      "@type": "Hyebin Cho",
      name: "https://github.com/hatbann",
    },
    datePublished: "2024-08-27T11:35:00+07:00",
    dateModified: "2024-08-27T11:35:00+07:00",
    publisher: {
      "@type": "Organization",
      name: "제로웨이브",
      logo: {
        "@type": "ImageObject",
        url: "/images/png/mainLogo.png",
      },
    },
    headline: "제로웨이브",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://zerowave.vercel.app/",
    },
    articleSection: "제로웨이브",
    articleBody: "제로웨이브를 통해 일상 속에서 환경보호를 실천해보세요",
    thumbnailUrl: "/images/png/mainLogo.png",
  };

  return (
    <html lang="en">
      <Head>
        <link rel="canonical" href="https://zerowave.vercel.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdData, null, 2),
          }}
        />
      </Head>
      <body>
        <Recoil>
          <Header />
          <SpeedInsights />
          <Main>{children}</Main>
        </Recoil>
      </body>
    </html>
  );
}
