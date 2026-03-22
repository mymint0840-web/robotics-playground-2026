"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Competition, Registration, TeamMember } from "@/lib/types";
import { schools, prefixes, shirtSizes } from "@/lib/data";
import { addRegistration, generateId } from "@/lib/storage";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  competition: Competition | null;
}

function ConfettiEffect() {
  const [pieces, setPieces] = useState<Array<{
    id: number;
    left: number;
    color: string;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const colors = ["#FD6A02", "#00F0FF", "#A855F7", "#22C55E", "#F59E0B", "#EF4444"];
    const newPieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 0.5,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            "--duration": `${p.duration}s`,
            "--delay": `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

function SuccessAnimation({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 px-8"
    >
      <ConfettiEffect />

      {/* Checkmark circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="relative mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-600/20 flex items-center justify-center">
          <svg
            viewBox="0 0 52 52"
            className="w-16 h-16"
          >
            <circle
              cx="26" cy="26" r="24"
              fill="none"
              stroke="rgba(34, 197, 94, 0.3)"
              strokeWidth="2"
            />
            <motion.path
              d="M14 27l8 8 16-16"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-full bg-green-400/10 blur-xl animate-pulse" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-2xl font-bold text-white mb-2"
      >
        ลงทะเบียนสำเร็จ!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-gray-400 text-center"
      >
        ระบบบันทึกข้อมูลเรียบร้อยแล้ว ขอให้โชคดีในการแข่งขัน!
      </motion.p>
    </motion.div>
  );
}

export default function RegistrationModal({
  isOpen,
  onClose,
  eventId,
  competition,
}: RegistrationModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [teamName, setTeamName] = useState("");
  const [school, setSchool] = useState("");
  const [supervisor, setSupervisor] = useState<TeamMember>({
    prefix: "นาย",
    firstName: "",
    lastName: "",
  });
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [phone, setPhone] = useState("");
  const [shirtSize, setShirtSize] = useState("M 36");

  // Initialize members when competition changes
  useEffect(() => {
    if (competition) {
      setMembers(
        Array.from({ length: competition.members }, () => ({
          prefix: "ด.ช.",
          firstName: "",
          lastName: "",
        }))
      );
    }
  }, [competition]);

  // Reset form on open
  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setTeamName("");
      setSchool("");
      setSupervisor({ prefix: "นาย", firstName: "", lastName: "" });
      setPhone("");
      setShirtSize("M 36");
      if (competition) {
        setMembers(
          Array.from({ length: competition.members }, () => ({
            prefix: "ด.ช.",
            firstName: "",
            lastName: "",
          }))
        );
      }
    }
  }, [isOpen, competition]);

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!competition) return;

    const registration: Registration = {
      id: generateId(),
      eventId,
      competitionId: competition.id,
      competitionName: competition.name,
      teamName,
      school,
      supervisor,
      members,
      phone,
      shirtSize,
      timestamp: new Date().toISOString(),
    };

    addRegistration(registration);
    setStep("success");
  };

  if (!competition) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-2xl gradient-border"
          >
            {step === "success" ? (
              <SuccessAnimation onDone={onClose} />
            ) : (
              <>
                {/* Header */}
                <div className="sticky top-0 z-10 glass rounded-t-2xl border-b border-white/5">
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${competition.color}20` }}
                      >
                        <svg className="w-5 h-5" style={{ color: competition.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">ลงทะเบียน</h3>
                        <p className="text-xs" style={{ color: competition.color }}>
                          {competition.name}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Competition (readonly) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      รายการแข่งขัน
                    </label>
                    <input
                      type="text"
                      value={competition.name}
                      readOnly
                      className="form-input opacity-70 cursor-not-allowed"
                    />
                  </div>

                  {/* Team Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ชื่อทีม <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="SK-01"
                      required
                      className="form-input"
                    />
                  </div>

                  {/* School */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      โรงเรียน <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      list="schools-list"
                      required
                      placeholder="พิมพ์ชื่อโรงเรียน..."
                      className="form-input"
                    />
                    <datalist id="schools-list">
                      {schools.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                  </div>

                  {/* Supervisor */}
                  <div className="p-4 rounded-xl bg-dark-700/50 border border-white/5">
                    <h4 className="text-sm font-semibold text-neon-cyan mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                      </svg>
                      ครูผู้ควบคุมทีม
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <select
                        value={supervisor.prefix}
                        onChange={(e) =>
                          setSupervisor({ ...supervisor, prefix: e.target.value })
                        }
                        className="form-select"
                      >
                        {prefixes.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={supervisor.firstName}
                        onChange={(e) =>
                          setSupervisor({ ...supervisor, firstName: e.target.value })
                        }
                        placeholder="ชื่อ"
                        required
                        className="form-input"
                      />
                      <input
                        type="text"
                        value={supervisor.lastName}
                        onChange={(e) =>
                          setSupervisor({ ...supervisor, lastName: e.target.value })
                        }
                        placeholder="นามสกุล"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Members */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-neon-purple flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772" />
                      </svg>
                      สมาชิกในทีม ({competition.members} คน)
                    </h4>
                    {members.map((member, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-xl bg-dark-700/50 border border-white/5"
                      >
                        <p className="text-xs text-gray-500 mb-2">สมาชิกคนที่ {i + 1}</p>
                        <div className="grid grid-cols-3 gap-3">
                          <select
                            value={member.prefix}
                            onChange={(e) => updateMember(i, "prefix", e.target.value)}
                            className="form-select"
                          >
                            {prefixes.map((p) => (
                              <option key={p} value={p}>
                                {p}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={member.firstName}
                            onChange={(e) =>
                              updateMember(i, "firstName", e.target.value)
                            }
                            placeholder="ชื่อ"
                            required
                            className="form-input"
                          />
                          <input
                            type="text"
                            value={member.lastName}
                            onChange={(e) =>
                              updateMember(i, "lastName", e.target.value)
                            }
                            placeholder="นามสกุล"
                            required
                            className="form-input"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      เบอร์โทรศัพท์ <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="08x-xxx-xxxx"
                      required
                      className="form-input"
                    />
                  </div>

                  {/* Shirt Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ไซส์เสื้อ
                    </label>
                    <select
                      value={shirtSize}
                      onChange={(e) => setShirtSize(e.target.value)}
                      className="form-select"
                    >
                      {shirtSizes.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* QR Payment Section */}
                  <div className="p-4 rounded-xl bg-dark-700/50 border border-white/5">
                    <h4 className="text-sm font-semibold text-tiger mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                      </svg>
                      การชำระเงิน ({competition.fee} บาท)
                    </h4>
                    <div className="flex items-center justify-center p-6 border-2 border-dashed border-white/10 rounded-xl">
                      <div className="text-center">
                        {/* QR Placeholder */}
                        <div className="w-32 h-32 mx-auto mb-3 rounded-xl bg-white/5 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 14.625v4.5c0 .621.504 1.125 1.125 1.125h1.5m3-6.375v6.375m0-6.375h-3m3 0h.375a1.125 1.125 0 011.125 1.125v3.375" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500">QR Code สำหรับชำระเงิน</p>
                        <p className="text-xs text-gray-600 mt-1">จะแสดงหลังยืนยันการสมัคร</p>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl text-white font-bold text-lg
                      bg-gradient-to-r from-tiger to-orange-600
                      shadow-lg shadow-tiger/30
                      hover:shadow-tiger/50 transition-shadow duration-300
                      relative overflow-hidden group"
                  >
                    <span className="relative z-10">ยืนยันการลงทะเบียน</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                      -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
