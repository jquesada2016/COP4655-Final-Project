export type task = {
    id: string;
    authorId?: string;
    assigneeId?: string;
    title: string;
    description?: string;
    urgency: string;
    completed?: boolean;
    reminder?: number;
    taskColor?: string;
};

export type assignableUser = {
    id: string;
    name: string;
};

export type listFilter =
    | "assignedToMe"
    | "owedTasks"
    | "completedByMe"
    | "completedByOthers";
