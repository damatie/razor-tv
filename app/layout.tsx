import "./globals.css";
import Providers from "./providers";
export const metadata = { title: "CineScope", description: "Movies & reviews" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><Providers><div className="min-h-screen flex flex-col">{children}</div></Providers></body></html>);
}
