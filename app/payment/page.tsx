"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaymentRecord } from "@/lib/types";
import {
  initStorage,
  initPayments,
  getPayments,
  updatePayment,
} from "@/lib/storage";

export default function PaymentPage() {
  const [mounted, setMounted] = useState(false);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [receiptId, setReceiptId] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    initStorage();
    initPayments();
    setPayments(getPayments());
    setMounted(true);
  }, []);

  const handleMarkPaid = (registrationId: string) => {
    updatePayment(registrationId, {
      status: "paid",
      paidAt: new Date().toISOString(),
    });
    setPayments(getPayments());
  };

  const handleMarkPending = (registrationId: string) => {
    updatePayment(registrationId, {
      status: "pending",
      paidAt: "",
    });
    setPayments(getPayments());
  };

  const handleSlipUpload = (
    registrationId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updatePayment(registrationId, {
        slipBase64: reader.result as string,
      });
      setPayments(getPayments());
    };
    reader.readAsDataURL(file);
  };

  if (!mounted) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="h-16 rounded-2xl bg-dark-700 shimmer" />
        <div className="h-32 rounded-2xl bg-dark-700 shimmer" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-xl bg-dark-700 shimmer" />
        ))}
      </div>
    );
  }

  const totalTeams = payments.length;
  const totalPaid = payments.filter((p) => p.status === "paid").length;
  const totalPending = payments.filter((p) => p.status === "pending").length;
  const totalAmount = payments.reduce((sum, p) => sum + p.fee, 0);
  const paidAmount = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.fee, 0);

  const receiptPayment = receiptId
    ? payments.find((p) => p.registrationId === receiptId)
    : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">
          <span className="bg-gradient-to-r from-tiger to-neon-cyan bg-clip-text text-transparent">
            ชำระเงินและใบเสร็จ
          </span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          จัดการการชำระเงินค่าสมัครแข่งขัน
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          {
            label: "ทีมทั้งหมด",
            value: totalTeams,
            color: "text-white",
            bg: "from-tiger/10 to-transparent",
          },
          {
            label: "ชำระแล้ว",
            value: totalPaid,
            color: "text-green-400",
            bg: "from-green-500/10 to-transparent",
          },
          {
            label: "รอชำระ",
            value: totalPending,
            color: "text-yellow-400",
            bg: "from-yellow-500/10 to-transparent",
          },
          {
            label: "ยอดชำระแล้ว",
            value: `${paidAmount.toLocaleString()}/${totalAmount.toLocaleString()}`,
            suffix: "บาท",
            color: "text-neon-cyan",
            bg: "from-neon-cyan/10 to-transparent",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className={`glass-light rounded-xl p-4 bg-gradient-to-br ${stat.bg}`}
          >
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>
              {stat.value}
              {"suffix" in stat && (
                <span className="text-xs font-normal ml-1 text-gray-500">
                  {stat.suffix}
                </span>
              )}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Payment List */}
      {payments.length === 0 ? (
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
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
          </div>
          <p className="text-gray-500">ยังไม่มีรายการชำระเงิน</p>
          <p className="text-gray-600 text-sm mt-1">
            ลงทะเบียนทีมก่อนเพื่อเห็นรายการชำระเงิน
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">ชื่อทีม</div>
            <div className="col-span-3">รายการแข่งขัน</div>
            <div className="col-span-1">ค่าสมัคร</div>
            <div className="col-span-2">สถานะ</div>
            <div className="col-span-3">การดำเนินการ</div>
          </div>

          {payments.map((payment, i) => (
            <motion.div
              key={payment.registrationId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-light rounded-xl p-4 md:px-6 md:py-4 hover:bg-white/5 transition-colors"
            >
              {/* Mobile Layout */}
              <div className="md:hidden space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">
                    {payment.teamName}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      payment.status === "paid"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {payment.status === "paid" ? "ชำระแล้ว" : "รอชำระ"}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {payment.competitionName}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-tiger">
                    {payment.fee} บาท
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={(el) => {
                        fileRefs.current[payment.registrationId] = el;
                      }}
                      onChange={(e) =>
                        handleSlipUpload(payment.registrationId, e)
                      }
                    />
                    <button
                      onClick={() =>
                        fileRefs.current[payment.registrationId]?.click()
                      }
                      className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                    >
                      {payment.slipBase64 ? "เปลี่ยนสลิป" : "อัพโหลดสลิป"}
                    </button>
                    {payment.status === "pending" ? (
                      <button
                        onClick={() =>
                          handleMarkPaid(payment.registrationId)
                        }
                        className="px-3 py-1.5 rounded-lg text-xs bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                      >
                        ชำระแล้ว
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleMarkPending(payment.registrationId)
                        }
                        className="px-3 py-1.5 rounded-lg text-xs bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors"
                      >
                        ยกเลิก
                      </button>
                    )}
                    {payment.status === "paid" && (
                      <button
                        onClick={() =>
                          setReceiptId(payment.registrationId)
                        }
                        className="px-3 py-1.5 rounded-lg text-xs bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
                      >
                        ใบเสร็จ
                      </button>
                    )}
                  </div>
                </div>
                {payment.slipBase64 && (
                  <div className="mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={payment.slipBase64}
                      alt="สลิปการชำระเงิน"
                      className="w-24 h-24 object-cover rounded-lg border border-white/10"
                    />
                  </div>
                )}
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3">
                  <span className="text-sm font-semibold text-neon-cyan">
                    {payment.teamName}
                  </span>
                  {payment.slipBase64 && (
                    <span className="ml-2 text-xs text-green-400">
                      (มีสลิป)
                    </span>
                  )}
                </div>
                <div className="col-span-3 text-sm text-gray-300">
                  {payment.competitionName}
                </div>
                <div className="col-span-1 text-sm font-bold text-tiger">
                  {payment.fee}
                </div>
                <div className="col-span-2">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      payment.status === "paid"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {payment.status === "paid" ? "ชำระแล้ว" : "รอชำระ"}
                  </span>
                </div>
                <div className="col-span-3 flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={(el) => {
                      fileRefs.current[`d-${payment.registrationId}`] = el;
                    }}
                    onChange={(e) =>
                      handleSlipUpload(payment.registrationId, e)
                    }
                  />
                  <button
                    onClick={() =>
                      fileRefs.current[
                        `d-${payment.registrationId}`
                      ]?.click()
                    }
                    className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    {payment.slipBase64 ? "เปลี่ยนสลิป" : "อัพโหลดสลิป"}
                  </button>
                  {payment.status === "pending" ? (
                    <button
                      onClick={() =>
                        handleMarkPaid(payment.registrationId)
                      }
                      className="px-3 py-1.5 rounded-lg text-xs bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                    >
                      ชำระแล้ว
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleMarkPending(payment.registrationId)
                      }
                      className="px-3 py-1.5 rounded-lg text-xs bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors"
                    >
                      ยกเลิก
                    </button>
                  )}
                  {payment.status === "paid" && (
                    <button
                      onClick={() =>
                        setReceiptId(payment.registrationId)
                      }
                      className="px-3 py-1.5 rounded-lg text-xs bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-colors"
                    >
                      ใบเสร็จ
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Receipt Modal */}
      <AnimatePresence>
        {receiptPayment && (
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
              onClick={() => setReceiptId(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg glass rounded-2xl p-8 print:bg-white print:text-black"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-tiger to-neon-cyan bg-clip-text text-transparent print:text-black">
                  ใบเสร็จรับเงิน
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Robotics Playground 2026
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: "ชื่อทีม", value: receiptPayment.teamName },
                  {
                    label: "รายการแข่งขัน",
                    value: receiptPayment.competitionName,
                  },
                  {
                    label: "จำนวนเงิน",
                    value: `${receiptPayment.fee} บาท`,
                  },
                  {
                    label: "สถานะ",
                    value: "ชำระแล้ว",
                  },
                  {
                    label: "วันที่ชำระ",
                    value: receiptPayment.paidAt
                      ? new Date(receiptPayment.paidAt).toLocaleDateString(
                          "th-TH",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "-",
                  },
                  {
                    label: "เลขที่ใบเสร็จ",
                    value: `RCP-${receiptPayment.registrationId.slice(-6).toUpperCase()}`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between py-2 border-b border-white/5 print:border-gray-200"
                  >
                    <span className="text-sm text-gray-400 print:text-gray-600">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium text-white print:text-black">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 print:hidden">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-xl text-white font-medium
                    bg-gradient-to-r from-tiger to-orange-600
                    shadow-lg shadow-tiger/30"
                >
                  พิมพ์ใบเสร็จ
                </button>
                <button
                  onClick={() => setReceiptId(null)}
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
