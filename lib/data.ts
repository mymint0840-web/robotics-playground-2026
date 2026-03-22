import { Competition, Event, Registration, NewsItem, ScoreEntry } from "./types";

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

export const sampleNews: NewsItem[] = [
  {
    id: "news-001",
    title: "เปิดรับสมัคร Robotics Playground 2026 Universe Open แล้ววันนี้!",
    content:
      "ขอเชิญน้องๆ นักเรียนที่สนใจด้านหุ่นยนต์เข้าร่วมการแข่งขัน Robotics Playground 2026 Universe Open ซึ่งเป็นเวทีที่เปิดโอกาสให้เยาวชนจากทั่วประเทศได้แสดงความสามารถในการออกแบบ สร้าง และควบคุมหุ่นยนต์ มีทั้งหมด 6 รายการแข่งขัน ครอบคลุมทุกระดับอายุ ตั้งแต่ 8-18 ปี เปิดรับสมัครตั้งแต่วันนี้ถึง 30 เมษายน 2569",
    category: "ประกาศ",
    date: "2026-03-01",
  },
  {
    id: "news-002",
    title: "กำหนดการแข่งขัน CISAT RoboXtreme 2026 อัปเดตล่าสุด",
    content:
      "กำหนดการแข่งขัน CISAT RoboXtreme 2026 ได้รับการอัปเดตแล้ว วันแข่งขันจะจัดขึ้นในวันที่ 3-5 พฤษภาคม 2569 ณ ศูนย์การประชุมแห่งชาติสิริกิติ์ ผู้เข้าแข่งขันจะต้องลงทะเบียนหน้างานก่อนเวลา 08:00 น. พร้อมนำหุ่นยนต์มาตรวจสอบมาตรฐานก่อนการแข่งขัน",
    category: "กำหนดการ",
    date: "2026-03-10",
  },
  {
    id: "news-003",
    title: "ประกาศรายชื่อโรงเรียนที่ผ่านเข้ารอบ Sumo Robot",
    content:
      "ขอแสดงความยินดีกับโรงเรียนที่ผ่านเข้ารอบการแข่งขัน Sumo Robot (Auto) ได้แก่ โรงเรียนสาธิต, โรงเรียนเซนต์คาเบรียล, โรงเรียนบดินทรเดชา, โรงเรียนเตรียมอุดมศึกษา และโรงเรียนสวนกุหลาบวิทยาลัย ทีมที่ผ่านเข้ารอบจะได้รับอีเมลยืนยันภายใน 3 วันทำการ",
    category: "ผลการคัดเลือก",
    date: "2026-03-18",
  },
  {
    id: "news-004",
    title: "อบรมเชิงปฏิบัติการ: เตรียมตัวก่อนแข่ง Line Follower",
    content:
      "ขอเชิญทีมที่ลงทะเบียนแข่งขัน Line Follower เข้าร่วมอบรมเชิงปฏิบัติการฟรี! เรียนรู้เทคนิคการปรับจูน PID Controller, การเลือกเซ็นเซอร์ที่เหมาะสม และการทดสอบหุ่นยนต์บนสนามจริง วันที่ 5 เมษายน 2569 เวลา 09:00-16:00 น. ณ คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    category: "อบรม",
    date: "2026-03-22",
  },
];

export const sampleScores: ScoreEntry[] = [
  {
    id: "score-001",
    competitionId: "sumo-auto",
    competitionName: "Sumo Robot (Auto)",
    teamName: "SK-01",
    rank: 1,
    score: 950,
    notes: "ชนะ 5 จาก 5 แมตช์",
  },
  {
    id: "score-002",
    competitionId: "sumo-auto",
    competitionName: "Sumo Robot (Auto)",
    teamName: "BK-03",
    rank: 2,
    score: 870,
    notes: "ชนะ 4 จาก 5 แมตช์",
  },
  {
    id: "score-003",
    competitionId: "sumo-auto",
    competitionName: "Sumo Robot (Auto)",
    teamName: "ST-02",
    rank: 3,
    score: 810,
    notes: "ชนะ 3 จาก 5 แมตช์",
  },
  {
    id: "score-004",
    competitionId: "line-follower",
    competitionName: "Line Follower",
    teamName: "CD-01",
    rank: 1,
    score: 98,
    notes: "เวลาดีที่สุด 12.3 วินาที",
  },
  {
    id: "score-005",
    competitionId: "line-follower",
    competitionName: "Line Follower",
    teamName: "SK-02",
    rank: 2,
    score: 92,
    notes: "เวลาดีที่สุด 14.1 วินาที",
  },
];
