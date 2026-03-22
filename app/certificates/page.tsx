"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScoreEntry } from "@/lib/types";
import { initScores, getScores } from "@/lib/storage";

const medalLabels = ["", "เหรียญทอง", "เหรียญเงิน", "เหรียญทองแดง"];
const medalColors = ["", "#FFD700", "#C0C0C0", "#CD7F32"];

export default function CertificatesPage() {
  const [mounted, setMounted] = useState(false);
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [viewCert, setViewCert] = useState<ScoreEntry | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initScores();
    setScores(getScores());
    setMounted(true);
  }, []);

  const handlePrint = () => {
    window.print();
  };

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

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">
          <span className="bg-gradient-to-r from-tiger to-neon-cyan bg-clip-text text-transparent">
            ใบประกาศนียบัตร
          </span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          ดาวน์โหลดใบประกาศนียบัตรสำหรับทีมที่ได้รับรางวัล
        </p>
      </motion.div>

      {/* Teams with Results */}
      {scores.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-dark-700 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347"
              />
            </svg>
          </div>
          <p className="text-gray-500">ยังไม่มีผลการแข่งขัน</p>
          <p className="text-gray-600 text-sm mt-1">
            เพิ่มผลการแข่งขันที่หน้าผลการแข่งขันก่อน
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {scores
            .sort((a, b) => a.rank - b.rank)
            .map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-light rounded-xl p-4 md:px-6 md:py-4
                  hover:bg-white/5 transition-colors
                  flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {entry.rank <= 3 ? (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: `${medalColors[entry.rank]}20`,
                        color: medalColors[entry.rank],
                      }}
                    >
                      {entry.rank}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-sm text-gray-400">
                      {entry.rank}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {entry.teamName}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {entry.competitionName} &mdash; อันดับที่ {entry.rank}
                      {entry.rank <= 3 && (
                        <span
                          className="ml-2 text-xs"
                          style={{ color: medalColors[entry.rank] }}
                        >
                          ({medalLabels[entry.rank]})
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewCert(entry)}
                  className="px-4 py-2 rounded-xl text-sm font-medium
                    bg-gradient-to-r from-tiger/10 to-neon-cyan/10
                    text-tiger border border-tiger/20
                    hover:bg-tiger/20 transition-colors"
                >
                  ดูใบประกาศนียบัตร
                </motion.button>
              </motion.div>
            ))}
        </div>
      )}

      {/* Certificate Modal */}
      <AnimatePresence>
        {viewCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewCert(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl"
            >
              {/* Certificate */}
              <div
                ref={printRef}
                className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl p-1 print:p-0"
              >
                <div
                  className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden
                  print:bg-white print:text-black print:rounded-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(18,18,26,0.95), rgba(30,30,45,0.95))",
                  }}
                >
                  {/* Decorative border */}
                  <div className="absolute inset-2 border-2 border-tiger/20 rounded-xl pointer-events-none print:border-orange-300" />
                  <div className="absolute inset-4 border border-neon-cyan/10 rounded-xl pointer-events-none print:border-cyan-200" />

                  {/* Corner decorations */}
                  {[
                    "top-6 left-6",
                    "top-6 right-6",
                    "bottom-6 left-6",
                    "bottom-6 right-6",
                  ].map((pos, idx) => (
                    <div
                      key={idx}
                      className={`absolute ${pos} w-6 h-6`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                        <path
                          d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10L12 2Z"
                          fill="#FD6A0230"
                          stroke="#FD6A02"
                          strokeWidth="0.5"
                        />
                      </svg>
                    </div>
                  ))}

                  {/* Logo area */}
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-tiger/10 flex items-center justify-center print:bg-orange-50">
                      <svg
                        viewBox="0 0 48 48"
                        className="w-10 h-10"
                        fill="none"
                      >
                        <rect
                          x="12"
                          y="16"
                          width="24"
                          height="20"
                          rx="4"
                          stroke="#FD6A02"
                          strokeWidth="2"
                          fill="rgba(253,106,2,0.1)"
                        />
                        <circle cx="19" cy="24" r="3" fill="#00F0FF" />
                        <circle cx="29" cy="24" r="3" fill="#00F0FF" />
                        <path
                          d="M19 30h10"
                          stroke="#A855F7"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-[0.3em] print:text-gray-400">
                      Robotics Playground 2026
                    </p>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-tiger via-orange-400 to-neon-cyan bg-clip-text text-transparent print:text-orange-600">
                    ใบประกาศนียบัตร
                  </h1>
                  <p className="text-sm text-gray-400 mb-8 print:text-gray-500">
                    Certificate of Achievement
                  </p>

                  {/* Award text */}
                  <p className="text-sm text-gray-400 mb-2 print:text-gray-600">
                    ขอมอบใบประกาศนียบัตรนี้เพื่อแสดงว่า
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 print:text-black">
                    ทีม {viewCert.teamName}
                  </h2>

                  <p className="text-sm text-gray-400 mb-6 print:text-gray-600">
                    ได้รับ{" "}
                    <span
                      className="font-bold text-lg"
                      style={{
                        color:
                          viewCert.rank <= 3
                            ? medalColors[viewCert.rank]
                            : "#FD6A02",
                      }}
                    >
                      {viewCert.rank <= 3
                        ? medalLabels[viewCert.rank]
                        : `อันดับที่ ${viewCert.rank}`}
                    </span>
                  </p>

                  <div className="glass-light rounded-xl p-4 mb-8 inline-block print:bg-gray-50 print:border print:border-gray-200">
                    <p className="text-sm text-gray-300 print:text-gray-600">
                      การแข่งขัน{" "}
                      <span className="font-semibold text-white print:text-black">
                        {viewCert.competitionName}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      คะแนน: {viewCert.score} คะแนน
                    </p>
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-500 mb-8">
                    ออกให้ ณ วันที่{" "}
                    {new Date().toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  {/* Signature lines */}
                  <div className="flex justify-center gap-16">
                    <div className="text-center">
                      <div className="w-32 h-[1px] bg-gray-600 mb-2 print:bg-gray-400" />
                      <p className="text-xs text-gray-500">ประธานจัดการแข่งขัน</p>
                    </div>
                    <div className="text-center">
                      <div className="w-32 h-[1px] bg-gray-600 mb-2 print:bg-gray-400" />
                      <p className="text-xs text-gray-500">ผู้อำนวยการ</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4 print:hidden">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePrint}
                  className="flex-1 py-3 rounded-xl text-white font-medium
                    bg-gradient-to-r from-tiger to-orange-600
                    shadow-lg shadow-tiger/30"
                >
                  พิมพ์ใบประกาศนียบัตร
                </motion.button>
                <button
                  onClick={() => setViewCert(null)}
                  className="px-6 py-3 rounded-xl text-gray-300
                    bg-white/5 border border-white/10 hover:bg-white/10
                    transition-colors"
                >
                  ปิด
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
