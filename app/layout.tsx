import "@styles/globals.css";

import Navbar from "@components/Navbar";
import { ToasterContext } from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";

export const metadata = {
  title: "Promptify",
  description: "Discover & Share AI Prompts",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ToasterContext />
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
