import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'underscoreSeparate'
})
export class UnderscoreSeparatePipe implements PipeTransform {
  transform(value: any): any {
    return value ? value.replace(/_/g, ' ') : '';
  }
}
