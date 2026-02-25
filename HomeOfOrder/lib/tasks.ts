export type Task = {
    title: string;
    assignedTo?: string;
    dueDate?: Date;
};

export function createTask(title: string, assignedTo?: string, dueDate?: Date): Task {
    return {
        title,
        assignedTo,
        dueDate
    };
}