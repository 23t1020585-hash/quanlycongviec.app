import { useState, useRef, FormEvent } from 'react';
import { ArrowLeft, Calendar, Clock, Mic, Delete, Check, Smile } from 'lucide-react';
import { Task } from '../types';
import DatePickerModal from './DatePickerModal';
import TimePickerModal from './TimePickerModal';

interface TaskFormScreenProps {
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

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [lang, setLang] = useState<'VI' | 'EN'>('VI');
  const [error, setError] = useState('');

  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Vui lòng nhập tiêu đề công việc');
      titleInputRef.current?.focus();
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || '31/08/2025',
      dueTime: dueTime || '11:55 PM',
      completed,
    });
  };

  // Quick voice speech-to-text handler
  const handleToggleVoice = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận dạng giọng nói trực tiếp.');
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
    <div className="min-h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-4 border-b border-gray-100">
        <button
          id="btn-back"
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-800 transition-colors"
          title="Quay lại"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">
          {isEditing ? 'Sửa công việc' : 'Thêm công việc mới'}
        </h1>
      </div>

      {/* Form Container */}
      <div className="flex-1 px-5 pt-6 pb-20 relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Outlined Title Field */}
          <div className="relative group">
            <fieldset
              className={`rounded-xl border transition-colors ${
                error
                  ? 'border-red-500'
                  : 'border-purple-600 focus-within:border-purple-700 focus-within:ring-1 focus-within:ring-purple-700'
              } px-3 pt-1 pb-3`}
            >
              <legend className="px-1 text-xs font-semibold text-purple-700">
                Tiêu đề
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
                placeholder="Nhập tiêu đề công việc"
                className="w-full bg-transparent text-base text-gray-900 focus:outline-none placeholder-gray-400"
              />
            </fieldset>
            {error && <p className="text-xs text-red-500 mt-1 ml-2">{error}</p>}
          </div>

          {/* Outlined Description Field */}
          <div className="relative">
            <fieldset className="rounded-xl border border-gray-400 focus-within:border-purple-600 px-3 pt-1 pb-3 transition-colors">
              <legend className="px-1 text-xs font-medium text-gray-600">
                Nội dung (không bắt buộc)
              </legend>
              <textarea
                id="input-task-description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập nội dung chi tiết (không bắt buộc)"
                className="w-full bg-transparent text-sm text-gray-900 focus:outline-none placeholder-gray-400 resize-none leading-relaxed"
              />
            </fieldset>
          </div>

          {/* Pickers Row */}
          <div className="flex items-center gap-3 pt-1">
            {/* Date Picker Button */}
            <button
              id="btn-select-date"
              type="button"
              onClick={() => setShowDatePicker(true)}
              className="flex-1 py-3 px-4 rounded-full border border-purple-300 hover:border-purple-400 bg-white hover:bg-purple-50/40 flex items-center justify-center gap-2 text-sm font-medium text-purple-900 transition-colors shadow-sm"
            >
              <Calendar className="w-4 h-4 text-purple-700" />
              <span>{dueDate || 'Chọn ngày'}</span>
            </button>

            {/* Time Picker Button */}
            <button
              id="btn-select-time"
              type="button"
              onClick={() => setShowTimePicker(true)}
              className="flex-1 py-3 px-4 rounded-full border border-purple-300 hover:border-purple-400 bg-white hover:bg-purple-50/40 flex items-center justify-center gap-2 text-sm font-medium text-purple-900 transition-colors shadow-sm"
            >
              <Clock className="w-4 h-4 text-purple-700" />
              <span>{dueTime || 'Chọn giờ'}</span>
            </button>
          </div>

          {/* Submit Action Button */}
          <div className="pt-4">
            <button
              id="btn-save-task"
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-[#EADDFF] hover:bg-[#d8cce8] active:bg-[#cca3ea] text-[#21005D] font-bold text-sm tracking-wider uppercase shadow-sm transition-all text-center"
            >
              {isEditing ? 'LƯU THAY ĐỔI' : 'LƯU CÔNG VIỆC'}
            </button>
          </div>
        </form>

        {/* Floating Voice & Quick Input Palette on the left (matching screenshots) */}
        <div className="absolute left-2 bottom-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/80 p-1 flex flex-col items-center gap-2 z-20">
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`p-2.5 rounded-xl transition-all ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'text-gray-700 hover:bg-purple-50 hover:text-[#6750A4]'
            }`}
            title="Nhập bằng giọng nói (Voice typing)"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setTitle('');
              setDescription('');
            }}
            className="p-2.5 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            title="Xóa nội dung"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="p-2.5 rounded-xl bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
            title="Lưu nhanh"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setDescription((prev) => (prev ? `${prev} 😊` : '😊'))}
            className="p-2.5 rounded-xl text-gray-700 hover:bg-purple-50 transition-colors"
            title="Chèn biểu cảm"
          >
            <Smile className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setLang((prev) => (prev === 'VI' ? 'EN' : 'VI'))}
            className="px-2 py-1.5 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
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
    </div>
  );
}
