/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import Main from "./main";
import Header from "@/components/common/Header";
import SupabaseProvider from "@/components/common/SupabaseProvider";
import Recoil from "@/components/common/Recoil";
import "../styles/globals.scss";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Zerowave",
  description: "For our environment",
  openGraph: {
    title: "Zerowave",
    description: "제로웨이브를 통해 일상 속에서 환경보호를 실천해보세요",
    url: "https://zerowave2024.vercel.app/",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Recoil>
          <Header />
          <Main>{children}</Main>
        </Recoil>
      </body>
    </html>
  );
}
