import {User} from '../models/user.model';

export class Subject {
    idSubject: number;
    name: string;
    user: User
    
    constructor(idSubject: number, name: string, user: User){
        this.idSubject = idSubject;
        this.name = name;
        this.user = user;
    }
}