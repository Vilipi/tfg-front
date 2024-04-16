import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BoardModel } from "../models/board-model";


@Injectable({
    providedIn: 'root'
})

export class BoardFacade {

    private boardListFacade: BehaviorSubject<BoardModel[]> = new BehaviorSubject<BoardModel[]>([]);

    public getBoardListFacade(): Observable<BoardModel[]> {
        return this.boardListFacade.asObservable();
    }

    public setBoardListFacade(data: BoardModel[]): void {
        this.boardListFacade.next(data);
    }
}
