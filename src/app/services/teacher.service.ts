import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {parseDateToString} from "../helpers/help-functions";
import {Teacher} from "../entities/Teacher";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private url = "http://localhost:8080/api/v1/teachers";

  constructor(private http: HttpClient) {
  }

  getTeachers() {
    return this.http.get<Array<Teacher>>(this.url);
  }

  getTeacher(id: number | string) {
    return this.http.get<Teacher>(this.url + '/' + id);
  }

  createTeacher(teacher: Teacher) {
    teacher.birthday = parseDateToString(teacher.birthday);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Teacher>(this.url, JSON.stringify(teacher), {headers: myHeaders});
  }

  updateTeacher(id: number | string, teacher: Teacher) {
    teacher.birthday = parseDateToString(teacher.birthday);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Teacher>(this.url + '/' + id, JSON.stringify(teacher), {headers: myHeaders});
  }

  deleteTeacher(id: number | string) {
    return this.http.delete<Teacher>(this.url + '/' + id);
  }
}
