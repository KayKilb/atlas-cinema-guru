// app/layout.tsx
import { Metadata } from "next";
import Header from "../app/components/Header";
import Sidebar from "../app/components/SideBar";
import { SessionProvider } from "next-auth/react";
import { NavigationProvider } from "./contexts/NavContext";
import "@/app/global.css";
import Home from "@/app/components/Home";
import Favorites from "@/app/components/Favorites";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  return (
    <html lang="en">
      <body className={`antialiased bg-lumi-navy text-white min-h-screen`}>
        <SessionProvider>
          <NavigationProvider>
            <Header />
            <div className="flex pt-[3.5rem]">
              <Sidebar />
              <main className="flex-1">
                {/* Continues to render Home or Favorites */}
                {getActiveSection(params) === "favorites" ? (
                  <Favorites activeSection={getActiveSection(params)} />
                ) : (
                  <Home activeSection={getActiveSection(params)} />
                )}
                {children}
              </main>
            </div>
          </NavigationProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

// Helper function to extract active section from Ref header
function getActiveSection(params: { slug: string[] }): string {
  if (params.slug && params.slug.length > 0) {
    return params.slug[0];
  }
  return "home";
}
