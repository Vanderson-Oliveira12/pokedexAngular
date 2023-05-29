import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstUpperCase'
})
export class FirstUpperCasePipe implements PipeTransform {

  transform(value: string): unknown {
    if(value){
      let name = value.split("")[0].toUpperCase()
      let reamining_name = value.slice(1)

      return `${name}${reamining_name}`
    }
    return "";
  }

}
