export type Task = {
  id: string;
  title: string;
  notes?: string;
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
  completed: boolean;
};

export function createTask(
  title: string,
  opts?: { notes?: string; assignedTo?: string; dueDate?: string }
): Task {
  return {
    id: `${Date.now()}`,
    title,
    notes: opts?.notes,
    assignedTo: opts?.assignedTo,
    dueDate: opts?.dueDate,
    createdAt: new Date().toISOString(),
    completed: false,
  };
}