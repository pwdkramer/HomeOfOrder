import { createContext, useContext, useState } from "react";
import { Task, createTask, updateTask as updateTaskHelper } from "../lib/tasks";

type TasksContextType = {
  tasks: Task[];
  addTask: (
    title: string,
    opts?: { notes?: string; assignedTo?: string; dueDate?: string }
  ) => void;
  updateTask: (
    id: string,
    updates: Partial<{
      title: string;
      notes?: string;
      assignedTo?: string;
      dueDate?: string;
      completed: boolean;
    }>
  ) => void;
  toggleTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(
    title: string,
    opts?: { notes?: string; assignedTo?: string; dueDate?: string }
  ) {
    const newTask = createTask(title, opts);
    setTasks((prev) => [...prev, newTask]);
  }

  function updateTask(
    id: string,
    updates: Partial<{
      title: string;
      notes?: string;
      assignedTo?: string;
      dueDate?: string;
      completed: boolean;
    }>
  ) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? updateTaskHelper(t, updates) : t))
    );
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, toggleTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used inside TasksProvider");
  return ctx;
}