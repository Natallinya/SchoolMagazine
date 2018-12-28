import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TextMaskModule } from 'angular2-text-mask';

import {Routes, RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SlicePipe} from './services/pipe.slice';

import { registerBackend } from './helpers/registerBackend';
import { AuthGuard } from './helpers/authGuard';

import { StudentComponent } from './components/student/student.component';

import { StudentService } from './services/student.service';
import { MarkService } from './services/mark.service';
import { SharedService } from './services/shared.service';
import { SubjectService } from './services/subject.service';
import { SubjectComponent } from './components/subject/subject.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/home/register/register.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/home/login/login.component';

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'student/:id', component:  StudentComponent},
  { path: 'register', component:  RegisterComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'subject', component: SubjectComponent, canActivate: [AuthGuard] },
];


@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    SubjectComponent,
    SlicePipe,
    HomeComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NgxPermissionsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    TextMaskModule
  ],
  providers: [
    StudentService,
    SubjectService,
    MarkService,
    SharedService,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    registerBackend
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
