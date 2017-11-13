import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from '../contacts';

@Pipe({
  name: 'contactPhone'
})
export class ContactPhonePipe implements PipeTransform {

  transform(value: Contact, args?: any): any {
    if (value.phone.substring(0, 5) === '+358 ') {
      return '0' + value.phone.substring(value.phone.indexOf(' ') + 1, value.phone.length);
    }
    return value.phone;
  }
}
