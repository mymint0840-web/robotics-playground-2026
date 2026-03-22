import { Registration } from "./types";
import { sampleRegistrations } from "./data";

const STORAGE_KEY = "robotics-playground-registrations";
const INITIALIZED_KEY = "robotics-playground-initialized";

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
