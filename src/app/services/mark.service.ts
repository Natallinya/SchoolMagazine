import { Injectable } from '@angular/core';
import { Mark } from '../models/mark.model';
import { Subject } from '../models/subject.model'
import { StudentService } from '../services/student.service';


@Injectable()
export class MarkService {

  constructor(private studentService: StudentService ) { 
  
  }

  public addMark(date: string,mark: string, student: number, subject: Subject): void {
    if(mark!=''){
    let studentObj = this.studentService.getStudents().filter(p=>p.idStudent==student)[0];
    let newMark = new Mark(date,mark,studentObj,subject);
    let marks = this.getMarks();
    
    marks.push(newMark);
    this.setLocalStorageMarks(marks);
  }
  }

  public getMarks(): Mark[]{
  
    let localStorageItemMarks = JSON.parse(localStorage.getItem('marks'));
    return localStorageItemMarks== null ? [] : localStorageItemMarks.marks;

  }
  public getMark(date: string, idStudent: number, subjectId:number): string{
  
    let localStorageItemMarks  = this.getMarks();
    if(localStorageItemMarks!=null){
     let mark : Mark[] = localStorageItemMarks.filter(st=> st.date == date && st.student.idStudent==idStudent && st.subject.idSubject==subjectId);
     return mark.length == 0 ? "" : mark[0].mark;
   
    } return "";
   

  }

  public editMark(date: string, mark: string, student: number, subject: Subject){
    this.removeMark(date, student, subject.idSubject);
    
    this.addMark(date,mark,student,subject)

  }
  public removeMark(date: string, idStudent: number, idSubject: number) : void {

    let marks = this.getMarks();
    marks = marks.filter(st=> st.date != date || st.student.idStudent!=idStudent || st.subject.idSubject!=idSubject );
    this.setLocalStorageMarks(marks);

  }
  private setLocalStorageMarks(marks: Mark[]) : void{
    try{
      localStorage.setItem('marks',JSON.stringify({marks: marks}));
    } catch(e){
       alert("Ошибка при добавлении в локальное хранилище: "+e);
    }
  }

}
