import { ToastMessage } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface SnackbarProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export default function Snackbar({ toast }: SnackbarProps) {
  if (!toast) return null;

  // Background colors matching the screenshots:
  // Green for Added, Blue for Updated, Red for Deleted
  const bgClass =
    toast.type === 'success'
      ? 'bg-[#2E7D32]' // Green
      : toast.type === 'update'
      ? 'bg-[#1976D2]' // Blue
      : toast.type === 'delete'
      ? 'bg-[#D32F2F]' // Red
      : 'bg-gray-800';

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-4 pointer-events-none flex justify-center animate-in slide-in-from-bottom duration-200">
      <div
        id="app-snackbar"
        className={`w-full max-w-[420px] ${bgClass} text-white px-4 py-3.5 rounded-t-xl sm:rounded-xl shadow-lg flex items-center gap-2.5 pointer-events-auto transition-all`}
      >
        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-white" />
        <span className="text-sm font-medium tracking-wide leading-tight">
          {toast.message}
        </span>
      </div>
    </div>
  );
}
