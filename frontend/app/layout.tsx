import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wise Voice',
  description: 'Free PDF-to-audiobook reader with Edge-TTS'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
