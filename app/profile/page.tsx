"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { UserProfile } from "@/lib/types";
import { getProfile, saveProfile } from "@/lib/storage";

const roles = ["ครู", "นักเรียน", "ผู้ปกครอง", "อาจารย์", "บุคคลทั่วไป"];

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    school: "",
    role: "นักเรียน",
    photo: "",
  });

  useEffect(() => {
    const existing = getProfile();
    if (existing) {
      setProfile(existing);
    } else {
      setEditing(true);
    }
    setMounted(true);
  }, []);

  const handleSave = () => {
    saveProfile(profile);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, photo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  if (!mounted) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="h-48 rounded-2xl bg-dark-700 shimmer" />
        <div className="h-64 rounded-2xl bg-dark-700 shimmer" />
      </div>
    );
  }

  const hasProfile = profile.firstName || profile.lastName;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">
          <span className="bg-gradient-to-r from-tiger to-neon-cyan bg-clip-text text-transparent">
            ข้อมูลส่วนตัว
          </span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">จัดการข้อมูลโปรไฟล์ของคุณ</p>
      </motion.div>

      {/* Profile Photo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-8 flex flex-col items-center"
      >
        <div
          className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-tiger/30 cursor-pointer group"
          onClick={() => editing && fileRef.current?.click()}
        >
          {profile.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.photo}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-tiger/20 to-neon-cyan/20 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
          )}
          {editing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                />
              </svg>
            </div>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
        {hasProfile && !editing && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold text-white">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-sm text-gray-400">{profile.role}</p>
          </div>
        )}
      </motion.div>

      {/* Form / Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-8"
      >
        {editing ? (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ชื่อ <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                  placeholder="ชื่อ"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  นามสกุล <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                  placeholder="นามสกุล"
                  className="form-input"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                อีเมล
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                placeholder="email@example.com"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                เบอร์โทร
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                placeholder="08x-xxx-xxxx"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                โรงเรียน/สถาบัน
              </label>
              <input
                type="text"
                value={profile.school}
                onChange={(e) =>
                  setProfile({ ...profile, school: e.target.value })
                }
                placeholder="ชื่อโรงเรียนหรือสถาบัน"
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ตำแหน่ง
              </label>
              <select
                value={profile.role}
                onChange={(e) =>
                  setProfile({ ...profile, role: e.target.value })
                }
                className="form-select"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={!profile.firstName || !profile.lastName}
              className="w-full py-3 rounded-xl text-white font-bold
                bg-gradient-to-r from-tiger to-orange-600
                shadow-lg shadow-tiger/30 hover:shadow-tiger/50
                transition-shadow duration-300
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              บันทึกข้อมูล
            </motion.button>
          </div>
        ) : (
          <div className="space-y-4">
            {[
              { label: "ชื่อ", value: profile.firstName },
              { label: "นามสกุล", value: profile.lastName },
              { label: "อีเมล", value: profile.email || "-" },
              { label: "เบอร์โทร", value: profile.phone || "-" },
              { label: "โรงเรียน/สถาบัน", value: profile.school || "-" },
              { label: "ตำแหน่ง", value: profile.role },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
              >
                <span className="text-sm text-gray-400">{item.label}</span>
                <span className="text-sm font-medium text-white">
                  {item.value}
                </span>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setEditing(true)}
              className="w-full py-3 rounded-xl text-white font-medium
                bg-white/5 border border-white/10 hover:bg-white/10
                transition-colors duration-300"
            >
              แก้ไขข้อมูล
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Saved toast */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 right-6 px-6 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium z-50"
        >
          บันทึกข้อมูลเรียบร้อยแล้ว
        </motion.div>
      )}
    </div>
  );
}
