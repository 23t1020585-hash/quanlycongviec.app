import { useState } from 'react';
import { Keyboard } from 'lucide-react';

interface TimePickerModalProps {
  initialTime?: string; // e.g. "11:55 PM" or "04:30 PM"
  onClose: () => void;
  onSelect: (timeStr: string) => void;
}

export default function TimePickerModal({ initialTime, onClose, onSelect }: TimePickerModalProps) {
  const parseInitialTime = (tStr?: string) => {
    if (tStr) {
      const match = tStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (match) {
        return {
          hour: parseInt(match[1], 10),
          minute: parseInt(match[2], 10),
          period: match[3].toUpperCase() as 'AM' | 'PM',
        };
      }
    }
    return { hour: 4, minute: 30, period: 'PM' as 'AM' | 'PM' };
  };

  const init = parseInitialTime(initialTime);
  const [hour, setHour] = useState<number>(init.hour);
  const [minute, setMinute] = useState<number>(init.minute);
  const [period, setPeriod] = useState<'AM' | 'PM'>(init.period);
  const [activeUnit, setActiveUnit] = useState<'hour' | 'minute'>('hour');
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);

  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 41, 45, 50, 55];

  const handleConfirm = () => {
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');
    onSelect(`${formattedHour}:${formattedMinute} ${period}`);
    onClose();
  };

  // Clock dial calculations
  const radius = 95;
  const center = 115;
  const currentAngle =
    activeUnit === 'hour'
      ? ((hour % 12) / 12) * 360
      : (minute / 60) * 360;

  const handRad = (currentAngle - 90) * (Math.PI / 180);
  const handX = center + radius * 0.72 * Math.cos(handRad);
  const handY = center + radius * 0.72 * Math.sin(handRad);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div 
        id="time-picker-dialog"
        className="w-full max-w-[328px] rounded-[28px] bg-[#f8f9fe] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="px-6 pt-5 pb-3">
          <p className="text-xs font-semibold text-[#6750A4]">Select time</p>
        </div>

        {/* Digital Time Inputs Header */}
        <div className="px-6 py-2 flex items-center justify-center gap-2">
          <div className="flex items-center gap-1">
            {/* Hour Input Box */}
            <button
              onClick={() => setActiveUnit('hour')}
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-4xl font-semibold transition-all ${
                activeUnit === 'hour'
                  ? 'bg-[#EADDFF] text-[#21005D] ring-2 ring-[#6750A4]'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {hour}
            </button>

            <span className="text-3xl font-bold text-gray-800 px-1">:</span>

            {/* Minute Input Box */}
            <button
              onClick={() => setActiveUnit('minute')}
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-4xl font-semibold transition-all ${
                activeUnit === 'minute'
                  ? 'bg-[#EADDFF] text-[#21005D] ring-2 ring-[#6750A4]'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {String(minute).padStart(2, '0')}
            </button>
          </div>

          {/* AM / PM Segmented Control */}
          <div className="flex flex-col border border-gray-300 rounded-xl overflow-hidden ml-2">
            <button
              onClick={() => setPeriod('AM')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                period === 'AM' ? 'bg-[#FFD8E4] text-[#31111D]' : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              AM
            </button>
            <div className="h-[1px] bg-gray-300" />
            <button
              onClick={() => setPeriod('PM')}
              className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                period === 'PM' ? 'bg-[#FFD8E4] text-[#31111D]' : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              PM
            </button>
          </div>
        </div>

        {/* Analog Clock Dial */}
        {!isKeyboardMode ? (
          <div className="py-4 flex justify-center">
            <div className="relative w-[230px] h-[230px] rounded-full bg-[#ece6f0]/70 flex items-center justify-center select-none shadow-inner">
              {/* Dial SVG Hand */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1={center}
                  y1={center}
                  x2={handX}
                  y2={handY}
                  stroke="#6750A4"
                  strokeWidth="2.5"
                />
                <circle cx={center} cy={center} r="4" fill="#6750A4" />
                <circle cx={handX} cy={handY} r="16" fill="#6750A4" opacity="0.9" />
              </svg>

              {/* Numbers */}
              {activeUnit === 'hour'
                ? hours.map((h, i) => {
                    const angle = (i * 30 - 60) * (Math.PI / 180);
                    const x = center + radius * 0.72 * Math.cos(angle);
                    const y = center + radius * 0.72 * Math.sin(angle);
                    const isSelected = hour === h || (h === 12 && hour === 0);

                    return (
                      <button
                        key={h}
                        onClick={() => {
                          setHour(h);
                          setActiveUnit('minute');
                        }}
                        style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
                        className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium z-10 ${
                          isSelected ? 'text-white font-bold' : 'text-gray-800'
                        }`}
                      >
                        {h}
                      </button>
                    );
                  })
                : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m, i) => {
                    const angle = (i * 30 - 60) * (Math.PI / 180);
                    const x = center + radius * 0.72 * Math.cos(angle);
                    const y = center + radius * 0.72 * Math.sin(angle);
                    const isSelected = minute === m;

                    return (
                      <button
                        key={m}
                        onClick={() => setMinute(m)}
                        style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
                        className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium z-10 ${
                          isSelected ? 'text-white font-bold' : 'text-gray-800'
                        }`}
                      >
                        {String(m).padStart(2, '0')}
                      </button>
                    );
                  })}
            </div>
          </div>
        ) : (
          <div className="p-6 flex flex-col gap-4">
            <label className="text-xs font-medium text-gray-600">Nhập giờ & phút bằng bàn phím</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                max="12"
                value={hour}
                onChange={(e) => setHour(Math.min(12, Math.max(1, Number(e.target.value))))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center font-bold"
              />
              <input
                type="number"
                min="0"
                max="59"
                value={minute}
                onChange={(e) => setMinute(Math.min(59, Math.max(0, Number(e.target.value))))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center font-bold"
              />
            </div>
          </div>
        )}

        {/* Actions Footer */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100/60 bg-white">
          <button
            onClick={() => setIsKeyboardMode(!isKeyboardMode)}
            className="p-1.5 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
            title="Chuyển chế độ bàn phím"
          >
            <Keyboard className="w-5 h-5" />
          </button>
          <div className="flex gap-3">
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
    </div>
  );
}
