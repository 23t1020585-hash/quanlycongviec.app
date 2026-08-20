import { useState, FormEvent } from 'react';
import { CheckCircle2, Sparkles, ArrowRight, User, GraduationCap, Target } from 'lucide-react';
import { UserProfile } from '../types';

interface WelcomeScreenProps {
  key?: string;
  initialProfile?: UserProfile;
  onContinue: (profile: UserProfile) => void;
  onSkip?: () => void;
}

export default function WelcomeScreen({
  initialProfile,
  onContinue,
  onSkip,
}: WelcomeScreenProps) {
  const [name, setName] = useState(initialProfile?.name || 'Lê Văn Tuấn');
  const [studentId, setStudentId] = useState(initialProfile?.studentId || '23T1020585 - Flutter & Dart');
  const [role, setRole] = useState(initialProfile?.role || 'Lập trình trên thiết bị di động');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập họ và tên của bạn');
      return;
    }

    onContinue({
      name: name.trim(),
      studentId: studentId.trim(),
      role: role.trim(),
    });
  };

  const handleQuickName = (suggestedName: string) => {
    setName(suggestedName);
    setError('');
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-gradient-to-b from-purple-50/50 via-white to-white p-6 relative">
      {/* Top Graphic / Hero Section */}
      <div className="pt-4 flex flex-col items-center text-center">
        {/* App Logo Emblem */}
        <div className="relative mb-5">
          <div className="w-20 h-20 rounded-3xl bg-[#EADDFF] flex items-center justify-center text-[#21005D] shadow-lg shadow-purple-500/10 ring-4 ring-purple-100">
            <CheckCircle2 className="w-11 h-11 text-[#6750A4]" />
          </div>
          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Chào mừng đến với
        </h1>
        <h2 className="text-3xl font-extrabold text-[#6750A4] mt-0.5 tracking-tight">
          My Tasks
        </h2>
        <p className="text-xs text-gray-600 max-w-[280px] mt-2 leading-relaxed">
          Ứng dụng quản lý công việc và kế hoạch học tập hàng ngày một cách khoa học, trực quan.
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="my-6 space-y-4">
        {/* Full Name Input */}
        <div>
          <fieldset
            className={`rounded-2xl border transition-all ${
              error
                ? 'border-red-500 ring-1 ring-red-500'
                : 'border-purple-600 focus-within:border-purple-700 focus-within:ring-2 focus-within:ring-purple-200'
            } px-3.5 pt-1.5 pb-2.5 bg-white shadow-xs`}
          >
            <legend className="px-1 text-xs font-bold text-[#6750A4] flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              Họ và tên của bạn <span className="text-red-500">*</span>
            </legend>
            <input
              id="welcome-input-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Nhập họ và tên (VD: Lê Văn Tuấn)"
              className="w-full bg-transparent text-sm sm:text-base font-semibold text-gray-900 focus:outline-none placeholder-gray-400"
              autoFocus
            />
          </fieldset>
          {error && <p className="text-xs text-red-500 mt-1 ml-2 font-medium">{error}</p>}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 flex-wrap px-1">
          <span className="text-[11px] text-gray-500 font-medium">Gợi ý nhanh:</span>
          {['Lê Văn Tuấn', 'Nguyễn Văn A', 'Trần Thị B'].map((sName) => (
            <button
              key={sName}
              type="button"
              onClick={() => handleQuickName(sName)}
              className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-100/80 hover:bg-purple-200 text-[#493175] font-medium transition-colors"
            >
              {sName}
            </button>
          ))}
        </div>

        {/* Student ID / Info */}
        <div>
          <fieldset className="rounded-2xl border border-gray-300 focus-within:border-[#6750A4] focus-within:ring-2 focus-within:ring-purple-200 px-3.5 pt-1.5 pb-2.5 bg-white transition-all shadow-xs">
            <legend className="px-1 text-xs font-medium text-gray-600 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-gray-500" />
              Mã sinh viên / Lớp học (không bắt buộc)
            </legend>
            <input
              id="welcome-input-studentid"
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="VD: 23T1020585 - Đồ án Flutter & Dart"
              className="w-full bg-transparent text-sm text-gray-800 focus:outline-none placeholder-gray-400"
            />
          </fieldset>
        </div>

        {/* Course / Project Info */}
        <div>
          <fieldset className="rounded-2xl border border-gray-300 focus-within:border-[#6750A4] focus-within:ring-2 focus-within:ring-purple-200 px-3.5 pt-1.5 pb-2.5 bg-white transition-all shadow-xs">
            <legend className="px-1 text-xs font-medium text-gray-600 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-gray-500" />
              Môn học / Dự án (không bắt buộc)
            </legend>
            <input
              id="welcome-input-role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="VD: Lập trình trên thiết bị di động"
              className="w-full bg-transparent text-sm text-gray-800 focus:outline-none placeholder-gray-400"
            />
          </fieldset>
        </div>
      </form>

      {/* Footer Action Buttons */}
      <div className="space-y-3 pb-2">
        <button
          id="btn-welcome-start"
          type="button"
          onClick={handleSubmit}
          className="w-full py-4 px-6 rounded-full bg-[#6750A4] hover:bg-[#523d85] active:scale-[0.99] text-white font-bold text-sm tracking-wider uppercase shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
        >
          <span>BẮT ĐẦU NGAY</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="w-full text-center text-xs font-semibold text-gray-500 hover:text-[#6750A4] py-1 transition-colors"
          >
            Bỏ qua & sử dụng mặc định
          </button>
        )}
      </div>
    </div>
  );
}
