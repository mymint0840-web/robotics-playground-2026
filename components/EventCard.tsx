"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Event, Competition } from "@/lib/types";

interface EventCardProps {
  event: Event;
  index: number;
  onRegister: (eventId: string, competition: Competition) => void;
}

const CompetitionIcon = ({ type, color }: { type: string; color: string }) => {
  const icons: Record<string, React.ReactNode> = {
    sumo: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
        <rect x="6" y="10" width="20" height="16" rx="3" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
        <circle cx="12" cy="18" r="2" fill={color} />
        <circle cx="20" cy="18" r="2" fill={color} />
        <path d="M13 22h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 10V8a6 6 0 0112 0v2" stroke={color} strokeWidth="1.5" />
      </svg>
    ),
    controller: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
        <path d="M4 16c0-3 2-6 6-6h12c4 0 6 3 6 6v4c0 3-2 6-6 6H10c-4 0-6-3-6-6v-4z" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
        <circle cx="11" cy="16" r="1.5" fill={color} />
        <line x1="11" y1="13" x2="11" y2="19" stroke={color} strokeWidth="1.2" />
        <line x1="8" y1="16" x2="14" y2="16" stroke={color} strokeWidth="1.2" />
        <circle cx="21" cy="14" r="1.2" fill={color} />
        <circle cx="23" cy="17" r="1.2" fill={color} />
        <circle cx="19" cy="17" r="1.2" fill={color} />
      </svg>
    ),
    rescue: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
        <path d="M16 4l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
        <circle cx="16" cy="24" r="4" stroke={color} strokeWidth="1.5" />
        <path d="M14 24h4M16 22v4" stroke={color} strokeWidth="1.2" />
      </svg>
    ),
    line: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
        <rect x="8" y="12" width="16" height="12" rx="2" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
        <circle cx="12" cy="18" r="1.5" fill={color} />
        <circle cx="20" cy="18" r="1.5" fill={color} />
        <path d="M4 28c4-2 8-6 12-6s8 4 12 6" stroke={color} strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="16" cy="9" r="2" fill={color} className="animate-pulse" />
      </svg>
    ),
    creative: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
        <path d="M16 4l4 8h8l-6 5 2 8-8-5-8 5 2-8-6-5h8l4-8z" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
        <circle cx="16" cy="16" r="3" stroke={color} strokeWidth="1.5" />
        <circle cx="16" cy="16" r="1" fill={color} />
      </svg>
    ),
    drone: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
        <rect x="12" y="14" width="8" height="6" rx="1" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
        <line x1="12" y1="17" x2="6" y2="12" stroke={color} strokeWidth="1.5" />
        <line x1="20" y1="17" x2="26" y2="12" stroke={color} strokeWidth="1.5" />
        <line x1="12" y1="17" x2="6" y2="22" stroke={color} strokeWidth="1.5" />
        <line x1="20" y1="17" x2="26" y2="22" stroke={color} strokeWidth="1.5" />
        <circle cx="6" cy="12" r="3" stroke={color} strokeWidth="1" strokeDasharray="2 1" />
        <circle cx="26" cy="12" r="3" stroke={color} strokeWidth="1" strokeDasharray="2 1" />
        <circle cx="6" cy="22" r="3" stroke={color} strokeWidth="1" strokeDasharray="2 1" />
        <circle cx="26" cy="22" r="3" stroke={color} strokeWidth="1" strokeDasharray="2 1" />
      </svg>
    ),
  };
  return <>{icons[type] || icons.sumo}</>;
};

export default function EventCard({ event, index, onRegister }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const gradients = [
    "from-tiger/30 via-orange-600/20 to-red-600/10",
    "from-neon-cyan/20 via-blue-600/15 to-purple-600/10",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="card-3d"
    >
      <div className="card-3d-inner glass rounded-2xl overflow-hidden group">
        {/* Banner area */}
        <div className={`relative p-8 bg-gradient-to-br ${gradients[index % 2]} overflow-hidden`}>
          {/* Animated decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full" />
          <div
            className="absolute -bottom-4 -right-4 w-24 h-24 border border-white/5 rounded-full animate-spin-slow"
          />
          <div
            className="absolute top-4 right-20 w-16 h-16 border border-white/5 rounded-full"
            style={{ animation: "spin 12s linear infinite reverse" }}
          />

          {/* Robot SVG decoration */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10">
            <svg viewBox="0 0 80 80" className="w-24 h-24" fill="none">
              <rect x="20" y="25" width="40" height="35" rx="8" stroke="white" strokeWidth="2" />
              <rect x="30" y="12" width="20" height="13" rx="4" stroke="white" strokeWidth="1.5" />
              <circle cx="33" cy="40" r="5" fill="white" fillOpacity="0.5" />
              <circle cx="47" cy="40" r="5" fill="white" fillOpacity="0.5" />
              <path d="M33 50h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="14" y1="38" x2="20" y2="42" stroke="white" strokeWidth="2" />
              <line x1="60" y1="42" x2="66" y2="38" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          <div className="relative z-10">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-white mb-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {event.name}
            </motion.h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <svg className="w-4 h-4 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span>รับสมัคร {event.registrationStart} - {event.registrationEnd}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <svg className="w-4 h-4 text-tiger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                </svg>
                <span>วันแข่ง {event.competitionStart} - {event.competitionEnd}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expand button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-8 py-4 flex items-center justify-between text-left
            hover:bg-white/5 transition-colors border-t border-white/5"
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-tiger/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-tiger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <span className="font-medium text-white">
              ดูรายการแข่ง ({event.competitions.length} รายการ)
            </span>
          </div>
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </motion.svg>
        </motion.button>

        {/* Competitions grid */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {event.competitions.map((comp, ci) => (
                  <motion.div
                    key={comp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ci * 0.08 }}
                    className="group/card relative glass-light rounded-xl p-5 overflow-hidden
                      hover:border-white/20 transition-all duration-300"
                    style={{
                      borderColor: `${comp.color}20`,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.boxShadow = `0 0 30px ${comp.color}15, 0 4px 20px rgba(0,0,0,0.3)`;
                      el.style.borderColor = `${comp.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.boxShadow = "none";
                      el.style.borderColor = `${comp.color}20`;
                    }}
                  >
                    {/* Color accent top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover/card:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(90deg, ${comp.color}, transparent)` }}
                    />

                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded-lg" style={{ background: `${comp.color}15` }}>
                        <CompetitionIcon type={comp.icon} color={comp.color} />
                      </div>
                      <span
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{
                          background: `${comp.color}15`,
                          color: comp.color,
                        }}
                      >
                        {comp.fee} บาท
                      </span>
                    </div>

                    <h4 className="font-semibold text-white mb-2 text-sm">{comp.name}</h4>

                    <div className="space-y-1 mb-4">
                      <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                        </svg>
                        อายุ {comp.ageRange}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772" />
                        </svg>
                        {comp.members} คนต่อทีม
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onRegister(event.id, comp)}
                      className="w-full py-2.5 rounded-lg text-sm font-semibold text-white
                        transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, #FD6A02, ${comp.color})`,
                        boxShadow: "0 4px 15px rgba(253, 106, 2, 0.3)",
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.boxShadow = `0 4px 25px rgba(253, 106, 2, 0.5)`;
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.boxShadow = `0 4px 15px rgba(253, 106, 2, 0.3)`;
                      }}
                    >
                      สมัคร
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
