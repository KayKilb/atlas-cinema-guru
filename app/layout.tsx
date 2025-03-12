import "@/app/global.css";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import NavBar from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#00003c] text-white">
        <SessionProvider>
          <div className="layout">
            <header className="header">
              <Header />
            </header>
            <div className="flex">
              <NavBar />
              <main className="main-content w-full">{children}</main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
