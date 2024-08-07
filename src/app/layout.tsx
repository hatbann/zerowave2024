import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.scss';
import Main from './main';
import Header from '@/components/common/Header';
import SupabaseProvider from '@/components/common/SupabaseProvider';
import Recoil from '@/components/common/Recoil';
import '../styles/globals.scss';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
