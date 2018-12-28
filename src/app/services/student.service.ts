import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable()
export class StudentService {

  private nextId: number;

  constructor() { 

  }

  public addStudent(name: string): void {
    let students = this.getStudents();
    if (students.length == 0) {
      this.nextId = 0;
    } else {
      let maxId = students[students.length-1].idStudent;
      this.nextId = maxId + 1;
    }
    let newStudent = new Student(this.nextId,name);
    
    students.push(newStudent);
    this.setLocalStorageStudents(students);

  }

  public getStudents(): Student[]{
    try{
    let localStorageItemStudents = JSON.parse(localStorage.getItem('students'));
    return localStorageItemStudents == null ? [] : localStorageItemStudents.students;
  } catch (e){
    alert(e);
  }

  }

  public removeStudent(idStudent: number) : void {

    let students = this.getStudents();
    students = students.filter(st=> st.idStudent != idStudent);
    this.setLocalStorageStudents(students);

  }
  private setLocalStorageStudents(students: Student[]) : void{
    try{
      localStorage.setItem('students',JSON.stringify({students: students}));
    } catch(e){
       alert("Ошибка при добавлении в локальное хранилище: "+e);
    }
  }

}
