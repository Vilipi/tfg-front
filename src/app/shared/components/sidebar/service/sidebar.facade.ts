import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SidebarFacade {
    private sidebarMyBoardsFacade: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private sidebarCommunityFacade: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public getMyBoardsSidebarFacade(): Observable<boolean> {
        return this.sidebarMyBoardsFacade.asObservable();
    }

    public setMyBoardsSidebarFacade(data: boolean): void {
        this.sidebarMyBoardsFacade.next(data);
    }

    public getCommunitySidebarFacade(): Observable<boolean> {
        return this.sidebarCommunityFacade.asObservable();
    }

    public setCommunitySidebarFacade(data: boolean): void {
        this.sidebarCommunityFacade.next(data);
    }
}
