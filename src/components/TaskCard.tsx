import { Check, Trash2 } from 'lucide-react';
import { Task } from '../types';

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
  return (
    <div
      id={`task-item-${task.id}`}
      onClick={() => onEdit(task)}
      className="group relative bg-white rounded-2xl p-4 mb-3 border border-gray-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)] hover:shadow-md transition-all cursor-pointer flex items-start gap-3.5 select-none"
    >
      {/* Checkbox */}
      <button
        type="button"
        id={`checkbox-task-${task.id}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleComplete(task.id);
        }}
        className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-colors flex-shrink-0 ${
          task.completed
            ? 'bg-[#6750A4] text-white border border-[#6750A4]'
            : 'border-2 border-gray-600 bg-transparent hover:border-[#6750A4]'
        }`}
      >
        {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0 pr-1">
        {/* Title */}
        <h3
          className={`text-sm sm:text-base font-bold text-gray-900 leading-snug break-words ${
            task.completed ? 'line-through text-gray-500 font-medium' : ''
          }`}
        >
          {task.title}
        </h3>

        {/* Due Date/Time */}
        {(task.dueDate || task.dueTime) && (
          <p className="text-xs text-gray-600 font-medium mt-1">
            Hết hạn: {task.dueDate}{task.dueTime ? `, ${task.dueTime}` : ''}
          </p>
        )}

        {/* Notes / Description */}
        {task.description && (
          <div className="text-xs text-gray-600 mt-1 whitespace-pre-line leading-relaxed">
            {task.description}
          </div>
        )}
      </div>

      {/* Delete Action Button */}
      <button
        type="button"
        id={`btn-delete-${task.id}`}
        onClick={(e) => {
          e.stopPropagation();
          onDeleteRequest(task);
        }}
        className="p-1.5 -mr-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
        title="Xóa công việc"
      >
        <Trash2 className="w-5 h-5 stroke-[1.8]" />
      </button>
    </div>
  );
}
