import { format } from 'date-fns';

interface TaskProps {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function Task({ id, title, completed, dueDate, priority, onToggle, onDelete }: TaskProps) {
  const priorityColors = {
    low: 'bg-blue-900 text-blue-200',
    medium: 'bg-yellow-900 text-yellow-200',
    high: 'bg-red-900 text-red-200'
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-700">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-600 focus:ring-offset-gray-800"
        />
        <div className="flex-1">
          <h3 className={`text-lg ${completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-400">
            Due: {format(dueDate, 'MMM d, yyyy')}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-9 sm:ml-auto">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[priority]}`}>
          {priority}
        </span>
        <button
          onClick={() => onDelete(id)}
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
} 