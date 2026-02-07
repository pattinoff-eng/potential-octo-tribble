
import { Project, WorkType, Worker } from './types';

export const INITIAL_PROJECTS: Project[] = [
  { id: '1', name: 'Västkustens Rör Lokal', code: 'P2023-01', client: '', location: 'Herrestad' },
];

export const INITIAL_WORKERS: Worker[] = [
  { id: 'w1', name: 'Patrik' },
  { id: 'w2', name: 'Rickard' },
];

export const WORK_TYPES = Object.values(WorkType);
