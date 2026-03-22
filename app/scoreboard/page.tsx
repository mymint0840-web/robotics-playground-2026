"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScoreEntry } from "@/lib/types";
import { competitions } from "@/lib/data";
import { initScores, getScores, addScore, updateScore } from "@/lib/storage";

const medalIcons = ["", "#FFD700", "#C0C0C0", "#CD7F32"];
const medalLabels = ["", "ทอง", "เงิน", "ทองแดง"];

export default function ScoreboardPage() {
  const [mounted, setMounted] = useState(false);
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form state
  const [formCompId, setFormCompId] = useState(competitions[0].id);
  const [formTeam, setFormTeam] = useState("");
  const [formRank, setFormRank] = useState(1);
  const [formScore, setFormScore] = useState(0);
  const [formNotes, setFormNotes] = useState("");

  useEffect(() => {
    initScores();
    setScores(getScores());
    setMounted(true);
  }, []);

  const filtered =
    filter === "all"
      ? scores
      : scores.filter((s) => s.competitionId === filter);

  const sortedScores = [...filtered].sort((a, b) => a.rank - b.rank);

  const handleAdd = () => {
    const comp = competitions.find((c) => c.id === formCompId);
    if (!comp || !formTeam) return;

    const entry: ScoreEntry = {
      id: `score-${Date.now()}`,
      competitionId: formCompId,
      competitionName: comp.name,
      teamName: formTeam,
      rank: formRank,
      score: formScore,
      notes: formNotes,
    };
    addScore(entry);
    setScores(getScores());
    resetForm();
  };

  const handleEdit = () => {
    if (!editId) return;
    const comp = competitions.find((c) => c.id === formCompId);
    if (!comp || !formTeam) return;

    updateScore(editId, {
      competitionId: formCompId,
      competitionName: comp.name,
      teamName: formTeam,
      rank: formRank,
      score: formScore,
      notes: formNotes,
    });
    setScores(getScores());
    resetForm();
  };

  const startEdit = (entry: ScoreEntry) => {
    setEditId(entry.id);
    setFormCompId(entry.competitionId);
    setFormTeam(entry.teamName);
    setFormRank(entry.rank);
    setFormScore(entry.score);
    setFormNotes(entry.notes);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormCompId(competitions[0].id);
    setFormTeam("");
    setFormRank(1);
    setFormScore(0);
    setFormNotes("");
  };

  if (!mounted) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="h-16 rounded-2xl bg-dark-700 shimmer" />
        <div className="h-64 rounded-2xl bg-dark-700 shimmer" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-tiger to-neon-cyan bg-clip-text text-transparent">
              ผลการแข่งขัน
            </span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            คะแนนและอันดับของการแข่งขัน
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-select text-sm"
          >
            <option value="all">ทุกรายการ</option>
            {competitions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (showForm) resetForm();
              else setShowForm(true);
            }}
            className="px-4 py-2 rounded-xl bg-tiger/10 text-tiger text-sm font-medium
              border border-tiger/20 hover:bg-tiger/20 transition-colors whitespace-nowrap"
          >
            {showForm ? "ยกเลิก" : "+ เพิ่มผล"}
          </motion.button>
        </div>
      </motion.div>

      {/* Add/Edit Form */}
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
                {editId ? "แก้ไขผลการแข่งขัน" : "เพิ่มผลการแข่งขัน"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    รายการแข่งขัน
                  </label>
                  <select
                    value={formCompId}
                    onChange={(e) => setFormCompId(e.target.value)}
                    className="form-select"
                  >
                    {competitions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    ชื่อทีม
                  </label>
                  <input
                    type="text"
                    value={formTeam}
                    onChange={(e) => setFormTeam(e.target.value)}
                    placeholder="ชื่อทีม"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    อันดับ
                  </label>
                  <input
                    type="number"
                    value={formRank}
                    onChange={(e) => setFormRank(Number(e.target.value))}
                    min={1}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    คะแนน
                  </label>
                  <input
                    type="number"
                    value={formScore}
                    onChange={(e) => setFormScore(Number(e.target.value))}
                    min={0}
                    className="form-input"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  หมายเหตุ
                </label>
                <input
                  type="text"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="หมายเหตุ (ไม่บังคับ)"
                  className="form-input"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={editId ? handleEdit : handleAdd}
                disabled={!formTeam}
                className="w-full py-3 rounded-xl text-white font-bold
                  bg-gradient-to-r from-tiger to-orange-600
                  shadow-lg shadow-tiger/30
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editId ? "บันทึกการแก้ไข" : "เพิ่มผลการแข่งขัน"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scores Table */}
      {sortedScores.length === 0 ? (
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
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z"
              />
            </svg>
          </div>
          <p className="text-gray-500">ยังไม่มีผลการแข่งขัน</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-1">อันดับ</div>
            <div className="col-span-3">ชื่อทีม</div>
            <div className="col-span-3">รายการแข่งขัน</div>
            <div className="col-span-2">คะแนน</div>
            <div className="col-span-2">หมายเหตุ</div>
            <div className="col-span-1"></div>
          </div>

          {sortedScores.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-light rounded-xl p-4 md:px-6 md:py-4 hover:bg-white/5 transition-colors
                ${entry.rank <= 3 ? "border-l-2" : ""}
              `}
              style={
                entry.rank <= 3
                  ? { borderLeftColor: medalIcons[entry.rank] }
                  : undefined
              }
            >
              {/* Mobile Layout */}
              <div className="md:hidden space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {entry.rank <= 3 ? (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          background: `${medalIcons[entry.rank]}20`,
                          color: medalIcons[entry.rank],
                        }}
                      >
                        {entry.rank}
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center text-sm text-gray-400">
                        {entry.rank}
                      </div>
                    )}
                    <span className="text-sm font-semibold text-white">
                      {entry.teamName}
                    </span>
                  </div>
                  {entry.rank <= 3 && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: `${medalIcons[entry.rank]}15`,
                        color: medalIcons[entry.rank],
                      }}
                    >
                      {medalLabels[entry.rank]}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  {entry.competitionName}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-tiger font-bold">
                    {entry.score} คะแนน
                  </span>
                  <button
                    onClick={() => startEdit(entry)}
                    className="text-gray-500 hover:text-neon-cyan transition-colors"
                  >
                    แก้ไข
                  </button>
                </div>
                {entry.notes && (
                  <p className="text-xs text-gray-500">{entry.notes}</p>
                )}
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                  {entry.rank <= 3 ? (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: `${medalIcons[entry.rank]}20`,
                        color: medalIcons[entry.rank],
                      }}
                    >
                      {entry.rank}
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center text-sm text-gray-400">
                      {entry.rank}
                    </div>
                  )}
                </div>
                <div className="col-span-3">
                  <span className="text-sm font-semibold text-white">
                    {entry.teamName}
                  </span>
                  {entry.rank <= 3 && (
                    <span
                      className="ml-2 text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: `${medalIcons[entry.rank]}15`,
                        color: medalIcons[entry.rank],
                      }}
                    >
                      {medalLabels[entry.rank]}
                    </span>
                  )}
                </div>
                <div className="col-span-3 text-sm text-gray-300">
                  {entry.competitionName}
                </div>
                <div className="col-span-2 text-sm font-bold text-tiger">
                  {entry.score}
                </div>
                <div className="col-span-2 text-xs text-gray-500">
                  {entry.notes || "-"}
                </div>
                <div className="col-span-1">
                  <button
                    onClick={() => startEdit(entry)}
                    className="text-xs text-gray-500 hover:text-neon-cyan transition-colors"
                  >
                    แก้ไข
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
