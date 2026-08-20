import { Check, Trash2, LogOut, Plus, Edit2, ChevronLeft, ChevronRight, CheckCircle2, Mic, Delete, Smile, Keyboard, Sparkles, User, GraduationCap, Target, ArrowRight } from 'lucide-react';

export default function AllScreensPreview() {
  return (
    <div className="w-full min-h-screen bg-slate-950 p-4 sm:p-8 text-slate-100">
      {/* Header Info */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Tổng hợp tất cả bản xem trước (All Preview Screens)
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Tất cả các trạng thái giao diện chuẩn theo từng ảnh chụp màn hình và màn hình chào mừng trong ứng dụng My Tasks.
        </p>
      </div>

      {/* Grid of Preview Phones */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        
        {/* --- SCREEN 0: Welcome / Onboarding Screen --- */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-wider">
            ★ Màn hình Chào mừng (Điền thông tin)
          </span>
          <div className="w-[340px] h-[700px] rounded-[40px] bg-white ring-8 ring-neutral-800 shadow-2xl overflow-hidden relative border border-neutral-700 flex flex-col text-gray-900">
            {/* Status bar */}
            <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between text-black text-xs font-semibold select-none">
              <span>3:46</span>
              <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto" />
              <span>5G 100%</span>
            </div>
            {/* Content */}
            <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto">
              <div className="pt-2 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#EADDFF] flex items-center justify-center text-[#21005D] shadow-md mb-3 ring-4 ring-purple-100">
                  <CheckCircle2 className="w-9 h-9 text-[#6750A4]" />
                </div>
                <h2 className="text-lg font-black text-gray-900">Chào mừng đến với</h2>
                <h3 className="text-2xl font-black text-[#6750A4]">My Tasks</h3>
                <p className="text-[11px] text-gray-600 mt-1">
                  Quản lý công việc hàng ngày khoa học & hiệu quả
                </p>
              </div>

              <div className="my-4 space-y-3">
                <div className="rounded-xl border-2 border-purple-600 px-3 pt-1.5 pb-2 bg-white">
                  <span className="text-[10px] font-bold text-[#6750A4] block">Họ và tên của bạn *</span>
                  <p className="text-sm font-bold text-gray-900">Lê Văn Tuấn</p>
                </div>

                <div className="rounded-xl border border-gray-300 px-3 pt-1.5 pb-2 bg-white">
                  <span className="text-[10px] font-medium text-gray-500 block">Mã sinh viên / Lớp</span>
                  <p className="text-xs text-gray-700">23T1020585 - Đồ án Flutter & Dart</p>
                </div>

                <div className="rounded-xl border border-gray-300 px-3 pt-1.5 pb-2 bg-white">
                  <span className="text-[10px] font-medium text-gray-500 block">Môn học / Dự án</span>
                  <p className="text-xs text-gray-700">Lập trình trên thiết bị di động</p>
                </div>
              </div>

              <div className="pb-3">
                <div className="w-full py-3 rounded-full bg-[#6750A4] text-white font-bold text-xs uppercase shadow-md flex items-center justify-center gap-2">
                  <span>BẮT ĐẦU NGAY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
            {/* Bottom bar */}
            <div className="bg-white py-1 flex justify-center">
              <div className="w-28 h-1 bg-black rounded-full" />
            </div>
          </div>
        </div>

        {/* --- SCREEN 1: Home + Green Toast (Added Successfully) --- */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">
            1. Màn hình chính - Thêm thành công (Green Toast)
          </span>
          <div className="w-[340px] h-[700px] rounded-[40px] bg-white ring-8 ring-neutral-800 shadow-2xl overflow-hidden relative border border-neutral-700 flex flex-col text-gray-900">
            {/* Status bar */}
            <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between text-black text-xs font-semibold select-none">
              <span>3:35</span>
              <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto" />
              <span>5G 100%</span>
            </div>
            {/* Content */}
            <div className="flex-1 p-5 pb-20 relative flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between pb-3">
                <h1 className="text-xl font-bold">My Tasks</h1>
                <LogOut className="w-5 h-5 text-gray-800" />
              </div>
              <h2 className="text-xl font-bold mb-3">Chào, Lê Văn Tuấn!</h2>
              <div className="bg-[#e7f1fb] rounded-2xl py-3 px-3 text-center mb-4">
                <p className="text-xs italic text-gray-800 font-serif">"A very little key will open a very heavy door."</p>
                <p className="text-[11px] text-gray-700 font-medium mt-0.5">- Charles Dickens</p>
              </div>
              <h3 className="text-base font-bold mb-2">Công việc hôm nay</h3>
              <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded border-2 border-gray-600" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 leading-snug">
                    Nộp báo cáo môn học Lập trình trên thiết bị di động
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-1 font-medium">Hết hạn: 31/08/2025, 11:55 PM</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">Đồ án Flutter - Dart</p>
                </div>
                <Trash2 className="w-4 h-4 text-red-500" />
              </div>
              {/* FAB */}
              <div className="absolute bottom-5 right-5 w-12 h-12 rounded-2xl bg-[#EADDFF] text-[#21005D] shadow-md flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
            </div>
            {/* Toast */}
            <div className="absolute bottom-0 inset-x-0 bg-[#2E7D32] text-white px-4 py-3 rounded-t-xl flex items-center gap-2 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Đã thêm công việc mới thành công!</span>
            </div>
          </div>
        </div>

        {/* --- SCREEN 2: Home + Blue Toast (Updated Successfully) --- */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wider">
            2. Màn hình chính - Cập nhật (Blue Toast)
          </span>
          <div className="w-[340px] h-[700px] rounded-[40px] bg-white ring-8 ring-neutral-800 shadow-2xl overflow-hidden relative border border-neutral-700 flex flex-col text-gray-900">
            <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between text-black text-xs font-semibold select-none">
              <span>3:39</span>
              <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto" />
              <span>5G 100%</span>
            </div>
            <div className="flex-1 p-5 pb-20 relative flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between pb-3">
                <h1 className="text-xl font-bold">My Tasks</h1>
                <LogOut className="w-5 h-5 text-gray-800" />
              </div>
              <h2 className="text-xl font-bold mb-3">Chào, Lê Văn Tuấn!</h2>
              <div className="bg-[#e7f1fb] rounded-2xl py-3 px-3 text-center mb-4">
                <p className="text-xs italic text-gray-800 font-serif">"A very little key will open a very heavy door."</p>
                <p className="text-[11px] text-gray-700 font-medium mt-0.5">- Charles Dickens</p>
              </div>
              <h3 className="text-base font-bold mb-2">Công việc hôm nay</h3>
              <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded border-2 border-gray-600" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 leading-snug">
                    Nộp báo cáo môn học Lập trình trên thiết bị di động
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-1 font-medium">Hết hạn: 31/08/2025, 11:55 PM</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">Đồ án Flutter - Dart</p>
                </div>
                <Trash2 className="w-4 h-4 text-red-500" />
              </div>
              <div className="absolute bottom-5 right-5 w-12 h-12 rounded-2xl bg-[#EADDFF] text-[#21005D] shadow-md flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
            </div>
            {/* Toast */}
            <div className="absolute bottom-0 inset-x-0 bg-[#1976D2] text-white px-4 py-3 rounded-t-xl flex items-center gap-2 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Đã cập nhật công việc.</span>
            </div>
          </div>
        </div>

        {/* --- SCREEN 3: Delete Confirmation Dialog --- */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wider">
            3. Xác nhận xóa công việc (Modal Dialog)
          </span>
          <div className="w-[340px] h-[700px] rounded-[40px] bg-white ring-8 ring-neutral-800 shadow-2xl overflow-hidden relative border border-neutral-700 flex flex-col text-gray-900">
            <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between text-black text-xs font-semibold select-none">
              <span>3:43</span>
              <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto" />
              <span>5G 100%</span>
            </div>
            <div className="flex-1 p-5 pb-20 relative flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between pb-3">
                <h1 className="text-xl font-bold">My Tasks</h1>
                <LogOut className="w-5 h-5 text-gray-800" />
              </div>
              <h2 className="text-xl font-bold mb-3">Chào, Lê Văn Tuấn!</h2>
              <div className="bg-[#e7f1fb] rounded-2xl py-3 px-3 text-center mb-4">
                <p className="text-xs italic text-gray-800 font-serif">"A very little key will open a very heavy door."</p>
                <p className="text-[11px] text-gray-700 font-medium mt-0.5">- Charles Dickens</p>
              </div>
              <h3 className="text-base font-bold mb-2">Công việc hôm nay</h3>
              <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm flex items-start gap-3 mb-4">
                <div className="mt-0.5 w-5 h-5 rounded border-2 border-gray-600" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 leading-snug">CHECK MAIL</h4>
                  <p className="text-[11px] text-gray-600 mt-1 font-medium">Hết hạn: 28/08/2025, 04:30 PM</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">- Mail báo cáo tháng<br/>- Mail gửi nhắn lọc hệ thống</p>
                </div>
                <Trash2 className="w-4 h-4 text-red-500" />
              </div>
              {/* Dialog overlay in place */}
              <div className="bg-white rounded-2xl p-5 shadow-2xl border border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-2">Xác nhận xóa</h3>
                <p className="text-xs text-gray-700 mb-4">
                  Bạn có chắc chắn muốn xóa công việc "CHECK MAIL" không?
                </p>
                <div className="flex justify-end gap-3 text-xs font-bold">
                  <span className="text-[#6750A4] px-2 py-1">Hủy</span>
                  <span className="text-red-600 px-2 py-1">Xóa</span>
                </div>
              </div>
              <div className="absolute bottom-5 right-5 w-12 h-12 rounded-2xl bg-[#EADDFF] text-[#21005D] shadow-md flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* --- SCREEN 4: Delete Success Toast (Red Toast) --- */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wider">
            4. Đã xóa công việc (Red Toast)
          </span>
          <div className="w-[340px] h-[700px] rounded-[40px] bg-white ring-8 ring-neutral-800 shadow-2xl overflow-hidden relative border border-neutral-700 flex flex-col text-gray-900">
            <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between text-black text-xs font-semibold select-none">
              <span>3:43</span>
              <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto" />
              <span>5G 100%</span>
            </div>
            <div className="flex-1 p-5 pb-20 relative flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between pb-3">
                <h1 className="text-xl font-bold">My Tasks</h1>
                <LogOut className="w-5 h-5 text-gray-800" />
              </div>
              <h2 className="text-xl font-bold mb-3">Chào, Lê Văn Tuấn!</h2>
              <div className="bg-[#e7f1fb] rounded-2xl py-3 px-3 text-center mb-4">
                <p className="text-xs italic text-gray-800 font-serif">"A very little key will open a very heavy door."</p>
                <p className="text-[11px] text-gray-700 font-medium mt-0.5">- Charles Dickens</p>
              </div>
              <h3 className="text-base font-bold mb-2">Công việc hôm nay</h3>
              <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded border-2 border-gray-600" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 leading-snug">
                    Nộp báo cáo môn học Lập trình trên thiết bị di động
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-1 font-medium">Hết hạn: 31/08/2025, 11:55 PM</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">Đồ án Flutter - Dart</p>
                </div>
                <Trash2 className="w-4 h-4 text-red-500" />
              </div>
              <div className="absolute bottom-5 right-5 w-12 h-12 rounded-2xl bg-[#EADDFF] text-[#21005D] shadow-md flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
            </div>
            {/* Toast */}
            <div className="absolute bottom-0 inset-x-0 bg-[#D32F2F] text-white px-4 py-3 rounded-t-xl flex items-center gap-2 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Đã xóa công việc: "CHECK MAIL"</span>
            </div>
          </div>
        </div>

        {/* --- SCREEN 5: Date Picker Modal View --- */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-wider">
            5. Bộ chọn ngày (Material Date Picker)
          </span>
          <div className="w-[340px] h-[700px] rounded-[40px] bg-white ring-8 ring-neutral-800 shadow-2xl overflow-hidden relative border border-neutral-700 flex flex-col text-gray-900">
            <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between text-black text-xs font-semibold select-none">
              <span>3:42</span>
              <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto" />
              <span>5G 100%</span>
            </div>
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <ChevronLeft className="w-5 h-5" />
              <h2 className="font-bold text-sm">Thêm công việc mới</h2>
            </div>
            {/* Overlay Date Picker */}
            <div className="flex-1 bg-black/30 p-4 flex items-center justify-center">
              <div className="w-full bg-[#f8f9fe] rounded-3xl p-4 shadow-xl border border-gray-200">
                <p className="text-[10px] font-bold text-[#6750A4]">Select date</p>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-medium text-gray-900">Thu, Aug 28</h3>
                  <Edit2 className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span>August 2025</span>
                  <div className="flex gap-1">
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                {/* Calendar Mini Grid */}
                <div className="grid grid-cols-7 text-[10px] text-center font-bold text-gray-500 mb-1">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>
                <div className="grid grid-cols-7 text-[10px] gap-y-1 text-center font-medium">
                  <span/><span/><span/><span/><span/><span>1</span><span>2</span>
                  <span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
                  <span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span>
                  <span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span>
                  <span>24</span><span>25</span><span>26</span><span className="border border-purple-600 rounded-full text-purple-700">27</span><span className="bg-[#6750A4] text-white rounded-full font-bold">28</span><span>29</span><span>30</span>
                  <span>31</span>
                </div>
                <div className="flex justify-end gap-3 mt-4 text-xs font-bold text-[#6750A4]">
                  <span>Cancel</span>
                  <span>OK</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SCREEN 6: Time Picker Modal View --- */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-pink-400 mb-2 uppercase tracking-wider">
            6. Bộ chọn giờ (Material Time Picker)
          </span>
          <div className="w-[340px] h-[700px] rounded-[40px] bg-white ring-8 ring-neutral-800 shadow-2xl overflow-hidden relative border border-neutral-700 flex flex-col text-gray-900">
            <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between text-black text-xs font-semibold select-none">
              <span>3:42</span>
              <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto" />
              <span>5G 100%</span>
            </div>
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <ChevronLeft className="w-5 h-5" />
              <h2 className="font-bold text-sm">Thêm công việc mới</h2>
            </div>
            {/* Overlay Time Picker */}
            <div className="flex-1 bg-black/30 p-4 flex items-center justify-center">
              <div className="w-full bg-[#f8f9fe] rounded-3xl p-4 shadow-xl border border-gray-200">
                <p className="text-[10px] font-bold text-[#6750A4] mb-2">Select time</p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="w-12 h-12 bg-[#EADDFF] text-[#21005D] rounded-xl flex items-center justify-center text-2xl font-bold">
                    4
                  </span>
                  <span className="text-xl font-bold">:</span>
                  <span className="w-12 h-12 bg-gray-100 text-gray-800 rounded-xl flex items-center justify-center text-2xl font-bold">
                    30
                  </span>
                  <div className="flex flex-col border border-gray-300 rounded-lg text-[10px] font-bold ml-1">
                    <span className="px-2 py-0.5">AM</span>
                    <span className="px-2 py-0.5 bg-[#FFD8E4] text-[#31111D]">PM</span>
                  </div>
                </div>
                {/* Clock Dial Mock */}
                <div className="w-36 h-36 mx-auto rounded-full bg-[#ece6f0] flex items-center justify-center relative my-2">
                  <div className="w-2 h-2 rounded-full bg-[#6750A4]" />
                  <div className="absolute right-5 bottom-8 w-6 h-6 rounded-full bg-[#6750A4] text-white flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <span className="absolute top-2 text-[10px] font-bold text-gray-700">12</span>
                  <span className="absolute right-2 text-[10px] font-bold text-gray-700">3</span>
                  <span className="absolute bottom-2 text-[10px] font-bold text-gray-700">6</span>
                  <span className="absolute left-2 text-[10px] font-bold text-gray-700">9</span>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs font-bold text-[#6750A4]">
                  <Keyboard className="w-4 h-4 text-gray-600" />
                  <div className="flex gap-3">
                    <span>Cancel</span>
                    <span>OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SCREEN 7: Form Thêm Công Việc & Voice Palette --- */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wider">
            7. Màn hình Thêm công việc mới
          </span>
          <div className="w-[340px] h-[700px] rounded-[40px] bg-white ring-8 ring-neutral-800 shadow-2xl overflow-hidden relative border border-neutral-700 flex flex-col text-gray-900">
            <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between text-black text-xs font-semibold select-none">
              <span>3:39</span>
              <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto" />
              <span>5G 100%</span>
            </div>
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <ChevronLeft className="w-5 h-5" />
              <h2 className="font-bold text-sm">Thêm công việc mới</h2>
            </div>
            <div className="p-4 flex-1 space-y-4 relative">
              <fieldset className="border border-purple-600 rounded-xl p-2 pt-0.5">
                <legend className="text-[10px] font-bold text-purple-700 px-1">Tiêu đề</legend>
                <p className="text-xs text-gray-400">Nhập tiêu đề công việc|</p>
              </fieldset>
              <fieldset className="border border-gray-400 rounded-xl p-2 pt-0.5">
                <legend className="text-[10px] font-medium text-gray-600 px-1">Nội dung (không bắt buộc)</legend>
                <p className="text-xs text-gray-400">Nhập nội dung chi tiết (không bắt buộc)</p>
              </fieldset>
              <div className="flex gap-2">
                <div className="flex-1 py-2 rounded-full border border-purple-300 text-[11px] font-medium text-purple-900 text-center">
                  Chọn ngày
                </div>
                <div className="flex-1 py-2 rounded-full border border-purple-300 text-[11px] font-medium text-purple-900 text-center">
                  Chọn giờ
                </div>
              </div>
              <div className="py-2.5 rounded-full bg-[#EADDFF] text-[#21005D] font-bold text-xs text-center uppercase tracking-wider mt-4">
                LƯU CÔNG VIỆC
              </div>

              {/* Floating Voice Tool */}
              <div className="absolute left-2 bottom-4 bg-white/95 rounded-2xl shadow-xl border border-gray-200 p-1 flex flex-col items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-gray-700" />
                <Delete className="w-3.5 h-3.5 text-gray-700" />
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-purple-800" />
                </div>
                <Smile className="w-3.5 h-3.5 text-gray-700" />
                <span className="text-[9px] font-bold">VI</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SCREEN 8: Form Sửa Công Việc --- */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-teal-400 mb-2 uppercase tracking-wider">
            8. Màn hình Sửa công việc
          </span>
          <div className="w-[340px] h-[700px] rounded-[40px] bg-white ring-8 ring-neutral-800 shadow-2xl overflow-hidden relative border border-neutral-700 flex flex-col text-gray-900">
            <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between text-black text-xs font-semibold select-none">
              <span>3:39</span>
              <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto" />
              <span>5G 100%</span>
            </div>
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <ChevronLeft className="w-5 h-5" />
              <h2 className="font-bold text-sm">Sửa công việc</h2>
            </div>
            <div className="p-4 flex-1 space-y-4 relative">
              <fieldset className="border border-purple-600 rounded-xl p-2 pt-0.5">
                <legend className="text-[10px] font-bold text-purple-700 px-1">Tiêu đề</legend>
                <p className="text-xs font-medium text-gray-900">Báo cáo môn học Lập trình trên thiết bị di động</p>
              </fieldset>
              <fieldset className="border border-gray-400 rounded-xl p-2 pt-0.5">
                <legend className="text-[10px] font-medium text-gray-600 px-1">Nội dung (không bắt buộc)</legend>
                <p className="text-xs text-gray-800">Đồ án Flutter - Dart</p>
              </fieldset>
              <div className="flex gap-2">
                <div className="flex-1 py-2 rounded-full border border-purple-300 text-[11px] font-medium text-purple-900 text-center">
                  31/08/2025
                </div>
                <div className="flex-1 py-2 rounded-full border border-purple-300 text-[11px] font-medium text-purple-900 text-center">
                  11:55 PM
                </div>
              </div>
              <div className="py-2.5 rounded-full bg-[#EADDFF] text-[#21005D] font-bold text-xs text-center uppercase tracking-wider mt-4">
                LƯU THAY ĐỔI
              </div>

              {/* Floating Voice Tool */}
              <div className="absolute left-2 bottom-4 bg-white/95 rounded-2xl shadow-xl border border-gray-200 p-1 flex flex-col items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-gray-700" />
                <Delete className="w-3.5 h-3.5 text-gray-700" />
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-purple-800" />
                </div>
                <Smile className="w-3.5 h-3.5 text-gray-700" />
                <span className="text-[9px] font-bold">VI</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SCREEN 9: Empty Task State --- */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">
            9. Trạng thái không có công việc nào (Empty)
          </span>
          <div className="w-[340px] h-[700px] rounded-[40px] bg-white ring-8 ring-neutral-800 shadow-2xl overflow-hidden relative border border-neutral-700 flex flex-col text-gray-900">
            <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between text-black text-xs font-semibold select-none">
              <span>3:46</span>
              <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto" />
              <span>5G 100%</span>
            </div>
            <div className="flex-1 p-5 pb-20 relative flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between pb-3">
                <h1 className="text-xl font-bold">My Tasks</h1>
                <LogOut className="w-5 h-5 text-gray-800" />
              </div>
              <h2 className="text-xl font-bold mb-3">Chào, Lê Văn Tuấn!</h2>
              <div className="bg-[#e7f1fb] rounded-2xl py-3 px-3 text-center mb-4">
                <p className="text-xs italic text-gray-800 font-serif">"A very little key will open a very heavy door."</p>
                <p className="text-[11px] text-gray-700 font-medium mt-0.5">- Charles Dickens</p>
              </div>
              <h3 className="text-base font-bold mb-2">Công việc hôm nay</h3>
              <div className="flex-1 flex items-center justify-center text-center">
                <p className="text-xs font-medium text-gray-700">Tuyệt vời! Không có công việc nào.</p>
              </div>
              <div className="absolute bottom-5 right-5 w-12 h-12 rounded-2xl bg-[#EADDFF] text-[#21005D] shadow-md flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* --- SCREEN 10: Search, Filter & Sort in Action --- */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-wider">
            ★ Tìm kiếm, Lọc & Sắp xếp (Search, Filter, Sort)
          </span>
          <div className="w-[340px] h-[700px] rounded-[40px] bg-white ring-8 ring-neutral-800 shadow-2xl overflow-hidden relative border border-neutral-700 flex flex-col text-gray-900">
            <div className="bg-white px-6 pt-3 pb-1 flex items-center justify-between text-black text-xs font-semibold select-none">
              <span>3:46</span>
              <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto" />
              <span>5G 100%</span>
            </div>
            <div className="flex-1 p-5 pb-20 relative flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between pb-2">
                <h1 className="text-xl font-bold">My Tasks</h1>
                <LogOut className="w-5 h-5 text-gray-800" />
              </div>
              
              {/* Search Box with active query */}
              <div className="my-2 bg-gray-100 rounded-xl px-3 py-2 flex items-center gap-2 border border-[#6750A4]">
                <span className="text-[#6750A4] text-xs font-bold">🔍</span>
                <span className="text-xs font-bold text-gray-900 flex-1">báo cáo</span>
                <span className="text-[10px] bg-purple-200 text-purple-900 px-1.5 py-0.5 rounded-full font-bold">1 kết quả</span>
              </div>

              {/* Filter Chips & Sort */}
              <div className="flex items-center gap-1.5 mb-3 text-[11px]">
                <span className="px-2.5 py-1 rounded-full bg-[#6750A4] text-white font-bold">Chưa xong (1)</span>
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">Đã xong (0)</span>
                <span className="ml-auto text-[10px] bg-gray-100 px-2 py-1 rounded-md text-gray-700 font-semibold">⚡ Hạn chót</span>
              </div>

              <div className="bg-white rounded-2xl p-3.5 border-2 border-purple-200 shadow-sm flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded border-2 border-purple-600" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 leading-snug">
                    Nộp <mark className="bg-yellow-200 px-0.5 rounded">báo cáo</mark> môn học Lập trình trên thiết bị di động
                  </h4>
                  <p className="text-[11px] text-[#6750A4] mt-1 font-semibold">Hết hạn: 31/08/2025, 11:55 PM</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">Đồ án Flutter - Dart</p>
                </div>
                <Trash2 className="w-4 h-4 text-red-500" />
              </div>

              <div className="absolute bottom-5 right-5 w-12 h-12 rounded-2xl bg-[#EADDFF] text-[#21005D] shadow-md flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
