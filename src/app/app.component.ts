import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'schoolMag';

  currentUser: User;
  constructor(
      private router: Router,
      private loginService: LoginService,
      private permissionsService: NgxPermissionsService
  ) {
      this.loginService.currentUser.subscribe(x => this.currentUser = x);
      if(this.currentUser){
      this.permissionsService.addPermission(this.currentUser.role);
    }
  }

  logout() {
      this.loginService.logout();
      this.permissionsService.flushPermissions();
      this.router.navigate(['/']);
  }
}
