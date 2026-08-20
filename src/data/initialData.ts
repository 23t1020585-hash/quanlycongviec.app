import { Task, Quote } from '../types';

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Nộp báo cáo môn học Lập trình trên thiết bị di động',
    description: 'Đồ án Flutter - Dart',
    dueDate: '31/08/2025',
    dueTime: '11:55 PM',
    completed: false,
    createdAt: Date.now() - 3600000 * 24,
  },
  {
    id: 'task-2',
    title: 'CHECK MAIL',
    description: '- Mail báo cáo tháng\n- Mail gửi nhắn lọc hệ thống',
    dueDate: '28/08/2025',
    dueTime: '04:30 PM',
    completed: false,
    createdAt: Date.now() - 3600000 * 12,
  },
  {
    id: 'task-3',
    title: 'Dự án Mobile',
    description: '- Xây dựng UI/UX cho màn hình Đăng ký\n- Làm màn hình Home\n- Kết nối API với danh sách hàng',
    dueDate: '20/08/2025',
    dueTime: '09:00 AM',
    completed: true,
    createdAt: Date.now() - 3600000 * 48,
  },
  {
    id: 'task-4',
    title: 'Báo cáo tuần nhân viên',
    description: '- Tổng hợp số liệu KPI tuần 15 (07/04 - 13/04/2025)\n- Gửi báo cáo cho quản lý',
    dueDate: '13/04/2025',
    dueTime: '05:00 PM',
    completed: false,
    createdAt: Date.now() - 3600000 * 72,
  },
];

export const QUOTES: Quote[] = [
  {
    text: 'A very little key will open a very heavy door.',
    author: 'Charles Dickens',
  },
  {
    text: 'The secret of getting ahead is getting started.',
    author: 'Mark Twain',
  },
  {
    text: 'Focus on being productive instead of busy.',
    author: 'Tim Ferriss',
  },
];
