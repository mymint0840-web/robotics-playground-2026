import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "Robotics Playground 2026",
  description: "แพลตฟอร์มลงทะเบียนการแข่งขันหุ่นยนต์ 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="font-kanit antialiased bg-dark-900 text-gray-100 min-h-screen">
        <AnimatedBackground />
        <Sidebar />
        <div className="lg:pl-[260px] relative z-10">
          <Header />
          <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
