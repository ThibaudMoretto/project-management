export type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    projectId: string;
};
export type CreateTaskData = Pick<Task, 'title' | 'description' | 'priority'>;
