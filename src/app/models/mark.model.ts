import { Student } from './student.model';
import { Subject } from './subject.model';
export class Mark {
    date: string;
    mark: string;
    student: Student;
    subject: Subject;
  
    constructor(date: string, mark: string, student: Student, subject: Subject) {
      this.date = date;
      this.mark = mark;
      this.student = student;
      this.subject = subject;
    }
  }
