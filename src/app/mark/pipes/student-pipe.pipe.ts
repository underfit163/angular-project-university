import { Pipe, PipeTransform } from '@angular/core';
import {Student} from "../../entities/Student";

@Pipe({
  name: 'studentPipe'
})
export class StudentPipePipe implements PipeTransform {

  transform(value: number, students: Student[]): string | undefined {
    return students?.find(student => student.id == value)?.fio;
  }
}
