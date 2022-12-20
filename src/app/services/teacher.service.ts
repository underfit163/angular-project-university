import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {parseDateToString} from "../helpers/help-functions";
import {Teacher} from "../entities/Teacher";
import {environment} from "../../environments/environment";

const HOST = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private url = "/api/v1/teachers";

  constructor(private http: HttpClient) {
  }

  getTeachers() {
    return this.http.get<Array<Teacher>>(HOST + this.url);
  }

  getTeacher(id: number | string) {
    return this.http.get<Teacher>(HOST + this.url + '/' + id);
  }

  createTeacher(teacher: Teacher) {
    teacher.birthday = parseDateToString(teacher.birthday);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Teacher>(HOST + this.url, JSON.stringify(teacher), {headers: myHeaders});
  }

  updateTeacher(id: number | string, teacher: Teacher) {
    teacher.birthday = parseDateToString(teacher.birthday);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Teacher>(HOST + this.url + '/' + id, JSON.stringify(teacher), {headers: myHeaders});
  }

  deleteTeacher(id: number | string) {
    return this.http.delete<Teacher>(HOST +this.url + '/' + id);
  }
}
