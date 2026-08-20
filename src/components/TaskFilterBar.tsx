import { Search, X, ArrowUpDown, Filter, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { FilterType, SortType } from '../types';

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
    today: number;
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
  return (
    <div className="space-y-2.5 mb-4">
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
            onClick={() => onSearchChange('')}
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
          <button
            id="filter-chip-all"
            onClick={() => onFilterChange('all')}
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
          </button>

          <button
            id="filter-chip-pending"
            onClick={() => onFilterChange('pending')}
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
          </button>

          <button
            id="filter-chip-completed"
            onClick={() => onFilterChange('completed')}
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
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <div className="relative flex items-center bg-gray-100 hover:bg-gray-200 rounded-lg px-2 py-1 transition-colors">
            <ArrowUpDown className="w-3 h-3 text-gray-500 mr-1 shrink-0" />
            <select
              id="task-sort-select"
              value={activeSort}
              onChange={(e) => onSortChange(e.target.value as SortType)}
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
