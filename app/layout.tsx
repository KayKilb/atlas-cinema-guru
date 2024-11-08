// app/layout.tsx
import { Metadata } from "next";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import { SessionProvider } from "next-auth/react";
import { NavigationProvider } from "./contexts/NavContext";
import "./global.css";
import Home from "./components/Home";
import Favorites from "./components/Favorites";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug?: string[] };
}) {
  // Use a helper to determine active section
  const activeSection = getActiveSection(params);

  return (
    <html lang="en">
      <body className="antialiased bg-lumi-navy text-white min-h-screen">
        <SessionProvider>
          <NavigationProvider>
            <Header />
            <div className="flex pt-[3.5rem]">
              <Sidebar />
              <main className="flex-1">
                {activeSection === "favorites" ? (
                  <Favorites activeSection={activeSection} />
                ) : (
                  <Home activeSection={activeSection} />
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

// Helper function to determine active section
function getActiveSection(params: { slug?: string[] }): string {
  return params.slug && params.slug.length > 0 ? params.slug[0] : "home";
}
