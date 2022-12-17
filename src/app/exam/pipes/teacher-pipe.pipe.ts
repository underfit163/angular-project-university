import {Pipe, PipeTransform} from '@angular/core';
import {Teacher} from "../../entities/Teacher";

@Pipe({
  name: 'teacherPipe'
})
export class TeacherPipePipe implements PipeTransform {

  transform(value: number, teachers: Teacher[]): string | undefined {
    return teachers?.find(teacher => teacher.id == value)?.fio;
  }
}
