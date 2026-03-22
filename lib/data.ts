import { Competition, Event, Registration } from "./types";

export const competitions: Competition[] = [
  {
    id: "sumo-auto",
    name: "Sumo Robot (Auto)",
    ageRange: "8-12 ปี",
    members: 2,
    fee: 500,
    icon: "sumo",
    color: "#FD6A02",
  },
  {
    id: "sumo-rc",
    name: "Sumo Robot (RC)",
    ageRange: "8-15 ปี",
    members: 2,
    fee: 500,
    icon: "controller",
    color: "#00F0FF",
  },
  {
    id: "rescue",
    name: "Rescue Mission",
    ageRange: "13-15 ปี",
    members: 3,
    fee: 700,
    icon: "rescue",
    color: "#EF4444",
  },
  {
    id: "line-follower",
    name: "Line Follower",
    ageRange: "10-15 ปี",
    members: 2,
    fee: 400,
    icon: "line",
    color: "#22C55E",
  },
  {
    id: "creative",
    name: "Creative Robot",
    ageRange: "ไม่จำกัดอายุ",
    members: 3,
    fee: 600,
    icon: "creative",
    color: "#A855F7",
  },
  {
    id: "drone",
    name: "Drone Racing",
    ageRange: "13-18 ปี",
    members: 2,
    fee: 800,
    icon: "drone",
    color: "#F59E0B",
  },
];

export const events: Event[] = [
  {
    id: "event-1",
    name: "Robotics Playground 2026 Universe Open",
    registrationStart: "01/03/2026",
    registrationEnd: "30/04/2026",
    competitionStart: "15/05/2026",
    competitionEnd: "17/05/2026",
    competitions,
  },
  {
    id: "event-2",
    name: "CISAT RoboXtreme 2026",
    registrationStart: "15/03/2026",
    registrationEnd: "30/04/2026",
    competitionStart: "03/05/2026",
    competitionEnd: "05/05/2026",
    competitions,
  },
];

export const schools = [
  "โรงเรียนสาธิต",
  "โรงเรียนวิทยาศาสตร์",
  "โรงเรียนเซนต์คาเบรียล",
  "โรงเรียนอัสสัมชัญ",
  "โรงเรียนกรุงเทพคริสเตียน",
  "โรงเรียนเตรียมอุดมศึกษา",
  "โรงเรียนสวนกุหลาบวิทยาลัย",
  "โรงเรียนบดินทรเดชา",
];

export const prefixes = ["นาย", "นาง", "นางสาว", "ด.ช.", "ด.ญ."];

export const shirtSizes = [
  { label: "S (32)", value: "S 32" },
  { label: "M (36)", value: "M 36" },
  { label: "L (40)", value: "L 40" },
  { label: "XL (44)", value: "XL 44" },
  { label: "2XL (48)", value: "2XL 48" },
  { label: "3XL (52)", value: "3XL 52" },
];

export const sampleRegistrations: Registration[] = [
  {
    id: "reg-001",
    eventId: "event-1",
    competitionId: "sumo-auto",
    competitionName: "Sumo Robot (Auto)",
    teamName: "SK-01",
    school: "โรงเรียนสาธิต",
    supervisor: { prefix: "นาย", firstName: "สมชาย", lastName: "ใจดี" },
    members: [
      { prefix: "ด.ช.", firstName: "ภูมิ", lastName: "รักเรียน" },
      { prefix: "ด.ญ.", firstName: "พิมพ์", lastName: "ใจสู้" },
    ],
    phone: "081-234-5678",
    shirtSize: "M 36",
    timestamp: "2026-03-15T10:30:00",
  },
  {
    id: "reg-002",
    eventId: "event-2",
    competitionId: "drone",
    competitionName: "Drone Racing",
    teamName: "FLY-07",
    school: "โรงเรียนเซนต์คาเบรียล",
    supervisor: { prefix: "นาง", firstName: "วิลาวัลย์", lastName: "สว่างจิต" },
    members: [
      { prefix: "ด.ช.", firstName: "ธนกร", lastName: "พัฒนา" },
      { prefix: "ด.ช.", firstName: "กิตติ", lastName: "เก่งกล้า" },
    ],
    phone: "092-345-6789",
    shirtSize: "L 40",
    timestamp: "2026-03-18T14:15:00",
  },
  {
    id: "reg-003",
    eventId: "event-1",
    competitionId: "rescue",
    competitionName: "Rescue Mission",
    teamName: "HERO-03",
    school: "โรงเรียนเตรียมอุดมศึกษา",
    supervisor: { prefix: "นางสาว", firstName: "อรุณี", lastName: "แสงทอง" },
    members: [
      { prefix: "ด.ช.", firstName: "วีรภัทร", lastName: "ชัยชนะ" },
      { prefix: "ด.ญ.", firstName: "ปวีณา", lastName: "สุขใจ" },
      { prefix: "ด.ช.", firstName: "นภัส", lastName: "เมฆา" },
    ],
    phone: "089-876-5432",
    shirtSize: "S 32",
    timestamp: "2026-03-20T09:00:00",
  },
];
