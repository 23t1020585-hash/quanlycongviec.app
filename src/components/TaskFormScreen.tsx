import { useState, useRef, FormEvent } from 'react';
import { ArrowLeft, Calendar, Clock, Mic, Delete, Check, Smile, Tag, AlertCircle, BookOpen, Briefcase, User, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Task, Priority, Category } from '../types';
import DatePickerModal from './DatePickerModal';
import TimePickerModal from './TimePickerModal';
import { Sound } from '../utils/soundEffects';

interface TaskFormScreenProps {
  key?: string;
  taskToEdit?: Task | null;
  onBack: () => void;
  onSave: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
}

export default function TaskFormScreen({
  taskToEdit,
  onBack,
  onSave,
}: TaskFormScreenProps) {
  const isEditing = !!taskToEdit;
  const [title, setTitle] = useState(taskToEdit?.title || '');
  const [description, setDescription] = useState(taskToEdit?.description || '');
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || '');
  const [dueTime, setDueTime] = useState(taskToEdit?.dueTime || '');
  const [completed] = useState(taskToEdit?.completed || false);
  const [priority, setPriority] = useState<Priority>(taskToEdit?.priority || 'medium');
  const [category, setCategory] = useState<Category>(taskToEdit?.category || 'study');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [lang, setLang] = useState<'VI' | 'EN'>('VI');
  const [error, setError] = useState('');

  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      Sound.playTap();
      setError('Vui lòng nhập tiêu đề công việc');
      titleInputRef.current?.focus();
      return;
    }

    Sound.playSuccess();
    onSave({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || '31/08/2025',
      dueTime: dueTime || '11:55 PM',
      completed,
      priority,
      category,
    });
  };

  // Quick voice speech-to-text handler
  const handleToggleVoice = () => {
    Sound.playTap();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Browser fallback simulation
      setIsRecording(true);
      setTimeout(() => {
        if (!title) {
          setTitle('Ôn tập kiến thức kiểm tra giữa kỳ');
        } else {
          setDescription((prev) => (prev ? `${prev}\n- Chuẩn bị slide thuyết trình` : 'Chuẩn bị slide thuyết trình'));
        }
        setIsRecording(false);
        Sound.playTap();
      }, 1400);
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'VI' ? 'vi-VN' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsRecording(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (!title) {
          setTitle(transcript);
        } else {
          setDescription((prev) => (prev ? `${prev}\n- ${transcript}` : transcript));
        }
        setIsRecording(false);
        Sound.playTap();
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="min-h-full flex flex-col bg-white"
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            id="btn-back"
            onClick={() => {
              Sound.playTap();
              onBack();
            }}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-800 transition-colors"
            title="Quay lại"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-lg font-bold text-gray-900">
            {isEditing ? 'Sửa công việc' : 'Thêm công việc mới'}
          </h1>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 px-5 pt-4 pb-20 relative overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Outlined Title Field */}
          <div className="relative group">
            <fieldset
              className={`rounded-xl border transition-colors ${
                error
                  ? 'border-red-500 bg-red-50/20'
                  : 'border-purple-600 focus-within:border-purple-700 focus-within:ring-1 focus-within:ring-purple-700 bg-white'
              } px-3 pt-1 pb-2.5`}
            >
              <legend className="px-1 text-xs font-semibold text-purple-700">
                Tiêu đề công việc *
              </legend>
              <input
                ref={titleInputRef}
                id="input-task-title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Nhập tiêu đề công việc..."
                className="w-full bg-transparent text-sm sm:text-base font-semibold text-gray-900 focus:outline-none placeholder-gray-400"
              />
            </fieldset>
            {error && <p className="text-xs text-red-500 mt-1 ml-2">{error}</p>}
          </div>

          {/* Outlined Description Field */}
          <div className="relative">
            <fieldset className="rounded-xl border border-gray-300 focus-within:border-purple-600 px-3 pt-1 pb-2.5 transition-colors bg-white">
              <legend className="px-1 text-xs font-medium text-gray-600">
                Nội dung chi tiết (không bắt buộc)
              </legend>
              <textarea
                id="input-task-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập ghi chú, các bước thực hiện..."
                className="w-full bg-transparent text-xs sm:text-sm text-gray-900 focus:outline-none placeholder-gray-400 resize-none leading-relaxed"
              />
            </fieldset>
          </div>

          {/* Category Selector */}
          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">
              Danh mục công việc
            </label>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {[
                { id: 'study', label: 'Học tập', icon: BookOpen, color: 'purple' },
                { id: 'work', label: 'Công việc', icon: Briefcase, color: 'blue' },
                { id: 'personal', label: 'Cá nhân', icon: User, color: 'orange' },
                { id: 'health', label: 'Sức khỏe', icon: Heart, color: 'emerald' },
              ].map((item) => {
                const Icon = item.icon;
                const selected = category === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      Sound.playTap();
                      setCategory(item.id as Category);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                      selected
                        ? 'bg-[#6750A4] text-white border-[#6750A4] shadow-xs'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority Selector */}
          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">
              Mức độ ưu tiên
            </label>
            <div className="flex items-center gap-2">
              {[
                { id: 'high', label: '🔴 Gấp / Cao', color: 'rose' },
                { id: 'medium', label: '🟡 Trung bình', color: 'amber' },
                { id: 'low', label: '🟢 Thấp', color: 'emerald' },
              ].map((p) => {
                const selected = priority === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      Sound.playTap();
                      setPriority(p.id as Priority);
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold transition-all border text-center ${
                      selected
                        ? 'bg-purple-100 text-[#6750A4] border-purple-400 ring-1 ring-purple-400 font-bold'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pickers Row */}
          <div className="flex items-center gap-2 pt-1">
            {/* Date Picker Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              id="btn-select-date"
              type="button"
              onClick={() => {
                Sound.playTap();
                setShowDatePicker(true);
              }}
              className="flex-1 py-2.5 px-3 rounded-xl border border-purple-200 hover:border-purple-300 bg-purple-50/30 hover:bg-purple-50/70 flex items-center justify-center gap-2 text-xs font-semibold text-purple-900 transition-colors shadow-2xs"
            >
              <Calendar className="w-4 h-4 text-purple-700" />
              <span>{dueDate || 'Chọn ngày'}</span>
            </motion.button>

            {/* Time Picker Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              id="btn-select-time"
              type="button"
              onClick={() => {
                Sound.playTap();
                setShowTimePicker(true);
              }}
              className="flex-1 py-2.5 px-3 rounded-xl border border-purple-200 hover:border-purple-300 bg-purple-50/30 hover:bg-purple-50/70 flex items-center justify-center gap-2 text-xs font-semibold text-purple-900 transition-colors shadow-2xs"
            >
              <Clock className="w-4 h-4 text-purple-700" />
              <span>{dueTime || 'Chọn giờ'}</span>
            </motion.button>
          </div>

          {/* Voice Wave Animation Banner if recording */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-2.5 flex items-center justify-between gap-3 text-red-700"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-bold">Đang lắng nghe giọng nói...</span>
                </div>
                {/* Audio visualizer bars */}
                <div className="flex items-center gap-1">
                  {[40, 70, 100, 60, 90, 45, 80].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ['4px', `${h * 0.18}px`, '4px'] }}
                      transition={{ duration: 0.5 + i * 0.1, repeat: Infinity }}
                      className="w-1 bg-red-500 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Action Button */}
          <div className="pt-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              id="btn-save-task"
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-[#EADDFF] hover:bg-[#d8cce8] active:bg-[#cca3ea] text-[#21005D] font-bold text-sm tracking-wider uppercase shadow-xs transition-all text-center flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{isEditing ? 'LƯU THAY ĐỔI' : 'LƯU CÔNG VIỆC'}</span>
            </motion.button>
          </div>
        </form>

        {/* Floating Voice & Quick Input Palette on the left (matching screenshots) */}
        <div className="absolute left-2 bottom-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/80 p-1 flex flex-col items-center gap-1.5 z-20">
          <motion.button
            whileTap={{ scale: 0.85 }}
            type="button"
            onClick={handleToggleVoice}
            className={`p-2 rounded-xl transition-all ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'text-gray-700 hover:bg-purple-50 hover:text-[#6750A4]'
            }`}
            title="Nhập bằng giọng nói (Voice typing)"
          >
            <Mic className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            type="button"
            onClick={() => {
              Sound.playDelete();
              setTitle('');
              setDescription('');
            }}
            className="p-2 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            title="Xóa nội dung"
          >
            <Delete className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            type="button"
            onClick={handleSubmit}
            className="p-2 rounded-xl bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
            title="Lưu nhanh"
          >
            <Check className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            type="button"
            onClick={() => {
              Sound.playTap();
              setDescription((prev) => (prev ? `${prev} 😊` : '😊'));
            }}
            className="p-2 rounded-xl text-gray-700 hover:bg-purple-50 transition-colors"
            title="Chèn biểu cảm"
          >
            <Smile className="w-4 h-4" />
          </motion.button>
          <button
            type="button"
            onClick={() => {
              Sound.playTap();
              setLang((prev) => (prev === 'VI' ? 'EN' : 'VI'));
            }}
            className="px-1.5 py-1 rounded-lg text-[10px] font-bold text-gray-700 hover:bg-gray-100 transition-colors"
            title="Đổi ngôn ngữ nhập"
          >
            {lang}
          </button>
        </div>
      </div>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DatePickerModal
          initialDate={dueDate}
          onClose={() => setShowDatePicker(false)}
          onSelect={(d) => setDueDate(d)}
        />
      )}

      {/* Time Picker Modal */}
      {showTimePicker && (
        <TimePickerModal
          initialTime={dueTime}
          onClose={() => setShowTimePicker(false)}
          onSelect={(t) => setDueTime(t)}
        />
      )}
    </motion.div>
  );
}
