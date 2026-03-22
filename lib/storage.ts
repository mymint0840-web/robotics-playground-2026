import {
  Registration,
  UserProfile,
  NewsItem,
  PaymentRecord,
  ScoreEntry,
  ContactMessage,
} from "./types";
import { sampleRegistrations, sampleNews, sampleScores } from "./data";

const STORAGE_KEY = "robotics-playground-registrations";
const INITIALIZED_KEY = "robotics-playground-initialized";
const PROFILE_KEY = "robotics-playground-profile";
const NEWS_KEY = "robotics-playground-news";
const NEWS_INIT_KEY = "robotics-playground-news-initialized";
const PAYMENTS_KEY = "robotics-playground-payments";
const PAYMENTS_INIT_KEY = "robotics-playground-payments-initialized";
const SCORES_KEY = "robotics-playground-scores";
const SCORES_INIT_KEY = "robotics-playground-scores-initialized";
const CONTACTS_KEY = "robotics-playground-contacts";

// ─── Registration ───────────────────────────────────────
export function initStorage(): void {
  if (typeof window === "undefined") return;
  const initialized = localStorage.getItem(INITIALIZED_KEY);
  if (!initialized) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleRegistrations));
    localStorage.setItem(INITIALIZED_KEY, "true");
  }
}

export function getRegistrations(): Registration[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addRegistration(reg: Registration): void {
  const regs = getRegistrations();
  regs.push(reg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(regs));
}

export function generateId(): string {
  return `reg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ─── Profile ────────────────────────────────────────────
export function getProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(PROFILE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

// ─── News ───────────────────────────────────────────────
export function initNews(): void {
  if (typeof window === "undefined") return;
  const initialized = localStorage.getItem(NEWS_INIT_KEY);
  if (!initialized) {
    localStorage.setItem(NEWS_KEY, JSON.stringify(sampleNews));
    localStorage.setItem(NEWS_INIT_KEY, "true");
  }
}

export function getNews(): NewsItem[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(NEWS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addNews(item: NewsItem): void {
  const items = getNews();
  items.unshift(item);
  localStorage.setItem(NEWS_KEY, JSON.stringify(items));
}

// ─── Payments ───────────────────────────────────────────
export function initPayments(): void {
  if (typeof window === "undefined") return;
  const initialized = localStorage.getItem(PAYMENTS_INIT_KEY);
  if (!initialized) {
    const regs = getRegistrations();
    const payments: PaymentRecord[] = regs.map((reg) => ({
      registrationId: reg.id,
      teamName: reg.teamName,
      competitionName: reg.competitionName,
      fee: getCompetitionFee(reg.competitionId),
      status: "pending" as const,
      slipBase64: "",
      paidAt: "",
    }));
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
    localStorage.setItem(PAYMENTS_INIT_KEY, "true");
  }
}

function getCompetitionFee(competitionId: string): number {
  const fees: Record<string, number> = {
    "sumo-auto": 500,
    "sumo-rc": 500,
    rescue: 700,
    "line-follower": 400,
    creative: 600,
    drone: 800,
  };
  return fees[competitionId] || 500;
}

export function getPayments(): PaymentRecord[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(PAYMENTS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function updatePayment(registrationId: string, updates: Partial<PaymentRecord>): void {
  const payments = getPayments();
  const idx = payments.findIndex((p) => p.registrationId === registrationId);
  if (idx !== -1) {
    payments[idx] = { ...payments[idx], ...updates };
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
  }
}

export function addPaymentForRegistration(reg: Registration): void {
  const payments = getPayments();
  const exists = payments.find((p) => p.registrationId === reg.id);
  if (!exists) {
    payments.push({
      registrationId: reg.id,
      teamName: reg.teamName,
      competitionName: reg.competitionName,
      fee: getCompetitionFee(reg.competitionId),
      status: "pending",
      slipBase64: "",
      paidAt: "",
    });
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
  }
}

// ─── Scores ─────────────────────────────────────────────
export function initScores(): void {
  if (typeof window === "undefined") return;
  const initialized = localStorage.getItem(SCORES_INIT_KEY);
  if (!initialized) {
    localStorage.setItem(SCORES_KEY, JSON.stringify(sampleScores));
    localStorage.setItem(SCORES_INIT_KEY, "true");
  }
}

export function getScores(): ScoreEntry[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(SCORES_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addScore(entry: ScoreEntry): void {
  const entries = getScores();
  entries.push(entry);
  localStorage.setItem(SCORES_KEY, JSON.stringify(entries));
}

export function updateScore(id: string, updates: Partial<ScoreEntry>): void {
  const entries = getScores();
  const idx = entries.findIndex((e) => e.id === id);
  if (idx !== -1) {
    entries[idx] = { ...entries[idx], ...updates };
    localStorage.setItem(SCORES_KEY, JSON.stringify(entries));
  }
}

// ─── Contact Messages ───────────────────────────────────
export function getContactMessages(): ContactMessage[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CONTACTS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addContactMessage(msg: ContactMessage): void {
  const msgs = getContactMessages();
  msgs.push(msg);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(msgs));
}
