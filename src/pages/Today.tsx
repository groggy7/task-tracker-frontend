import { useState } from 'react';
import Task from '../components/Task';

interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
}

export default function Today() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: TaskItem = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      dueDate: new Date(),
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

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Today's Tasks</h1>
        <span className="bg-blue-900 text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {tasks.filter(t => !t.completed).length} remaining
        </span>
      </div>

      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200 placeholder-gray-400"
          />
          <div className="flex gap-2">
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

      <div className="space-y-3">
        {tasks.map(task => (
          <Task
            key={task.id}
            {...task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            No tasks for today. Add a task to get started!
          </p>
        )}
      </div>
    </div>
  );
}