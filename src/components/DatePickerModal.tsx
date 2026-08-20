import { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';

interface DatePickerModalProps {
  initialDate?: string; // DD/MM/YYYY
  onClose: () => void;
  onSelect: (dateStr: string) => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function DatePickerModal({ initialDate, onClose, onSelect }: DatePickerModalProps) {
  // Parse initialDate or fallback to Aug 28, 2025
  const parseDate = (dStr?: string) => {
    if (dStr && dStr.includes('/')) {
      const [d, m, y] = dStr.split('/').map(Number);
      return new Date(y || 2025, (m ? m - 1 : 7), d || 28);
    }
    return new Date(2025, 7, 28); // August 28, 2025 default as in screenshot
  };

  const [selectedDate, setSelectedDate] = useState<Date>(() => parseDate(initialDate));
  const [viewYear, setViewYear] = useState<number>(() => parseDate(initialDate).getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(() => parseDate(initialDate).getMonth());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(viewYear, viewMonth, day);
    setSelectedDate(newDate);
  };

  const handleConfirm = () => {
    const d = String(selectedDate.getDate()).padStart(2, '0');
    const m = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const y = selectedDate.getFullYear();
    onSelect(`${d}/${m}/${y}`);
    onClose();
  };

  const formattedHeader = `${WEEKDAYS_SHORT[selectedDate.getDay()]}, ${MONTHS_SHORT[selectedDate.getMonth()]} ${selectedDate.getDate()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div 
        id="date-picker-dialog"
        className="w-full max-w-[328px] rounded-[28px] bg-[#f8f9fe] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-3">
          <p className="text-xs font-semibold text-[#6750A4] tracking-wide">Select date</p>
          <div className="flex items-center justify-between mt-1">
            <h2 className="text-2xl font-normal text-gray-900">{formattedHeader}</h2>
            <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-200/50">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Month Selector */}
        <div className="px-6 py-2 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-800">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={handlePrevMonth}
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNextMonth}
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="px-4 pb-2">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-700 mb-1">
            {DAY_NAMES.map((dn, idx) => (
              <div key={idx} className="h-8 flex items-center justify-center">{dn}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-9 w-9" />
            ))}

            {/* Days of month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected =
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === viewMonth &&
                selectedDate.getFullYear() === viewYear;
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === viewMonth &&
                new Date().getFullYear() === viewYear;

              return (
                <button
                  key={day}
                  onClick={() => handleSelectDay(day)}
                  className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#6750A4] text-white font-bold shadow-sm'
                      : isToday
                      ? 'border border-[#6750A4] text-[#6750A4]'
                      : 'text-gray-800 hover:bg-purple-100/60'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 flex justify-end gap-3 border-t border-gray-100/60 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-semibold text-[#6750A4] hover:bg-purple-50 rounded-full transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1.5 text-sm font-semibold text-[#6750A4] hover:bg-purple-50 rounded-full transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
