import type { Metadata } from 'next';
import { Inter, Iceland } from 'next/font/google'; // Added Iceland
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import CursorTrail from '@/components/cursor-trail';
import { SoundProvider } from '@/hooks/use-sound';
import Feedback from '@/components/feedback';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Add Iceland font for logo
const iceland = Iceland({ 
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-logo'
});

export const metadata: Metadata = {
  title: 'Khush Pindoria | Photographer & Cybersecurity Innovator',
  description: 'The personal portfolio of Khush Pindoria, showcasing photography, DJ mixes, and tech projects.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={iceland.variable}>
      <body className={cn('font-headline antialiased site-background', inter.variable)}>
        <SoundProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="binary-bg" />
            <CursorTrail />
            <Header />
            <main>{children}</main>
            <Footer />
            <Feedback />
            <Toaster />
          </ThemeProvider>
        </SoundProvider>
      </body>
    </html>
  );
}