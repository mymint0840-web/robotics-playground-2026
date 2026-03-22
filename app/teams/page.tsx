"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Registration } from "@/lib/types";
import { getRegistrations, initStorage } from "@/lib/storage";

export default function TeamsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initStorage();
    setRegistrations(getRegistrations());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="h-16 rounded-2xl bg-dark-700 shimmer" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-xl bg-dark-700 shimmer" />
        ))}
      </div>
    );
  }

  const formatDate = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              จัดการทีม
            </span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            ทีมที่ลงทะเบียนทั้งหมด {registrations.length} ทีม
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-light">
          <svg className="w-4 h-4 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772" />
          </svg>
          <span className="text-sm font-medium">{registrations.length}</span>
        </div>
      </motion.div>

      {/* Table */}
      {registrations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-dark-700 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-400 mb-2">ยังไม่มีทีมลงทะเบียน</h3>
          <p className="text-gray-600 text-sm">ไปที่หน้ารายการแข่งขันเพื่อสมัครทีมแรกของคุณ</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {/* Desktop header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-2">วัน/เวลา</div>
            <div className="col-span-3">รายการแข่งขัน</div>
            <div className="col-span-2">ชื่อทีม</div>
            <div className="col-span-3">โรงเรียน</div>
            <div className="col-span-2">เบอร์ติดต่อ</div>
          </div>

          {registrations.map((reg, i) => (
            <motion.div
              key={reg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-light rounded-xl p-4 md:px-6 md:py-4 hover:bg-white/5 transition-colors
                group cursor-pointer"
            >
              {/* Mobile layout */}
              <div className="md:hidden space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{reg.teamName}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-tiger/10 text-tiger">
                    {reg.competitionName}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{reg.school}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{formatDate(reg.timestamp)}</span>
                  <span>{reg.phone}</span>
                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 text-xs text-gray-400">
                  {formatDate(reg.timestamp)}
                </div>
                <div className="col-span-3">
                  <span className="text-sm font-medium text-white group-hover:text-tiger transition-colors">
                    {reg.competitionName}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-semibold text-neon-cyan">{reg.teamName}</span>
                </div>
                <div className="col-span-3 text-sm text-gray-300">{reg.school}</div>
                <div className="col-span-2 text-sm text-gray-400">{reg.phone}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
