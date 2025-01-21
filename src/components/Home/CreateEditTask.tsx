import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addTask, editTask, deleteTask } from '../../features/tasksSlice';
import { User } from 'firebase/auth';

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  id: null
}

const CreateEditTask: React.FC<Props> = ({ user, setUser, id }) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [taskForm, setTaskForm] = useState({ title: '', description: '', id: '' });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (taskForm.id) {
      dispatch(editTask(taskForm));
    } else {
      dispatch(addTask({ title: taskForm.title, description: taskForm.description }));
    }
    setTaskForm({ title: '', description: '', id: '' });
  };

  const handleEdit = (task: typeof taskForm) => {
    setTaskForm(task);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <div className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskForm.title}
          onChange={handleFormChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={taskForm.description}
          onChange={handleFormChange}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-blue text-black rounded"
        >
          {taskForm.id ? 'Edit Task' : 'Add Task'}
        </button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="mb-2 p-2 border rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(task)}
                className="mr-2 px-2 py-1 bg-green text-black rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="px-2 py-1 bg-red text-black rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateEditTask;
