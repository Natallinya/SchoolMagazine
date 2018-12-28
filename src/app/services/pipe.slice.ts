import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
    name: 'slice'
})
export class SlicePipe implements PipeTransform {
  transform(value: string, args?: any): string {
     
   
    return value.split('.')[0];
  }
}