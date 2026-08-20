export const FLUTTER_DART_CODE = `// main.dart - Flutter / Dart Implementation of My Tasks
// Visual Studio Code - Dự án Môn học Lập trình trên thiết bị di động
// Sinh viên: Lê Văn Tuấn

import 'package:flutter/material.dart';

void main() {
  runApp(const MyTasksApp());
}

class MyTasksApp extends StatelessWidget {
  const MyTasksApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My Tasks',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6750A4),
          primary: const Color(0xFF6750A4),
          secondary: const Color(0xFFEADDFF),
        ),
        scaffoldBackgroundColor: Colors.white,
      ),
      home: const WelcomeScreen(),
    );
  }
}

class UserProfile {
  String name;
  String studentId;
  String role;

  UserProfile({
    this.name = 'Lê Văn Tuấn',
    this.studentId = '23T1020585 - Đồ án Flutter & Dart',
    this.role = 'Lập trình trên thiết bị di động',
  });
}

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  final _nameCtrl = TextEditingController(text: 'Lê Văn Tuấn');
  final _studentIdCtrl = TextEditingController(text: '23T1020585 - Đồ án Flutter & Dart');
  final _roleCtrl = TextEditingController(text: 'Lập trình trên thiết bị di động');
  String? _errorText;

  void _submit() {
    if (_nameCtrl.text.trim().isEmpty) {
      setState(() {
        _errorText = 'Vui lòng nhập họ và tên của bạn';
      });
      return;
    }

    final profile = UserProfile(
      name: _nameCtrl.text.trim(),
      studentId: _studentIdCtrl.text.trim(),
      role: _roleCtrl.text.trim(),
    );

    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => HomeScreen(userProfile: profile)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
          child: Column(
            children: [
              const SizedBox(height: 16),
              // App Icon / Logo
              Container(
                width: 72,
                height: 72,
                decoration: BoxDecoration(
                  color: const Color(0xFFEADDFF),
                  borderRadius: BorderRadius.circular(24),
                ),
                child: const Icon(Icons.check_circle_outline, size: 44, color: Color(0xFF6750A4)),
              ),
              const SizedBox(height: 16),
              const Text('Chào mừng đến với', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              const Text('My Tasks', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Color(0xFF6750A4))),
              const SizedBox(height: 6),
              const Text(
                'Quản lý công việc hàng ngày khoa học & hiệu quả',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 13, color: Colors.grey),
              ),
              const SizedBox(height: 28),

              // Inputs
              TextField(
                controller: _nameCtrl,
                decoration: InputDecoration(
                  labelText: 'Họ và tên của bạn *',
                  prefixIcon: const Icon(Icons.person, color: Color(0xFF6750A4)),
                  errorText: _errorText,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
              const SizedBox(height: 14),
              TextField(
                controller: _studentIdCtrl,
                decoration: InputDecoration(
                  labelText: 'Mã sinh viên / Lớp',
                  prefixIcon: const Icon(Icons.school, color: Colors.grey),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
              const SizedBox(height: 14),
              TextField(
                controller: _roleCtrl,
                decoration: InputDecoration(
                  labelText: 'Môn học / Dự án',
                  prefixIcon: const Icon(Icons.assignment, color: Colors.grey),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),

              const Spacer(),

              SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton.icon(
                  style: FilledButton.styleFrom(
                    backgroundColor: const Color(0xFF6750A4),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(26)),
                  ),
                  onPressed: _submit,
                  icon: const Icon(Icons.arrow_forward),
                  label: const Text('BẮT ĐẦU NGAY', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                ),
              ),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }
}

class Task {
  String id;
  String title;
  String description;
  String dueDate;
  String dueTime;
  bool isCompleted;

  Task({
    required this.id,
    required this.title,
    this.description = '',
    this.dueDate = '',
    this.dueTime = '',
    this.isCompleted = false,
  });
}

class HomeScreen extends StatefulWidget {
  final UserProfile? userProfile;
  const HomeScreen({super.key, this.userProfile});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final List<Task> _tasks = [
    Task(
      id: '1',
      title: 'Nộp báo cáo môn học Lập trình trên thiết bị di động',
      description: 'Đồ án Flutter - Dart',
      dueDate: '31/08/2025',
      dueTime: '11:55 PM',
      isCompleted: false,
    ),
    Task(
      id: '2',
      title: 'CHECK MAIL',
      description: '- Mail báo cáo tháng\\n- Mail gửi nhắn lọc hệ thống',
      dueDate: '28/08/2025',
      dueTime: '04:30 PM',
      isCompleted: false,
    ),
  ];

  String _searchQuery = '';
  String _filter = 'all'; // 'all', 'pending', 'completed'
  String _sortBy = 'newest'; // 'newest', 'dueDate', 'title'

  List<Task> get _filteredTasks {
    var list = _tasks.where((t) {
      if (_searchQuery.isNotEmpty) {
        final q = _searchQuery.toLowerCase();
        final matchTitle = t.title.toLowerCase().contains(q);
        final matchDesc = t.description.toLowerCase().contains(q);
        if (!matchTitle && !matchDesc) return false;
      }
      if (_filter == 'pending') return !t.isCompleted;
      if (_filter == 'completed') return t.isCompleted;
      return true;
    }).toList();

    if (_sortBy == 'title') {
      list.sort((a, b) => a.title.compareTo(b.title));
    } else if (_sortBy == 'dueDate') {
      list.sort((a, b) => a.dueDate.compareTo(b.dueDate));
    }
    return list;
  }

  void _showSnackBar(String message, Color bgColor) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(Icons.check_circle, color: Colors.white),
            const SizedBox(width: 8),
            Text(message),
          ],
        ),
        backgroundColor: bgColor,
        behavior: SnackBarBehavior.fixed,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
        ),
      ),
    );
  }

  void _confirmDelete(Task task) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        title: const Text('Xác nhận xóa', style: TextStyle(fontWeight: FontWeight.bold)),
        content: Text('Bạn có chắc chắn muốn xóa công việc "\${task.title}" không?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Hủy', style: TextStyle(color: Color(0xFF6750A4))),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              setState(() {
                _tasks.removeWhere((t) => t.id == task.id);
              });
              _showSnackBar('Đã xóa công việc: "\${task.title}"', const Color(0xFFD32F2F));
            },
            child: const Text('Xóa', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  void _navigateToForm([Task? task]) async {
    final result = await Navigator.push<Task>(
      context,
      MaterialPageRoute(
        builder: (context) => TaskFormScreen(taskToEdit: task),
      ),
    );

    if (result != null) {
      setState(() {
        if (task != null) {
          final index = _tasks.indexWhere((t) => t.id == task.id);
          if (index != -1) _tasks[index] = result;
          _showSnackBar('Đã cập nhật công việc.', const Color(0xFF1976D2));
        } else {
          _tasks.insert(0, result);
          _showSnackBar('Đã thêm công việc mới thành công!', const Color(0xFF2E7D32));
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Tasks', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const WelcomeScreen()),
              );
            },
          )
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 8),
              Text(
                'Chào, \${widget.userProfile?.name ?? "Lê Văn Tuấn"}!',
                style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              // Quote Box
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFFE7F1FB),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Column(
                  children: [
                    Text(
                      '"A very little key will open a very heavy door."',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontStyle: FontStyle.italic, fontSize: 13),
                    ),
                    SizedBox(height: 4),
                    Text('- Charles Dickens', style: TextStyle(fontWeight: FontWeight.w500, fontSize: 12)),
                  ],
                ),
              ),
              const SizedBox(height: 14),

              // Tìm kiếm (Search Bar)
              TextField(
                onChanged: (val) => setState(() => _searchQuery = val),
                decoration: InputDecoration(
                  hintText: 'Tìm kiếm công việc...',
                  prefixIcon: const Icon(Icons.search, size: 20),
                  isDense: true,
                  filled: true,
                  fillColor: Colors.grey.shade100,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: BorderSide.none,
                  ),
                ),
              ),
              const SizedBox(height: 8),

              // Lọc & Sắp xếp (Filter Chips & Sort)
              Row(
                children: [
                  ChoiceChip(
                    label: const Text('Tất cả'),
                    selected: _filter == 'all',
                    onSelected: (val) => setState(() => _filter = 'all'),
                  ),
                  const SizedBox(width: 6),
                  ChoiceChip(
                    label: const Text('Chưa xong'),
                    selected: _filter == 'pending',
                    onSelected: (val) => setState(() => _filter = 'pending'),
                  ),
                  const SizedBox(width: 6),
                  ChoiceChip(
                    label: const Text('Đã xong'),
                    selected: _filter == 'completed',
                    onSelected: (val) => setState(() => _filter = 'completed'),
                  ),
                  const Spacer(),
                  DropdownButton<String>(
                    value: _sortBy,
                    underline: const SizedBox(),
                    items: const [
                      DropdownMenuItem(value: 'newest', child: Text('Mới nhất', style: TextStyle(fontSize: 12))),
                      DropdownMenuItem(value: 'dueDate', child: Text('Hạn chót', style: TextStyle(fontSize: 12))),
                      DropdownMenuItem(value: 'title', child: Text('Tên A-Z', style: TextStyle(fontSize: 12))),
                    ],
                    onChanged: (val) => setState(() => _sortBy = val ?? 'newest'),
                  ),
                ],
              ),
              const SizedBox(height: 8),

              Expanded(
                child: _filteredTasks.isEmpty
                    ? const Center(child: Text('Không tìm thấy công việc phù hợp.'))
                    : ListView.builder(
                        itemCount: _filteredTasks.length,
                        itemBuilder: (context, index) {
                          final task = _filteredTasks[index];
                          return Card(
                            elevation: 0.5,
                            margin: const EdgeInsets.only(bottom: 12),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                              side: BorderSide(color: Colors.grey.shade200),
                            ),
                            child: ListTile(
                              onTap: () => _navigateToForm(task),
                              leading: Checkbox(
                                value: task.isCompleted,
                                activeColor: const Color(0xFF6750A4),
                                onChanged: (val) {
                                  setState(() => task.isCompleted = val ?? false);
                                },
                              ),
                              title: Text(
                                task.title,
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  decoration: task.isCompleted ? TextDecoration.lineThrough : null,
                                ),
                              ),
                              subtitle: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  if (task.dueDate.isNotEmpty)
                                    Padding(
                                      padding: const EdgeInsets.only(top: 4),
                                      child: Text('Hết hạn: \${task.dueDate}\${task.dueTime.isNotEmpty ? ", \${task.dueTime}" : ""}'),
                                    ),
                                  if (task.description.isNotEmpty)
                                    Padding(
                                      padding: const EdgeInsets.only(top: 4),
                                      child: Text(task.description),
                                    ),
                                ],
                              ),
                              trailing: IconButton(
                                icon: const Icon(Icons.delete_outline, color: Colors.red),
                                onPressed: () => _confirmDelete(task),
                              ),
                            ),
                          );
                        },
                      ),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFFEADDFF),
        foregroundColor: const Color(0xFF21005D),
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        onPressed: () => _navigateToForm(),
        child: const Icon(Icons.add, size: 28),
      ),
    );
  }
}

class TaskFormScreen extends StatefulWidget {
  final Task? taskToEdit;
  const TaskFormScreen({super.key, this.taskToEdit});

  @override
  State<TaskFormScreen> createState() => _TaskFormScreenState();
}

class _TaskFormScreenState extends State<TaskFormScreen> {
  late TextEditingController _titleCtrl;
  late TextEditingController _descCtrl;
  String _dueDate = '';
  String _dueTime = '';

  @override
  void initState() {
    super.initState();
    _titleCtrl = TextEditingController(text: widget.taskToEdit?.title ?? '');
    _descCtrl = TextEditingController(text: widget.taskToEdit?.description ?? '');
    _dueDate = widget.taskToEdit?.dueDate ?? '31/08/2025';
    _dueTime = widget.taskToEdit?.dueTime ?? '11:55 PM';
  }

  void _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2020),
      lastDate: DateTime(2030),
    );
    if (picked != null) {
      setState(() {
        _dueDate = '\${picked.day.toString().padLeft(2, "0")}/\${picked.month.toString().padLeft(2, "0")}/\${picked.year}';
      });
    }
  }

  void _pickTime() async {
    final picked = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.now(),
    );
    if (picked != null) {
      setState(() {
        _dueTime = picked.format(context);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final isEditing = widget.taskToEdit != null;
    return Scaffold(
      appBar: AppBar(
        title: Text(isEditing ? 'Sửa công việc' : 'Thêm công việc mới',
            style: const TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _titleCtrl,
              decoration: InputDecoration(
                labelText: 'Tiêu đề',
                hintText: 'Nhập tiêu đề công việc',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _descCtrl,
              maxLines: 4,
              decoration: InputDecoration(
                labelText: 'Nội dung (không bắt buộc)',
                hintText: 'Nhập nội dung chi tiết (không bắt buộc)',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: _pickDate,
                    icon: const Icon(Icons.calendar_today, size: 16),
                    label: Text(_dueDate.isEmpty ? 'Chọn ngày' : _dueDate),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: _pickTime,
                    icon: const Icon(Icons.access_time, size: 16),
                    label: Text(_dueTime.isEmpty ? 'Chọn giờ' : _dueTime),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: FilledButton(
                style: FilledButton.styleFrom(
                  backgroundColor: const Color(0xFFEADDFF),
                  foregroundColor: const Color(0xFF21005D),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                ),
                onPressed: () {
                  if (_titleCtrl.text.trim().isEmpty) return;
                  Navigator.pop(
                    context,
                    Task(
                      id: widget.taskToEdit?.id ?? DateTime.now().millisecondsSinceEpoch.toString(),
                      title: _titleCtrl.text.trim(),
                      description: _descCtrl.text.trim(),
                      dueDate: _dueDate,
                      dueTime: _dueTime,
                      isCompleted: widget.taskToEdit?.isCompleted ?? false,
                    ),
                  );
                },
                child: Text(
                  isEditing ? 'LƯU THAY ĐỔI' : 'LƯU CÔNG VIỆC',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`;
