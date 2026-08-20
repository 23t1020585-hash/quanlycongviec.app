interface DeleteConfirmDialogProps {
  taskTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmDialog({
  taskTitle,
  onCancel,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div
        id="delete-confirm-dialog"
        className="w-full max-w-[340px] bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-3">Xác nhận xóa</h3>
        <p className="text-sm text-gray-700 leading-relaxed mb-6">
          Bạn có chắc chắn muốn xóa công việc "{taskTitle}" không?
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            id="btn-cancel-delete"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-[#6750A4] hover:bg-purple-50 rounded-full transition-colors"
          >
            Hủy
          </button>
          <button
            id="btn-confirm-delete"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
