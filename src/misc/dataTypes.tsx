export type Task = {
    id: string,
    title: string,
    description: string,
    dueDate: Date,
    assignee: assignee,
    priorityLevel: 'low' | 'medium' | 'high',
    notes: string,
    status: 'pending' | 'in progress' | 'completed' | 'cancelled',
}

export type assignee = {userId: number, displayName: string}