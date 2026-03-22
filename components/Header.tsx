"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 glass border-b border-white/5">
      <div className="flex items-center justify-between px-6 py-3 lg:pl-[280px]">
        {/* Left spacer for mobile hamburger */}
        <div className="w-8 lg:hidden" />

        {/* Center title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="h-6 w-[2px] bg-gradient-to-b from-tiger to-neon-cyan rounded-full hidden sm:block" />
          <h2 className="text-sm font-medium text-gray-400 hidden sm:block">
            Robotics Playground 2026
          </h2>
        </motion.div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-light"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-400">เปิดรับสมัคร</span>
          </motion.div>

          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-tiger to-neon-purple flex items-center justify-center cursor-pointer"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Gradient line at bottom */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-tiger/30 to-transparent" />
    </header>
  );
}
