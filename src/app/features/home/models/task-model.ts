export class TaskModel {
    id: number;
    name: string;
    description: string;
    creationDate: Date;
    isAvailable: boolean;
    isCompleted: boolean;
    status: string;
    boardId: number;
    userId: number;
    creatorUserId: number;
    creatorUser: string;
}