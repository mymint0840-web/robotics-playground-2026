"use client";

import { motion } from "framer-motion";

export default function CertificatesPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-12 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-tiger/20 to-neon-cyan/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-tiger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-tiger to-neon-cyan bg-clip-text text-transparent mb-2">
          ใบประกาศนียบัตร
        </h1>
        <p className="text-gray-500">ดาวน์โหลดใบประกาศนียบัตรของคุณ</p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 text-neon-cyan text-sm">
          <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          เร็วๆ นี้
        </div>
      </motion.div>
    </div>
  );
}
