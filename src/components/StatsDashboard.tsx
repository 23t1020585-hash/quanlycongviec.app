import { Flame, CheckCircle2, Clock, Award, Target, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Task } from '../types';

interface StatsDashboardProps {
  tasks: Task[];
  userName: string;
}

export default function StatsDashboard({ tasks, userName }: StatsDashboardProps) {
  const total = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = total - completedCount;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  // Streak simulation based on completed tasks
  const streakDays = completedCount > 0 ? 3 + completedCount : 1;

  // Circular progress math
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 bg-gradient-to-br from-purple-50 via-indigo-50/40 to-pink-50/30 rounded-2xl p-3.5 border border-purple-100/80 shadow-xs relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-200/40 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-center justify-between gap-3 relative z-10">
        {/* Left: Circular Ring & Percentage */}
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
              {/* Background circle */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="stroke-purple-100"
                strokeWidth="5"
                fill="transparent"
              />
              {/* Progress animated circle */}
              <motion.circle
                cx="32"
                cy="32"
                r={radius}
                className="stroke-[#6750A4]"
                strokeWidth="5"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-black text-[#6750A4]">{percentage}%</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-gray-900">Tiến độ hôm nay</h4>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-purple-100 text-[#6750A4]">
                {completedCount}/{total} việc
              </span>
            </div>
            <p className="text-[11px] text-gray-600 mt-0.5">
              {percentage === 100
                ? 'Xuất sắc! Bạn đã hoàn thành hết mục tiêu 🎉'
                : percentage >= 50
                ? 'Đã làm được hơn một nửa, cố lên! 💪'
                : 'Hãy bắt đầu hoàn thành các mục tiêu nào! 🚀'}
            </p>
          </div>
        </div>

        {/* Right: Streak Flame Badge */}
        <div className="flex flex-col items-center justify-center bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-purple-100/80 shadow-2xs shrink-0">
          <div className="flex items-center gap-1 text-amber-500 font-black text-xs">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-bounce" />
            <span>{streakDays}</span>
          </div>
          <span className="text-[9px] font-semibold text-gray-600">Ngày chuỗi</span>
        </div>
      </div>
    </motion.div>
  );
}
