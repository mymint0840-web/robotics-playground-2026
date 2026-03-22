"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NewsItem } from "@/lib/types";
import { initNews, getNews, addNews } from "@/lib/storage";

const categoryColors: Record<string, string> = {
  "ประกาศ": "#FD6A02",
  "กำหนดการ": "#00F0FF",
  "ผลการคัดเลือก": "#22C55E",
  "อบรม": "#A855F7",
  "ทั่วไป": "#F59E0B",
};

export default function NewsPage() {
  const [mounted, setMounted] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("ประกาศ");

  useEffect(() => {
    initNews();
    setNews(getNews());
    setMounted(true);
  }, []);

  const handleAdd = () => {
    if (!newTitle || !newContent) return;
    const item: NewsItem = {
      id: `news-${Date.now()}`,
      title: newTitle,
      content: newContent,
      category: newCategory,
      date: new Date().toISOString().split("T")[0],
    };
    addNews(item);
    setNews(getNews());
    setNewTitle("");
    setNewContent("");
    setNewCategory("ประกาศ");
    setShowForm(false);
  };

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="h-16 rounded-2xl bg-dark-700 shimmer" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-dark-700 shimmer" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-tiger to-neon-cyan bg-clip-text text-transparent">
              ข่าวสาร
            </span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            ติดตามข่าวสารและอัปเดตล่าสุด
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-xl bg-tiger/10 text-tiger text-sm font-medium
            border border-tiger/20 hover:bg-tiger/20 transition-colors"
        >
          {showForm ? "ยกเลิก" : "+ เพิ่มข่าว"}
        </motion.button>
      </motion.div>

      {/* Add News Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-neon-cyan">
                เพิ่มข่าวใหม่
              </h3>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="หัวข้อข่าว"
                className="form-input"
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="เนื้อหาข่าว"
                rows={4}
                className="form-input resize-none"
              />
              <div className="flex items-center gap-4">
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="form-select flex-1"
                >
                  {Object.keys(categoryColors).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdd}
                  disabled={!newTitle || !newContent}
                  className="px-6 py-3 rounded-xl text-white font-bold
                    bg-gradient-to-r from-tiger to-orange-600
                    shadow-lg shadow-tiger/30
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  เผยแพร่
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* News List */}
      <div className="space-y-4">
        {news.length === 0 ? (
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
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5"
                />
              </svg>
            </div>
            <p className="text-gray-500">ยังไม่มีข่าวสาร</p>
          </motion.div>
        ) : (
          news.map((item, i) => {
            const color = categoryColors[item.category] || "#F59E0B";
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-light rounded-xl overflow-hidden cursor-pointer
                  hover:bg-white/5 transition-colors group"
                onClick={() =>
                  setExpandedId(isExpanded ? null : item.id)
                }
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-medium shrink-0"
                          style={{
                            background: `${color}15`,
                            color: color,
                          }}
                        >
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(item.date).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-tiger transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <motion.svg
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="w-5 h-5 text-gray-500 shrink-0 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </motion.svg>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-white/5">
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Color accent */}
                <div
                  className="h-0.5 opacity-30 group-hover:opacity-60 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, ${color}, transparent)`,
                  }}
                />
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
