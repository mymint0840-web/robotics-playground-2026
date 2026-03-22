"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContactMessage } from "@/lib/types";
import { addContactMessage } from "@/lib/storage";

const faqs = [
  {
    q: "การแข่งขันจัดขึ้นที่ไหน?",
    a: "การแข่งขันจัดขึ้นที่ศูนย์การประชุมแห่งชาติสิริกิติ์ กรุงเทพมหานคร มีพื้นที่จอดรถเพียงพอและใกล้สถานี MRT ศูนย์การประชุมแห่งชาติสิริกิติ์",
  },
  {
    q: "สามารถเปลี่ยนสมาชิกในทีมได้หรือไม่?",
    a: "สามารถเปลี่ยนสมาชิกได้ก่อนวันปิดรับสมัคร โดยแจ้งผ่านอีเมล info@roboticsplayground.th พร้อมแนบเอกสารยืนยันตัวตนของสมาชิกใหม่",
  },
  {
    q: "หุ่นยนต์ต้องมีขนาดเท่าไหร่?",
    a: "แต่ละรายการแข่งขันมีกฎเกณฑ์ขนาดที่แตกต่างกัน กรุณาดูรายละเอียดกฎกติกาของแต่ละรายการในหน้ารายการแข่งขัน หรือดาวน์โหลดคู่มือกฎกติกาฉบับเต็ม",
  },
  {
    q: "ค่าสมัครรวมอะไรบ้าง?",
    a: "ค่าสมัครรวมเสื้อทีม อาหารกลางวันในวันแข่งขัน ใบประกาศนียบัตร และของที่ระลึก ไม่รวมค่าเดินทางและที่พัก",
  },
  {
    q: "ขอคืนเงินค่าสมัครได้หรือไม่?",
    a: "สามารถขอคืนเงินได้ 100% หากแจ้งยกเลิกก่อนวันปิดรับสมัครอย่างน้อย 7 วัน หลังจากนั้นจะคืนเงินได้ 50% หรือไม่สามารถคืนได้หากแจ้งหลังปิดรับสมัคร",
  },
];

const contactInfo = [
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
    label: "ผู้จัดงาน",
    value: "Robotics Playground Thailand",
    color: "#FD6A02",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
    label: "โทรศัพท์",
    value: "02-xxx-xxxx",
    color: "#00F0FF",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
    label: "อีเมล",
    value: "info@roboticsplayground.th",
    color: "#A855F7",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
    ),
    label: "Facebook",
    value: "Robotics Playground Thailand",
    color: "#3B82F6",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
      </svg>
    ),
    label: "Line",
    value: "@roboticsplayground",
    color: "#22C55E",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    const msg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };
    addContactMessage(msg);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">
          <span className="bg-gradient-to-r from-tiger to-neon-cyan bg-clip-text text-transparent">
            ติดต่อเรา
          </span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          ช่องทางการติดต่อและสอบถามข้อมูล
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="glass rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-neon-cyan mb-4">
              ข้อมูลการติดต่อ
            </h2>
            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${info.color}15`, color: info.color }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{info.label}</p>
                    <p className="text-sm font-medium text-white">
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-neon-cyan mb-4">
              ส่งข้อความถึงเรา
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  ชื่อ <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ชื่อ-นามสกุล"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  อีเมล <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  หัวข้อ <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="หัวข้อที่ต้องการสอบถาม"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  ข้อความ <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="รายละเอียดที่ต้องการสอบถาม..."
                  rows={4}
                  required
                  className="form-input resize-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl text-white font-bold
                  bg-gradient-to-r from-tiger to-orange-600
                  shadow-lg shadow-tiger/30 hover:shadow-tiger/50
                  transition-shadow duration-300"
              >
                ส่งข้อความ
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h2 className="text-sm font-semibold text-neon-cyan mb-4">
          คำถามที่พบบ่อย (FAQ)
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass-light rounded-xl overflow-hidden cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() =>
                setExpandedFaq(expandedFaq === i ? null : i)
              }
            >
              <div className="p-4 flex items-center justify-between">
                <span className="text-sm font-medium text-white pr-4">
                  {faq.q}
                </span>
                <motion.svg
                  animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                  className="w-4 h-4 text-gray-500 shrink-0"
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
                {expandedFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Success toast */}
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 px-6 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium z-50"
          >
            ส่งข้อความสำเร็จ
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
