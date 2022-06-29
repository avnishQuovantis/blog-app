import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortend'
})
export class ShortendPipe implements PipeTransform{
  transform(value: any, length:Number) {
    if(value.length>length){
      return value.substring(0,length)+ "..."
    }
    return value
  }
  
}