import { useState } from 'react';
import Task from '../components/Task';

interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  projectId: string;
}

interface Project {
  id: string;
  name: string;
  color: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newProject, setNewProject] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isProjectListOpen, setIsProjectListOpen] = useState(false);

  const colors = [
    'bg-red-900 text-red-200', 'bg-blue-900 text-blue-200', 'bg-green-900 text-green-200', 
    'bg-yellow-900 text-yellow-200', 'bg-purple-900 text-purple-200', 'bg-pink-900 text-pink-200', 
    'bg-indigo-900 text-indigo-200', 'bg-gray-800 text-gray-200'
  ];

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.trim()) return;

    const project: Project = {
      id: Date.now().toString(),
      name: newProject,
      color: colors[projects.length % colors.length],
    };

    setProjects([...projects, project]);
    setNewProject('');
    setSelectedProject(project.id);
    setIsProjectListOpen(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim() || !selectedProject) return;

    const task: TaskItem = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      dueDate: new Date(),
      priority,
      projectId: selectedProject,
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

  const deleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
    setTasks(tasks.filter(t => t.projectId !== projectId));
    if (selectedProject === projectId) {
      setSelectedProject(null);
    }
  };

  const selectedProjectName = projects.find(p => p.id === selectedProject)?.name;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsProjectListOpen(!isProjectListOpen)}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center justify-between"
        >
          <span>{selectedProjectName || 'Select Project'}</span>
          <svg
            className={`w-5 h-5 transition-transform ${isProjectListOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className={`lg:col-span-1 ${isProjectListOpen ? 'block' : 'hidden lg:block'}`}>
          <form onSubmit={handleAddProject} className="mb-4">
            <input
              type="text"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              placeholder="New project name..."
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200 placeholder-gray-400 mb-2"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              Add Project
            </button>
          </form>

          <div className="space-y-2">
            {projects.map(project => (
              <div
                key={project.id}
                onClick={() => {
                  setSelectedProject(project.id);
                  setIsProjectListOpen(false);
                }}
                className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${
                  project.color
                } ${
                  selectedProject === project.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <span className="font-medium">{project.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProject(project.id);
                  }}
                  className="text-gray-300 hover:text-red-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          {selectedProject ? (
            <>
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
                {tasks
                  .filter(task => task.projectId === selectedProject)
                  .map(task => (
                    <Task
                      key={task.id}
                      {...task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                    />
                  ))}
                {tasks.filter(task => task.projectId === selectedProject).length === 0 && (
                  <p className="text-center text-gray-400 py-8">
                    No tasks in this project yet. Add your first task!
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400 py-8">
              Select a project or create a new one to manage tasks
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 