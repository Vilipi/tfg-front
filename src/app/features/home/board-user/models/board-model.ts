import { BoardFollowerModel } from "./boards-follower-model";
import { TaskModel } from "./task-model";

export class BoardModel {
    public id: number;
    public owner: string;
    public boardName: string;
    public creationDate: Date;
    public boardType:string; //publico o privado
    public tasks: TaskModel[];
    public usersFollowing: BoardFollowerModel[];
    public ranking?: string[];
}
