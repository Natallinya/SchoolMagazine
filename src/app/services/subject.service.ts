import { Injectable } from '@angular/core';


import { User } from '../models/user.model';
import { Subject } from '../models/subject.model';

@Injectable()
export class SubjectService {

    private nextId: number;
    constructor() {

    }
    public addSubject(name: string, user: User){
        let subjects = this.getAllSubject();
        if (subjects.length == 0) {
          this.nextId = 0;
        } else {
          let maxId = subjects[subjects.length-1].idSubject;
          this.nextId = maxId + 1;
        }

        let newSubject = new Subject(this.nextId,name,user);
        
        subjects.push(newSubject);
        console.log(newSubject);
        this.setLocalStorageSubjects(subjects);

    }
    public getAllSubject(): Subject[]{
        try{
        let localStorageItemSubjects = JSON.parse(localStorage.getItem('subjects'));
        return localStorageItemSubjects == null ? [] : localStorageItemSubjects.subjects;
      } catch (e){
        alert(e);
      }   }
      getSubjectByUserId(id: number){
        let subjects = this.getAllSubject();
        return subjects.filter(x=>x.user.id==id);
      }
      getSubjectById(id: number){
        let subjects = this.getAllSubject();
        return subjects.filter(x=>x.idSubject==id);
      }
      private setLocalStorageSubjects(subjects: Subject[]) : void{
        try{
          localStorage.setItem('subjects',JSON.stringify({subjects: subjects}));
        } catch(e){
           alert("Ошибка при добавлении в локальное хранилище: "+e);
        }
      }
   
}