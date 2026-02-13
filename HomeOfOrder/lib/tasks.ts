export type Task = {
    title: string;
    assignedTo?: string;
    dueDate?: Date;
};

export function createTask(title: string): Task {
    return {
        title,
    };
}