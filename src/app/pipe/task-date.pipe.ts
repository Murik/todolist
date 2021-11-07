import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe implements PipeTransform {

  transform(date: Date | string | number , format: string = 'dd.MM.yyyy'): string | null {
  // transform(value: Date | string | number, format?: string = 'mediumDate'): string | null {
    // | date:'E, dd-MM-yyyy HH:mm:ss'
    // const DATE_SHORT = 'dd.MM.yyyy';

    if (date == null) {
      return 'No date'
    }

    date = new Date(date);
    const today = new Date().getDate();

    if (date.getDate() === today) {
      return 'Today';
    }
    if (date.getDate() === today - 1) {
      return 'Yesterday';
    }
    if (date.getDate() === today + 1) {
      return 'Tomorrow';
    }

    return new DatePipe('ru').transform(date, format);
  }

}
