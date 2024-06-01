import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LoginService } from '../../login/service/login.service';
import { Observable } from 'rxjs';
import { UserModel } from '../../login/models/user-model';
import { TaskModel } from '../models/task-model';
import { BoardModel } from '../models/board-model';


@Injectable({
    providedIn: 'root'
})
export class HomeService implements OnInit {

    api = "https://localhost:44369";
    userData: any;
    user: UserModel;

    constructor(private http: HttpClient, private loginService: LoginService) { }

    ngOnInit(): void {
    }

    //API TASKS
    getApiTasksfromBoard(boardId: any): Observable<any> {
        this.getLocalStorage();

        const data = `${this.user.email}:${this.user.password}`;
        const encodedCredentials = btoa(data);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Basic ${encodedCredentials}`
        });

        return this.http.get<any>(`${this.api}/boards/${boardId}/tasks/?userId=${this.user.id}`, { headers });
    }

    refreshApiBoards() {
        this.getLocalStorage();

        const data = `${this.user.email}:${this.user.password}`;
        const encodedCredentials = btoa(data);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Basic ${encodedCredentials}`
        });

        return this.http.get<any>(`${this.api}/boards/refresh?${this.user.id}`, { headers });

    }

    createApiTask(dataToCreate: TaskModel): Observable<any> {
        this.getLocalStorage();
        const data = `${this.user.email}:${this.user.password}`;
        const encodedCredentials = btoa(data);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Basic ${encodedCredentials}`
        });
        return this.http.post<any>(`${this.api}/user/${this.user.id}/board/${dataToCreate.boardId}/addtask`, dataToCreate, { headers });
    }

    updateApiTask(dataTosend: TaskModel): Observable<any> {
        this.getLocalStorage();
        const data = `${this.user.email}:${this.user.password}`;
        const encodedCredentials = btoa(data);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Basic ${encodedCredentials}`
        });

        return this.http.post<any>(`${this.api}/user/${this.user.id}/board/${dataTosend.boardId}/task/${dataTosend.id}/update`, dataTosend, { headers });
    }

    removeApiTask(taskId: number, boardId: number): Observable<any> {
        this.getLocalStorage();
        const data = `${this.user.email}:${this.user.password}`;
        const encodedCredentials = btoa(data);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Basic ${encodedCredentials}`
        });

        return this.http.delete<any>(`${this.api}/user/${this.user.id}/board/${boardId}/task/${taskId}/delete`, { headers });
    }


    // API BOARDS
    getMyApiBoards(): Observable<any> {
        this.getLocalStorage();

        const data = `${this.user.email}:${this.user.password}`;
        const encodedCredentials = btoa(data);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Basic ${encodedCredentials}`
        });

        return this.http.get<any>(`${this.api}/boards/${this.user.id}/all`, { headers });
    }

    createApiBoard(dataToCreate: BoardModel): Observable<any> {
        this.getLocalStorage();
        const data = `${this.user.email}:${this.user.password}`;
        const encodedCredentials = btoa(data);
    
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Basic ${encodedCredentials}`
        });
    
        return this.http.post<any>(`${this.api}/user/${this.user.id}/addboard`, dataToCreate, { headers });
    }

    updateApiBoard(dataTosend: BoardModel): Observable<any> {
        this.getLocalStorage();
        const data = `${this.user.email}:${this.user.password}`;
        const encodedCredentials = btoa(data);
    
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Basic ${encodedCredentials}`
        });
    
        return this.http.post<any>(`${this.api}/boards/${dataTosend.id}/update?userId=${this.user.id}`, dataTosend, { headers });
    }
    
    removeApiBoard(boardId: number): Observable<any> {
        this.getLocalStorage();
        const data = `${this.user.email}:${this.user.password}`;
        const encodedCredentials = btoa(data);
    
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Basic ${encodedCredentials}`
        });
    
        return this.http.delete<any>(`${this.api}/boards/${boardId}/remove?userId=${this.user.id}`, { headers });
    }

    getApiBoard(boardId: number): Observable<any> {
        this.getLocalStorage();
        const data = `${this.user.email}:${this.user.password}`;
        const encodedCredentials = btoa(data);
    
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Basic ${encodedCredentials}`
        });

        return this.http.get<any>(`${this.api}/boards/${boardId}?userId=${this.user.id}`, { headers });
    }

    // LOCAL STORAGE
    getLocalStorage() {
        const userData = localStorage.getItem('userData');
        if (userData) {
            this.user = JSON.parse(userData) as UserModel;
        }
    }
}
