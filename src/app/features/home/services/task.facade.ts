import { BehaviorSubject, Observable } from "rxjs";
import { TaskModel } from "../models/task-model";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class TaskFacade {

    private taskListFacade: BehaviorSubject<TaskModel[]> = new BehaviorSubject<TaskModel[]>([]);

    public getTaskListFacadeFacade(): Observable<TaskModel[]> {
        return this.taskListFacade.asObservable();
    }

    public setTaskListFacade(data: TaskModel[]): void {
        this.taskListFacade.next(data);
    }

}
