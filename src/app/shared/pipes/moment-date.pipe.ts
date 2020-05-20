import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args) {
      return moment(value).format(args);
    }
    return moment(value).format('DD-MM-YYYY, h:mm a');
  }

}
