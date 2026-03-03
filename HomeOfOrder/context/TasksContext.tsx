import { createContext, useContext, useState } from "react";
import { Task, createTask } from "../lib/tasks";

type TasksContextType = {
  tasks: Task[];
  addTask: (
    title: string,
    opts?: { notes?: string; assignedTo?: string; dueDate?: string }
  ) => void;
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

  return (
    <TasksContext.Provider value={{ tasks, addTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used inside TasksProvider");
  return ctx;
}