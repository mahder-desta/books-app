import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import Providers from './providers';

const notoSans = Noto_Sans({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Home | Books App',
  description: 'Your favorite books are here',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`flex flex-col p-0 pb-4 sm:max-w-4xl sm:px-6 mx-auto ${notoSans.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
