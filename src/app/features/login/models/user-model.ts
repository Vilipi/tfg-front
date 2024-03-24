export class UserModel {
    public id: number;
    public userType: string;
    public name: string;
    public email: string;
    public password: string;
    public boardsCreated: DataShowed[];
    public boardsFollowed: DataShowed[];
    public usersFollowed: DataShowed[];
    public token: string;
}

export class DataShowed {
    public id: number;
    public name: string;
}
