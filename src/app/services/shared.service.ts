import { Injectable } from '@angular/core';
import {
    format,
    addYears,
  } from 'date-fns';
  


@Injectable()
export class SharedService {

    public thisYear: string;
    public nextYear: string;
    

    
    public setYears(year:string) {
        let years= year.split('/');
        if(format(new Date(years[1]),'YYYY')==format(addYears(new Date(years[0]), 1),'YYYY')){
            localStorage.setItem('thisYear',years[0]);
            localStorage.setItem('nextYear',years[1]);
            
        }
        console.log(this.thisYear);
        console.log(this.nextYear)

    }
    
    public  getClassNumber(): string {
    return localStorage.getItem('classNumber') || ''
    }
   
    public setClassNumber(numb: string){
    try{
        if(0<parseInt(numb)&&parseInt(numb)<12){
            localStorage.setItem('classNumber',numb);
    }}catch (e){
            alert(e);
          }
    }


  constructor() { 
    this.thisYear = localStorage.getItem('thisYear') || '';
    this.nextYear =localStorage.getItem('nextYear') || '';
  }

  

}
