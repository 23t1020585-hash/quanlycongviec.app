import { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, BatteryCharging, Sparkles, CheckCircle, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PhoneFrameStyle, AppTheme } from '../types';
import { Sound } from '../utils/soundEffects';

interface MobileStatusBarProps {
  frameStyle: PhoneFrameStyle;
  theme: AppTheme;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  activeTaskCount: number;
}

export default function MobileStatusBar({
  frameStyle,
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  activeTaskCount,
}: MobileStatusBarProps) {
  const [timeStr, setTimeStr] = useState('');
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [batteryLevel] = useState(94);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      hours = hours % 12 || 12;
      setTimeStr(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      className={`px-6 pt-3 pb-1 select-none z-30 transition-colors relative ${
        isDark ? 'bg-slate-900 text-slate-100' : 'bg-white text-gray-900'
      }`}
    >
      <div className="flex items-center justify-between text-xs font-semibold">
        {/* Left: Live Real-time Clock */}
        <span className="font-bold tracking-tight text-xs w-14">{timeStr || '9:41'}</span>

        {/* Center: Dynamic Island (iPhone) or Punch-hole Camera (Android) */}
        {frameStyle === 'iphone' ? (
          <motion.div
            layout
            onClick={() => {
              Sound.playTap();
              setIslandExpanded((prev) => !prev);
            }}
            className={`cursor-pointer bg-black text-white rounded-full flex items-center justify-center transition-all ${
              islandExpanded ? 'px-3.5 py-1.5 min-w-[170px] shadow-lg' : 'h-6 px-3 min-w-[84px]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <AnimatePresence mode="wait">
                {islandExpanded ? (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 text-[11px] font-medium"
                  >
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{activeTaskCount} việc cần làm</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-gray-300 font-mono tracking-wider"
                  >
                    {activeTaskCount > 0 ? `${activeTaskCount} việc` : 'Thong thả'}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center">
            {/* Center Punch-hole Camera for Android */}
            <div className="w-3.5 h-3.5 rounded-full bg-black ring-2 ring-gray-900" />
          </div>
        )}

        {/* Right: Quick Controls & Battery / 5G status */}
        <div className="flex items-center gap-2 text-[11px] w-16 justify-end">
          <button
            onClick={onToggleSound}
            className="text-gray-400 hover:text-[#6750A4] transition-colors p-0.5"
            title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
          >
            {soundEnabled ? <Volume2 className="w-3 h-3 text-[#6750A4]" /> : <VolumeX className="w-3 h-3" />}
          </button>
          <Wifi className="w-3 h-3 stroke-[2.5]" />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] font-bold">{batteryLevel}%</span>
            <div className="w-4 h-2.5 border border-current rounded-xs p-[1px] flex items-center">
              <div className="h-full bg-current rounded-2xs" style={{ width: `${batteryLevel}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
