import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "FinFlow",
  description: "Construction-phase money tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[var(--background)] antialiased">
        <AuthProvider>
          <NavBar />
          <main className="min-h-[calc(100vh-var(--nav-height))] pt-[var(--nav-height)]">
            {children}
          </main>
          <ToastContainer
            position="top-right"
            theme="dark"
            autoClose={2500}
            toastClassName="!rounded-xl !border !border-white/10 !bg-[var(--surface)]"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
