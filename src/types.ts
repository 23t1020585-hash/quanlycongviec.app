export type Priority = 'high' | 'medium' | 'low';
export type Category = 'study' | 'work' | 'personal' | 'health';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // Format: DD/MM/YYYY e.g. "31/08/2025" or ISO string
  dueTime: string; // Format: HH:MM AM/PM e.g. "11:55 PM"
  completed: boolean;
  createdAt: number;
  priority?: Priority;
  category?: Category;
}

export type ToastType = 'success' | 'update' | 'delete' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export type FilterType = 'all' | 'pending' | 'completed' | 'study' | 'work' | 'high_priority';
export type SortType = 'newest' | 'oldest' | 'dueDate' | 'priority' | 'titleAsc';

export type PhoneFrameStyle = 'iphone' | 'android' | 'borderless';
export type AppTheme = 'purple' | 'blue' | 'emerald' | 'rose' | 'dark';

export interface UserProfile {
  name: string;
  studentId?: string;
  role?: string;
  avatarSeed?: string;
}

export interface Quote {
  text: string;
  author: string;
}
