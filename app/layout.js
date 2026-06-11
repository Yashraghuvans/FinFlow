import "./globals.css";
import NavBar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "FinFlow",
  description: "Construction-phase money tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
        <ToastContainer position="top-right" theme="light" autoClose={2500} />
      </body>
    </html>
  );
}
