import { TaskModel } from "./task-model";

export class BoardModel {
    creationDate: string;
    creatorUserId: number;
    creatorUser: string;
    id: number;
    isAvailable: boolean;
    isPublic: boolean;
    name: string;
    description: string;
    originalBoardId: number;
    points: number;
    startDate: string;
    timeLength: number;
    userId: number;
    tasks: TaskModel[];
    isLiked?: boolean = false;
}