import { Component, OnInit} from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SharedService } from '../../services/shared.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  disabled: boolean = true;
  thisYear: string;
  currentUser: User;
  thisClass: string;
  public mask = ['2','0',/\d/, /\d/, '/', '2','0', /\d/, /\d/];
  constructor(private loginService : LoginService, private sharedService : SharedService ) { 
    this.loginService.currentUser.subscribe(x => this.currentUser = x);
    this.thisYear = this.sharedService.thisYear+'/'+this.sharedService.nextYear;
    this.thisClass = this.sharedService.getClassNumber();
  }
  
   edit() {
    this.disabled =!this.disabled;
    console.log(this.disabled);
  }
  yearChange(value){
    this.sharedService.setYears(value);
  }
  classChange(value){
    this.sharedService.setClassNumber(value);
  }
  ngOnInit() {
  }
}
