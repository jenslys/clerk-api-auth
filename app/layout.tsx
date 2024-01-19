import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const runtime = "edge"; // 'nodejs' (default) | 'edge'

 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}