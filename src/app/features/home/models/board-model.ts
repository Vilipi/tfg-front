import { TaskModel } from "./task-model";

export class BoardModel {
    id: number;
    name: string;
    creationDate: Date;
    startDate: Date;
    timeLength: number;
    endDate: Date;
    isTimeOver: boolean;
    creatorUserId: number;
    isAvailable: boolean;
    points: number;
    creatorUser: string;
    isPublic: boolean;
    userId: number;
    type: string;
    description: string;
    originalBoardId: number;
    tasks?: TaskModel[];
    isLiked?: boolean = false;
    followers?: number;
}