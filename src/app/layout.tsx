import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'Fiesta de cumpleaños',
  description: 'Fiesta de cumpleaños de Alahia del Valle',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: 'linear-gradient(160deg, #e8728c 0%, #c44d7b 45%, #9b6ab0 100%)', minHeight: '100vh' }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
