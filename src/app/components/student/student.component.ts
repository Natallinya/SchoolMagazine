import { Component, OnInit,Input} from '@angular/core';
import { StudentService } from '../../services/student.service';
import { MarkService } from '../../services/mark.service';
import { SharedService } from '../../services/shared.service';
import { SubjectService } from '../../services/subject.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from "@angular/router"; 
import { ActivatedRoute } from '@angular/router';
import {

  getMonth,
  getDaysInMonth,
} from 'date-fns';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.sass']
})

export class StudentComponent implements OnInit {

  dataSource = this.studentService.getStudents();
  public mask = [/[1-5]/];
  name: string;
  monthNumber: number;
  thisYear = this.sharedService.thisYear;
  nextYear = this.sharedService.nextYear;
  subjectObj = this.subjectService.getSubjectById(this.route.snapshot.params['id'])[0];
  allSubject = this.subjectService.getAllSubject();
  subjectName=this.subjectObj.name;
  subject: number = this.subjectObj.idSubject;
  year = this.thisYear + '/' + this.nextYear;
  montharr: Array<{month: string, number: number, year: string}> = [{month: "Сентябрь", number: 8, year: this.thisYear} ,{month: "Октябрь", number: 9, year: this.thisYear},{month: "Ноябрь", number: 10, year: this.thisYear},
            {month: "Декабрь", number: 11, year: this.thisYear},{month: "Январь", number: 0, year: this.nextYear},{month: "Февраль", number: 1, year: this.nextYear},
            {month: "Март", number: 2, year: this.nextYear},{month: "Апрель", number: 3, year: this.nextYear},{month: "Май", number: 4, year: this.nextYear}];
  selectedMonth  = getMonth(new Date()); //июнь, июль и август не учтены
          
  printCalendar(){
    var year = this.montharr.filter(t=>t.number==this.selectedMonth).map(a=>a.year)[0];
    var result = getDaysInMonth(new Date(+year, this.selectedMonth));
    var dateArr : Array<string>=[]; 
    for(var i=1; i<=result; i++){
      var mas = i+'.'+this.selectedMonth+'.'+year;
      dateArr.push(mas);
    }
    return dateArr;
  }

  column=['name'];
  columns = this.printCalendar();
  displayedColumns = this.column.concat(this.columns);
 
 
  constructor(private studentService: StudentService,
     private markService: MarkService, 
     private permissionsService: NgxPermissionsService,
      private router: Router,
      private route: ActivatedRoute,
      private sharedService: SharedService,
      private subjectService: SubjectService ) {
  
   }


addStudent(){
  this.studentService.addStudent(this.name);
  this.dataSource = this.studentService.getStudents();
}
getMark(idStudent: number, cIndex: number) : string{
 return this.markService.getMark( this.columns[cIndex],idStudent, this.subjectObj.idSubject);
}
changeMark(value: string,idStudent: number, cIndex: number){
  console.log(idStudent);
  
  let date=this.columns[cIndex];
  console.log(date);
  this.markService.editMark(date,value,idStudent,this.subjectObj);
}
out(){
  this.router.navigate(['']); 
}
goSubjectPage(){
 
  this.router.navigate(['/student/'+this.subject]); 
  location.reload();
}


getColumns(){
  this.columns=this.printCalendar();
  this.displayedColumns = this.column.concat(this.columns);
}


  ngOnInit() {
    let role = localStorage.getItem('role');
    this.permissionsService.addPermission(role);
  }


}
