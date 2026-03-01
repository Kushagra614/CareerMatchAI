import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareerAI - AI Voice Career Counselor',
  description: 'Get personalized career guidance through an intelligent voice interview. No forms, just conversation.',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
