import { useState, useEffect } from 'react';
import { LogOut, Plus, Smartphone, Monitor, Edit3, Grid, Code, Copy, Check, Download, Sparkles, SearchX, Volume2, VolumeX, RotateCw, CheckCircle, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Task, ToastMessage, UserProfile, FilterType, SortType, PhoneFrameStyle, AppTheme } from './types';
import { INITIAL_TASKS } from './data/initialData';
import TaskCard from './components/TaskCard';
import QuoteCard from './components/QuoteCard';
import TaskFormScreen from './components/TaskFormScreen';
import WelcomeScreen from './components/WelcomeScreen';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';
import Snackbar from './components/Snackbar';
import TaskFilterBar from './components/TaskFilterBar';
import MobileStatusBar from './components/MobileStatusBar';
import StatsDashboard from './components/StatsDashboard';
import AllScreensPreview from './components/AllScreensPreview';
import { FLUTTER_DART_CODE } from './flutter_code';
import { Sound } from './utils/soundEffects';

export default function App() {
  // Task State with localStorage persistence
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('mytasks_data_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_TASKS;
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('mytasks_profile_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      name: 'Lê Văn Tuấn',
      studentId: '23T1020585 - Flutter & Dart',
      role: 'Lập trình trên thiết bị di động',
    };
  });

  // App Navigation View: 'welcome' | 'home' | 'form'
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'home' | 'form'>('home');
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Phone Frame & Device Settings
  const [phoneFrame, setPhoneFrame] = useState<PhoneFrameStyle>('iphone');
  const [appTheme, setAppTheme] = useState<AppTheme>('purple');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search, Filter & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [activeSort, setActiveSort] = useState<SortType>('newest');

  // Dialog & Toast States
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Preview Mode: 'mobile' (framed) | 'full' (desktop-responsive) | 'showcase' (all preview screens)
  const [viewMode, setViewMode] = useState<'mobile' | 'full' | 'showcase'>('mobile');
  
  // VS Code export modal
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Save tasks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mytasks_data_v2', JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  // Save user profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mytasks_profile_v2', JSON.stringify(userProfile));
    } catch {
      // ignore
    }
  }, [userProfile]);

  // Show auto-dismissing toast
  const showToast = (message: string, type: ToastMessage['type']) => {
    const newToast = { id: String(Date.now()), message, type };
    setToast(newToast);
    setTimeout(() => {
      setToast((prev) => (prev?.id === newToast.id ? null : prev));
    }, 3000);
  };

  const handleToggleSound = () => {
    const newMuted = Sound.toggleMute();
    setSoundEnabled(!newMuted);
    if (!newMuted) {
      Sound.playSuccess();
    }
  };

  const handlePullRefresh = () => {
    Sound.playTap();
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      Sound.playSuccess();
      showToast('Đã đồng bộ dữ liệu mới nhất!', 'info');
    }, 600);
  };

  // Filter & Sort Calculation
  const filteredAndSortedTasks = tasks
    .filter((task) => {
      // 1. Search Query filter (matches title or description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }

      // 2. Category / Status filter
      if (activeFilter === 'pending') return !task.completed;
      if (activeFilter === 'completed') return task.completed;
      if (activeFilter === 'high_priority') return task.priority === 'high';
      if (activeFilter === 'study') return task.category === 'study';
      if (activeFilter === 'work') return task.category === 'work';
      return true;
    })
    .sort((a, b) => {
      if (activeSort === 'newest') return (b.createdAt || 0) - (a.createdAt || 0);
      if (activeSort === 'oldest') return (a.createdAt || 0) - (b.createdAt || 0);
      if (activeSort === 'titleAsc') return a.title.localeCompare(b.title, 'vi');
      if (activeSort === 'dueDate') {
        const parseDate = (d: string) => {
          if (!d) return 0;
          const parts = d.split('/');
          if (parts.length === 3) {
            return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])).getTime();
          }
          return 0;
        };
        return parseDate(a.dueDate) - parseDate(b.dueDate);
      }
      return 0;
    });

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
    high_priority: tasks.filter((t) => t.priority === 'high').length,
    today: tasks.filter((t) => !t.completed).length,
  };

  // Task Actions
  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleOpenAddForm = () => {
    Sound.playTap();
    setTaskToEdit(null);
    setCurrentScreen('form');
  };

  const handleOpenEditForm = (task: Task) => {
    setTaskToEdit(task);
    setCurrentScreen('form');
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (taskToEdit) {
      // Update existing task
      setTasks((prev) =>
        prev.map((t) => (t.id === taskToEdit.id ? { ...t, ...taskData } : t))
      );
      setCurrentScreen('home');
      showToast('Đã cập nhật công việc.', 'update');
    } else {
      // Create new task
      const newTask: Task = {
        id: `task-${Date.now()}`,
        ...taskData,
        createdAt: Date.now(),
      };
      setTasks((prev) => [newTask, ...prev]);
      setCurrentScreen('home');
      showToast('Đã thêm công việc mới thành công!', 'success');
    }
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    const deletedTitle = taskToDelete.title;
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    setTaskToDelete(null);
    showToast(`Đã xóa công việc: "${deletedTitle}"`, 'delete');
  };

  const handleResetData = () => {
    Sound.playTap();
    if (window.confirm('Đăng xuất và quay lại màn hình Chào mừng?')) {
      setCurrentScreen('welcome');
      showToast('Đã chuyển sang màn hình Chào mừng.', 'info');
    }
  };

  const handleWelcomeComplete = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    setCurrentScreen('home');
    Sound.playSuccess();
    showToast(`Chào mừng ${newProfile.name} trở lại!`, 'success');
  };

  const handleCopyCode = () => {
    Sound.playTap();
    navigator.clipboard.writeText(FLUTTER_DART_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    Sound.playTap();
    const blob = new Blob([FLUTTER_DART_CODE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'main.dart';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (viewMode === 'showcase') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        {/* Top Header Controls */}
        <div className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-base">My Tasks - Tất cả bản xem trước</span>
            <span className="text-xs bg-purple-900 text-purple-200 px-2 py-0.5 rounded-full font-medium">
              10 Màn hình chi tiết
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCodeModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold shadow transition-all"
            >
              <Code className="w-4 h-4" />
              Mã nguồn VS Code (main.dart)
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow transition-all"
            >
              <Smartphone className="w-4 h-4" />
              Chế độ tương tác trực tiếp
            </button>
          </div>
        </div>

        {/* Gallery */}
        <AllScreensPreview />

        {/* VS Code Source Modal */}
        {showCodeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Code className="w-5 h-5 text-emerald-400" />
                    Mã nguồn Visual Studio Code (Flutter / Dart - main.dart)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Dự án môn học: Lập trình trên thiết bị di động (Đồ án Flutter - Dart)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Đã sao chép!' : 'Sao chép mã'}
                  </button>
                  <button
                    onClick={handleDownloadCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Tải main.dart
                  </button>
                  <button
                    onClick={() => setShowCodeModal(false)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <pre className="flex-1 p-4 bg-slate-950 text-slate-200 text-xs font-mono overflow-auto leading-relaxed selection:bg-purple-800">
                <code>{FLUTTER_DART_CODE}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-2 sm:p-5 overflow-x-hidden font-sans">
      {/* Top Bar Switcher (Mobile Mockup vs Full Screen vs All Previews Gallery) */}
      <header className="w-full max-w-md md:max-w-4xl mb-3 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-sm">My Tasks Mobile</span>
          <span className="text-[11px] text-purple-200 bg-purple-900/60 border border-purple-700/50 px-2 py-0.5 rounded-full font-medium">
            {userProfile.name}
          </span>
        </div>

        {/* Device Frame Style & Sound Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={handleToggleSound}
            className={`p-1.5 rounded-lg transition-colors ${
              soundEnabled ? 'text-purple-400 bg-purple-950/60' : 'text-slate-500 hover:text-slate-300'
            }`}
            title={soundEnabled ? 'Hiệu ứng âm thanh: BẬT' : 'Hiệu ứng âm thanh: TẮT'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setPhoneFrame((prev) => (prev === 'iphone' ? 'android' : 'iphone'))}
            className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Đổi kiểu khung điện thoại (iPhone Dynamic Island / Android Punch-hole)"
          >
            {phoneFrame === 'iphone' ? '📱 iOS Island' : '🤖 Android'}
          </button>

          <button
            onClick={() => setCurrentScreen('welcome')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              currentScreen === 'welcome'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Màn hình chào mừng (Điền thông tin)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Màn chào mừng
          </button>

          <button
            onClick={() => {
              if (currentScreen === 'welcome') setCurrentScreen('home');
              setViewMode('mobile');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'mobile' && currentScreen !== 'welcome'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Khung điện thoại
          </button>

          <button
            onClick={() => {
              if (currentScreen === 'welcome') setCurrentScreen('home');
              setViewMode('full');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'full' && currentScreen !== 'welcome'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Mở rộng
          </button>

          <button
            onClick={() => setViewMode('showcase')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-purple-700 to-indigo-700 text-white hover:brightness-110 shadow-sm transition-all"
          >
            <Grid className="w-3.5 h-3.5" />
            Tất cả bản xem trước
          </button>

          <button
            onClick={() => setShowCodeModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-700 hover:bg-emerald-600 text-white transition-all"
            title="Xem file Visual Studio Code"
          >
            <Code className="w-3.5 h-3.5" />
            File VS Code
          </button>
        </div>
      </header>

      {/* Main Phone Device Shell */}
      <motion.div
        layout
        className={`w-full transition-all duration-300 ${
          viewMode === 'mobile'
            ? 'max-w-[390px] h-[830px] rounded-[48px] ring-[12px] ring-neutral-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden relative border border-neutral-700/80 bg-white flex flex-col'
            : 'max-w-xl min-h-[660px] rounded-3xl shadow-2xl overflow-hidden relative border border-slate-800 bg-white flex flex-col'
        }`}
      >
        {/* Mobile Status Bar with Live Clock & Dynamic Island */}
        {viewMode === 'mobile' && (
          <MobileStatusBar
            frameStyle={phoneFrame}
            theme={appTheme}
            onToggleTheme={() => setAppTheme((t) => (t === 'dark' ? 'purple' : 'dark'))}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            activeTaskCount={taskCounts.pending}
          />
        )}

        {/* Inner Screen Content with smooth animations */}
        <div className="flex-1 bg-white flex flex-col overflow-y-auto text-gray-900 relative">
          <AnimatePresence mode="wait">
            {currentScreen === 'welcome' ? (
              <WelcomeScreen
                key="welcome-screen"
                initialProfile={userProfile}
                onContinue={handleWelcomeComplete}
                onSkip={() => setCurrentScreen('home')}
              />
            ) : currentScreen === 'home' ? (
              <motion.div
                key="home-screen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col p-4 sm:p-5 pb-24 relative"
              >
                {/* App Top Bar */}
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-gray-900">
                      My Tasks
                    </h1>
                    {userProfile.studentId && (
                      <p className="text-[11px] text-gray-500 font-semibold truncate max-w-[210px]">
                        {userProfile.studentId}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePullRefresh}
                      className={`p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors ${
                        isRefreshing ? 'animate-spin text-[#6750A4]' : ''
                      }`}
                      title="Đồng bộ / Làm mới"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        Sound.playTap();
                        setCurrentScreen('welcome');
                      }}
                      className="p-2 rounded-full hover:bg-gray-100 text-[#6750A4] transition-colors"
                      title="Đổi thông tin cá nhân"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      id="btn-logout-reset"
                      onClick={handleResetData}
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-800 transition-colors"
                      title="Đăng xuất / Quay lại chào mừng"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Greeting */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 group">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Chào, {userProfile.name}! 👋
                    </h2>
                  </div>
                </div>

                {/* Stats & Daily Progress Dashboard */}
                <StatsDashboard tasks={tasks} userName={userProfile.name} />

                {/* Quote Card */}
                <div className="mb-3">
                  <QuoteCard />
                </div>

                {/* Task Management Toolbar: Search, Filter & Sort */}
                <TaskFilterBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  activeSort={activeSort}
                  onSortChange={setActiveSort}
                  counts={taskCounts}
                />

                {/* Section Header */}
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                    {activeFilter === 'pending'
                      ? 'Công việc chưa hoàn thành'
                      : activeFilter === 'completed'
                      ? 'Công việc đã hoàn thành'
                      : activeFilter === 'high_priority'
                      ? 'Công việc ưu tiên gấp'
                      : 'Danh sách công việc'}
                  </h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#6750A4]">
                    {filteredAndSortedTasks.length} / {tasks.length}
                  </span>
                </div>

                {/* Task List with motion transitions */}
                {tasks.length === 0 ? (
                  <div
                    id="empty-task-state"
                    className="flex-1 flex flex-col items-center justify-center py-14 text-center"
                  >
                    <p className="text-sm font-medium text-gray-600">
                      Tuyệt vời! Không có công việc nào.
                    </p>
                    <button
                      onClick={() => {
                        Sound.playSuccess();
                        setTasks(INITIAL_TASKS);
                      }}
                      className="mt-3 text-xs text-purple-600 font-semibold hover:underline"
                    >
                      Tải lại danh sách mẫu
                    </button>
                  </div>
                ) : filteredAndSortedTasks.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-10 text-center bg-gray-50/70 rounded-2xl border border-dashed border-gray-200 p-6 my-2">
                    <SearchX className="w-9 h-9 text-gray-400 mb-2" />
                    <p className="text-sm font-bold text-gray-800">
                      Không tìm thấy công việc phù hợp
                    </p>
                    <p className="text-xs text-gray-500 mt-1 max-w-[240px]">
                      {searchQuery
                        ? `Không có kết quả cho từ khóa "${searchQuery}"`
                        : 'Không có công việc trong danh mục này'}
                    </p>
                    <button
                      onClick={() => {
                        Sound.playTap();
                        setSearchQuery('');
                        setActiveFilter('all');
                      }}
                      className="mt-3 px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-[#6750A4] text-xs font-semibold rounded-lg transition-colors"
                    >
                      Xóa bộ lọc & tìm kiếm
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <AnimatePresence>
                      {filteredAndSortedTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onToggleComplete={handleToggleComplete}
                          onEdit={handleOpenEditForm}
                          onDeleteRequest={(t) => setTaskToDelete(t)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* Floating Action Button (FAB) with elastic spring bounce */}
                <motion.button
                  whileHover={{ scale: 1.08, rotate: 90 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  id="btn-fab-add"
                  onClick={handleOpenAddForm}
                  className="fixed bottom-6 right-6 sm:absolute sm:bottom-6 sm:right-6 w-14 h-14 rounded-2xl bg-[#EADDFF] hover:bg-[#d8cce8] text-[#21005D] shadow-xl ring-4 ring-purple-100/60 flex items-center justify-center transition-shadow z-30 cursor-pointer"
                  title="Thêm công việc mới"
                >
                  <Plus className="w-7 h-7 stroke-[2.8]" />
                </motion.button>
              </motion.div>
            ) : (
              <TaskFormScreen
                key="form-screen"
                taskToEdit={taskToEdit}
                onBack={() => setCurrentScreen('home')}
                onSave={handleSaveTask}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Delete Confirmation Dialog Modal */}
        {taskToDelete && (
          <DeleteConfirmDialog
            taskTitle={taskToDelete.title}
            onCancel={() => setTaskToDelete(null)}
            onConfirm={handleConfirmDelete}
          />
        )}

        {/* Snackbar notification at bottom */}
        <Snackbar toast={toast} onDismiss={() => setToast(null)} />

        {/* Mobile Bottom Home Indicator Bar (Swipe home pill) */}
        {viewMode === 'mobile' && (
          <div className="bg-white py-1.5 flex justify-center z-30 select-none">
            <div className="w-32 h-1 bg-black/80 rounded-full" />
          </div>
        )}
      </motion.div>

      {/* VS Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-emerald-400" />
                  Mã nguồn Visual Studio Code (Flutter / Dart - main.dart)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dự án: Lập trình trên thiết bị di động (Đồ án Flutter - Dart)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Đã sao chép!' : 'Sao chép mã'}
                </button>
                <button
                  onClick={handleDownloadCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Tải main.dart
                </button>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>
            </div>
            <pre className="flex-1 p-4 bg-slate-950 text-slate-200 text-xs font-mono overflow-auto leading-relaxed selection:bg-purple-800">
              <code>{FLUTTER_DART_CODE}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
