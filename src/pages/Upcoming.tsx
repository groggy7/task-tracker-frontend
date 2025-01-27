import { useState } from 'react';
import Task from '../components/Task';
import { format, addDays } from 'date-fns';

interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
}

export default function Upcoming() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: TaskItem = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      dueDate: new Date(selectedDate),
      priority,
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Group tasks by date
  const groupedTasks = tasks.reduce((groups, task) => {
    const date = format(task.dueDate, 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
    return groups;
  }, {} as Record<string, TaskItem[]>);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Upcoming Tasks</h1>

      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200 placeholder-gray-400"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
              className="w-full sm:w-40 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full sm:w-32 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {Object.entries(groupedTasks)
          .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
          .map(([date, dateTasks]) => (
            <div key={date}>
              <h2 className="text-lg font-semibold text-gray-200 mb-3">
                {format(new Date(date), 'EEEE, MMMM d, yyyy')}
              </h2>
              <div className="space-y-3">
                {dateTasks.map(task => (
                  <Task
                    key={task.id}
                    {...task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            </div>
          ))}
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            No upcoming tasks. Plan ahead by adding tasks for future dates!
          </p>
        )}
      </div>
    </div>
  );
} 