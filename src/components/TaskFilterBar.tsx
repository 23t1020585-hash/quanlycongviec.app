import { Search, X, ArrowUpDown, CheckCircle2, Clock, BookOpen, Briefcase, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { FilterType, SortType } from '../types';
import { Sound } from '../utils/soundEffects';

interface TaskFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeSort: SortType;
  onSortChange: (sort: SortType) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
    study?: number;
    work?: number;
    high_priority?: number;
  };
}

export default function TaskFilterBar({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  activeSort,
  onSortChange,
  counts,
}: TaskFilterBarProps) {
  const handleFilterClick = (filter: FilterType) => {
    Sound.playTap();
    onFilterChange(filter);
  };

  return (
    <div className="space-y-2 mb-3">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
        <input
          id="task-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm kiếm công việc theo tên, nội dung..."
          className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-gray-200 focus:border-[#6750A4] rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all text-gray-900 placeholder-gray-400"
        />
        {searchQuery && (
          <button
            onClick={() => {
              Sound.playTap();
              onSearchChange('');
            }}
            className="absolute right-2.5 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200/60"
            title="Xóa tìm kiếm"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Chips & Sort Dropdown Row */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 shrink-0">
          <motion.button
            whileTap={{ scale: 0.95 }}
            id="filter-chip-all"
            onClick={() => handleFilterClick('all')}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
              activeFilter === 'all'
                ? 'bg-[#6750A4] text-white shadow-xs'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            <span>Tất cả</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeFilter === 'all' ? 'bg-purple-800 text-purple-100' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {counts.all}
            </span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            id="filter-chip-pending"
            onClick={() => handleFilterClick('pending')}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
              activeFilter === 'pending'
                ? 'bg-[#6750A4] text-white shadow-xs'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Chưa xong</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeFilter === 'pending' ? 'bg-purple-800 text-purple-100' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {counts.pending}
            </span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            id="filter-chip-completed"
            onClick={() => handleFilterClick('completed')}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
              activeFilter === 'completed'
                ? 'bg-[#6750A4] text-white shadow-xs'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Đã xong</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeFilter === 'completed' ? 'bg-purple-800 text-purple-100' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {counts.completed}
            </span>
          </motion.button>

          {typeof counts.high_priority === 'number' && counts.high_priority > 0 && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              id="filter-chip-high"
              onClick={() => handleFilterClick('high_priority')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                activeFilter === 'high_priority'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700'
              }`}
            >
              <AlertCircle className="w-3 h-3" />
              <span>Gấp</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-200 text-rose-900 font-bold">
                {counts.high_priority}
              </span>
            </motion.button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <div className="relative flex items-center bg-gray-100 hover:bg-gray-200 rounded-lg px-2 py-1 transition-colors">
            <ArrowUpDown className="w-3 h-3 text-gray-500 mr-1 shrink-0" />
            <select
              id="task-sort-select"
              value={activeSort}
              onChange={(e) => {
                Sound.playTap();
                onSortChange(e.target.value as SortType);
              }}
              aria-label="Sắp xếp danh sách công việc"
              className="bg-transparent text-[11px] font-semibold text-gray-700 focus:outline-none cursor-pointer pr-1"
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="dueDate">Hạn chót</option>
              <option value="titleAsc">Tên A-Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
