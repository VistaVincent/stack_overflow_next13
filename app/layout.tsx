import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from "next/font/google";
import  React  from 'react';
import "./globals.css";
import { ThemeProvider } from '@/context/ThemeProvider';

export const metadata: Metadata = {
  title: 'DevFlow',
  description: 'A community driven platform for asking questions',
  icons:{
    icon: '/assets/images/site-logo.svg',
  }
}

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-inter'
 });

 const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ['300','400','500','600','700'],
  variable: '--font-spaceGrotesk'
 });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
            appearance={{
              elements: {
                formButtonPrimary: 'primary-gradient',
                footerActionLink: 'primary-text-gradient hover:text-primary-500'
              }
            }}>
          <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ClerkProvider>
        </body>
      </html>
    
    
  );
}
