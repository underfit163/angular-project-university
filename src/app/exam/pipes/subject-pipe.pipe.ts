import {Pipe, PipeTransform} from '@angular/core';
import {Subject} from "../../entities/Subject";

@Pipe({
  name: 'subjectPipe'
})
export class SubjectPipePipe implements PipeTransform {

  transform(value: number, subjects: Subject[]): string | undefined {
    return subjects?.find(subject => subject.id == value)?.subjectname;
  }
}
