import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/navbar/Navbar";
import { ToastProvider } from "@/components/providers/toaster-provider";


export const metadata: Metadata = {
  title: "Fast House",
  description: "Đồ Án Công Nghệ Phần Mềm Nâng Cao",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <ClerkProvider>
      <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
        <body>
        <ThemeProvider
        
              attribute="class"
              enableSystem={true}
              defaultTheme="light"
            >
              <ToastProvider/>
            
          {children}
        </ThemeProvider>
        
        </body>
      </html>
    </ClerkProvider>
  );
}