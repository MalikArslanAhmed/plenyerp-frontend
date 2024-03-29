import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'absoluteAmount'
})
export class AbsoluteAmountPipe implements PipeTransform {

    transform(value: any): any {

        if (value < 0) {
            return '(' + Math.abs(value) + ')'
        }

        return Math.abs(value);
    }

}
