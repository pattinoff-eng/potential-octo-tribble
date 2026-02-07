
export enum WorkType {
  NORMAL = 'Normaltid',
  OVERTIME = 'Övertid',
  TRAVEL = 'Restid',
  ABSENCE = 'Frånvaro',
  ATA = 'ÄTA-arbete'
}

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
}

export interface Worker {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  client: string;
  location: string;
}

export interface TimeEntry {
  id: string;
  date: string;
  projectId: string;
  hours: number;
  workType: WorkType;
  description: string;
  workerName: string;
}

export interface MaterialCost {
  id: string;
  projectId: string;
  date: string;
  description: string;
  amount: number;
  workerName: string;
  fileName?: string;
  fileData?: string; // Base64 string
}

export interface AIAnalysis {
  summary: string;
  efficiency: string;
  recommendations: string[];
}
