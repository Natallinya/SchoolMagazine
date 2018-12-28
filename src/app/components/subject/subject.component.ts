import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service'
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user.model';
import { Subject } from '../../models/subject.model';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.sass']
})
export class SubjectComponent {

  public subjectName: string;
  currentUser: User;
  dataSource: Subject[];
  constructor(private subjectServices: SubjectService,private loginService : LoginService ) {
    this.loginService.currentUser.subscribe(x => this.currentUser = x);
    this.dataSource=this.getSubject();
   }
   displayedColumns = ["name"];
   addSubject(){
     this.subjectServices.addSubject(this.subjectName, this.currentUser);
     this.dataSource = this.getSubject();
   }
   getSubject() :Subject[]{
     if(this.currentUser.role=="Admin"){
       return this.subjectServices.getAllSubject();
     }else{
       return this.subjectServices.getSubjectByUserId(this.currentUser.id);
     }
   }

}
