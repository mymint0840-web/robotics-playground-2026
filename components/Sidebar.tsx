"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const RobotLogo = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
    <rect x="12" y="16" width="24" height="20" rx="4" stroke="#FD6A02" strokeWidth="2" fill="rgba(253,106,2,0.1)" />
    <rect x="18" y="8" width="12" height="8" rx="2" stroke="#00F0FF" strokeWidth="1.5" fill="rgba(0,240,255,0.1)" />
    <circle cx="19" cy="24" r="3" fill="#00F0FF" className="animate-pulse" />
    <circle cx="29" cy="24" r="3" fill="#00F0FF" className="animate-pulse" />
    <path d="M19 30h10" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="22" x2="12" y2="24" stroke="#FD6A02" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="36" y1="24" x2="40" y2="22" stroke="#FD6A02" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="24" cy="8" r="2" fill="#A855F7" className="animate-pulse" />
    <line x1="24" y1="6" x2="24" y2="2" stroke="#A855F7" strokeWidth="1.5" />
    <circle cx="24" cy="2" r="1.5" fill="#FD6A02" className="animate-pulse" />
  </svg>
);

const navItems: NavItem[] = [
  {
    href: "/profile",
    label: "ข้อมูลส่วนตัว",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    href: "/news",
    label: "ข่าวสาร",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
      </svg>
    ),
  },
  {
    href: "/competitions",
    label: "รายการแข่งขัน",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0" />
      </svg>
    ),
  },
  {
    href: "/teams",
    label: "จัดการทีม",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    href: "/payment",
    label: "ชำระเงินและใบเสร็จ",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    href: "/scoreboard",
    label: "ผลการแข่งขัน",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    href: "/certificates",
    label: "ใบประกาศนียบัตร",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    href: "/contact",
    label: "ติดต่อเรา",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl glass hover:bg-white/10 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[260px] z-40 glass
          transition-transform duration-300 ease-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Glowing edge */}
        <div className="absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-neon-cyan/30 to-transparent" />

        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="relative">
            <RobotLogo />
            <div className="absolute inset-0 rounded-full bg-tiger/20 blur-lg animate-pulse-glow" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-tiger to-neon-cyan bg-clip-text text-transparent">
              RoboPlayground
            </h1>
            <p className="text-[10px] text-gray-500 font-light tracking-wider uppercase">
              2026 Competition
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Nav items */}
        <nav className="mt-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/competitions" && pathname === "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-300 group
                  ${
                    isActive
                      ? "text-white bg-gradient-to-r from-tiger/20 to-transparent"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-tiger"
                    style={{
                      boxShadow: "0 0 12px rgba(253, 106, 2, 0.6), 0 0 24px rgba(253, 106, 2, 0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <span
                  className={`transition-colors ${
                    isActive ? "text-tiger" : "text-gray-500 group-hover:text-neon-cyan"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>

                {/* Hover glow */}
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-tiger/5 blur-sm" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="mx-1 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
          <div className="glass-light rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">Powered by</p>
            <p className="text-xs font-semibold bg-gradient-to-r from-tiger to-neon-purple bg-clip-text text-transparent">
              Robotics Playground 2026
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
