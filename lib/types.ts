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
