"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { events } from "@/lib/data";
import { Competition } from "@/lib/types";
import { initStorage } from "@/lib/storage";
import EventCard from "@/components/EventCard";
import RegistrationModal from "@/components/RegistrationModal";

export default function CompetitionsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initStorage();
    setMounted(true);
  }, []);

  const handleRegister = (eventId: string, competition: Competition) => {
    setSelectedEventId(eventId);
    setSelectedCompetition(competition);
    setModalOpen(true);
  };

  if (!mounted) {
    return (
      <div className="space-y-6">
        {/* Skeleton Hero */}
        <div className="h-48 rounded-2xl bg-dark-700 shimmer" />
        {/* Skeleton Cards */}
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-dark-700 shimmer" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl glass p-8 md:p-12"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-tiger/10 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-neon-cyan/5 to-transparent rounded-tr-full" />

        {/* Gear decorations */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10">
          <svg viewBox="0 0 100 100" className="w-32 h-32 animate-spin-slow" fill="none">
            <path
              d="M50 20a30 30 0 110 60 30 30 0 010-60zm0 10a20 20 0 100 40 20 20 0 000-40z"
              fill="white"
            />
            <rect x="46" y="2" width="8" height="16" rx="2" fill="white" />
            <rect x="46" y="82" width="8" height="16" rx="2" fill="white" />
            <rect x="82" y="46" width="16" height="8" rx="2" fill="white" />
            <rect x="2" y="46" width="16" height="8" rx="2" fill="white" />
            <rect x="74" y="10" width="8" height="16" rx="2" fill="white" transform="rotate(45 78 18)" />
            <rect x="10" y="74" width="8" height="16" rx="2" fill="white" transform="rotate(45 14 82)" />
            <rect x="74" y="74" width="8" height="16" rx="2" fill="white" transform="rotate(-45 78 82)" />
            <rect x="10" y="10" width="8" height="16" rx="2" fill="white" transform="rotate(-45 14 18)" />
          </svg>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tiger/10 border border-tiger/20 mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-tiger animate-pulse" />
            <span className="text-xs text-tiger font-medium">กำลังเปิดรับสมัคร</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
          >
            <span className="bg-gradient-to-r from-tiger via-orange-400 to-neon-cyan bg-clip-text text-transparent bg-300% animate-gradient">
              EVENT
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg max-w-xl"
          >
            รวมรายการแข่งขันหุ่นยนต์ที่น่าตื่นเต้นที่สุดแห่งปี 2026
            พร้อมเปิดรับสมัครทีมจากทั่วประเทศ
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-6 mt-6"
          >
            {[
              { label: "รายการ", value: "6", color: "text-tiger" },
              { label: "กิจกรรม", value: "2", color: "text-neon-cyan" },
              { label: "ค่าสมัคร", value: "400-800", suffix: "บาท", color: "text-neon-purple" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                  {stat.suffix && <span className="text-sm font-normal ml-1">{stat.suffix}</span>}
                </p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Event Cards */}
      <div className="space-y-6">
        {events.map((event, i) => (
          <EventCard
            key={event.id}
            event={event}
            index={i}
            onRegister={handleRegister}
          />
        ))}
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        eventId={selectedEventId}
        competition={selectedCompetition}
      />
    </div>
  );
}
