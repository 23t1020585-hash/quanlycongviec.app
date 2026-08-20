import type { MouseEvent } from 'react';
import { Check, Trash2, Tag, AlertCircle, BookOpen, Briefcase, User, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Task } from '../types';
import { Sound } from '../utils/soundEffects';

interface TaskCardProps {
  key?: string;
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDeleteRequest: (task: Task) => void;
}

export default function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDeleteRequest,
}: TaskCardProps) {
  const handleCheckboxClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!task.completed) {
      Sound.playComplete();
      // Get click position for localized confetti
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      Sound.fireConfetti(x, y);
    } else {
      Sound.playTap();
    }
    onToggleComplete(task.id);
  };

  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    Sound.playDelete();
    onDeleteRequest(task);
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-rose-100 text-rose-700 flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Gấp
          </span>
        );
      case 'medium':
        return (
          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800">
            TB
          </span>
        );
      case 'low':
        return (
          <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800">
            Thấp
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryBadge = (cat?: string) => {
    switch (cat) {
      case 'study':
        return (
          <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800 flex items-center gap-0.5">
            <BookOpen className="w-2.5 h-2.5" /> Học tập
          </span>
        );
      case 'work':
        return (
          <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-md bg-blue-100 text-blue-800 flex items-center gap-0.5">
            <Briefcase className="w-2.5 h-2.5" /> Công việc
          </span>
        );
      case 'health':
        return (
          <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
            <Heart className="w-2.5 h-2.5" /> Sức khỏe
          </span>
        );
      case 'personal':
        return (
          <span className="text-[10px] font-medium px-1.5 py-0.2 rounded-md bg-orange-100 text-orange-800 flex items-center gap-0.5">
            <User className="w-2.5 h-2.5" /> Cá nhân
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -80, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 450, damping: 28 }}
      id={`task-item-${task.id}`}
      onClick={() => {
        Sound.playTap();
        onEdit(task);
      }}
      className={`group relative rounded-2xl p-4 mb-3 border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
        task.completed
          ? 'bg-gray-50/90 border-gray-200/80 shadow-2xs opacity-80'
          : 'bg-white border-gray-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)] hover:shadow-md hover:border-purple-200'
      }`}
    >
      {/* Checkbox */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.82 }}
        id={`checkbox-task-${task.id}`}
        onClick={handleCheckboxClick}
        aria-label={task.completed ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}
        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-all shrink-0 ${
          task.completed
            ? 'bg-[#6750A4] text-white border border-[#6750A4] shadow-xs'
            : 'border-2 border-gray-400 bg-transparent hover:border-[#6750A4]'
        }`}
      >
        {task.completed && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </motion.div>
        )}
      </motion.button>

      {/* Task Content */}
      <div className="flex-1 min-w-0 pr-1">
        {/* Title */}
        <h3
          className={`text-sm sm:text-base font-bold text-gray-900 leading-snug break-words transition-all ${
            task.completed ? 'line-through text-gray-500 font-medium' : ''
          }`}
        >
          {task.title}
        </h3>

        {/* Due Date/Time */}
        {(task.dueDate || task.dueTime) && (
          <p className="text-xs text-gray-600 font-medium mt-1">
            Hết hạn: {task.dueDate}
            {task.dueTime ? `, ${task.dueTime}` : ''}
          </p>
        )}

        {/* Notes / Description */}
        {task.description && (
          <div className="text-xs text-gray-600 mt-1 whitespace-pre-line leading-relaxed">
            {task.description}
          </div>
        )}

        {/* Badges: Category & Priority */}
        {(task.priority || task.category) && (
          <div className="flex items-center gap-1.5 mt-2">
            {getPriorityBadge(task.priority)}
            {getCategoryBadge(task.category)}
          </div>
        )}
      </div>

      {/* Delete Action Button */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        id={`btn-delete-${task.id}`}
        onClick={handleDeleteClick}
        aria-label="Xóa công việc"
        className="p-1.5 -mr-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors shrink-0"
        title="Xóa công việc"
      >
        <Trash2 className="w-5 h-5 stroke-[1.8]" />
      </motion.button>
    </motion.div>
  );
}
