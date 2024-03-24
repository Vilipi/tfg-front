export class TaskModel {
    public id: number;
    public taskName: string;
    public description: string;
    public creationDate: Date;
    public isDone: boolean;
    public lastDayCompletionDate: Date;
    public hotStreak: boolean;
}
