export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // Format: DD/MM/YYYY e.g. "31/08/2025" or ISO string
  dueTime: string; // Format: HH:MM AM/PM e.g. "11:55 PM"
  completed: boolean;
  createdAt: number;
}

export type ToastType = 'success' | 'update' | 'delete' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export type FilterType = 'all' | 'pending' | 'completed' | 'today';
export type SortType = 'newest' | 'oldest' | 'dueDate' | 'titleAsc';

export interface UserProfile {
  name: string;
  studentId?: string;
  role?: string;
}

export interface Quote {
  text: string;
  author: string;
}
