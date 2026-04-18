import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Ensure you have standard Tailwind directives here

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Afyakul | Shariah-Compliant Community Finance',
  description: 'A decentralized Takaful mutual assistance and asset allocation platform built on Web3.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-300 antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}