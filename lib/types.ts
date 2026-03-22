export interface Competition {
  id: string;
  name: string;
  ageRange: string;
  members: number;
  fee: number;
  icon: string;
  color: string;
}

export interface Event {
  id: string;
  name: string;
  registrationStart: string;
  registrationEnd: string;
  competitionStart: string;
  competitionEnd: string;
  competitions: Competition[];
}

export interface TeamMember {
  prefix: string;
  firstName: string;
  lastName: string;
}

export interface Registration {
  id: string;
  eventId: string;
  competitionId: string;
  competitionName: string;
  teamName: string;
  school: string;
  supervisor: TeamMember;
  members: TeamMember[];
  phone: string;
  shirtSize: string;
  timestamp: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  role: string;
  photo: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
}

export interface PaymentRecord {
  registrationId: string;
  teamName: string;
  competitionName: string;
  fee: number;
  status: "pending" | "paid";
  slipBase64: string;
  paidAt: string;
}

export interface ScoreEntry {
  id: string;
  competitionId: string;
  competitionName: string;
  teamName: string;
  rank: number;
  score: number;
  notes: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
