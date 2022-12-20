import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Student} from "../entities/Student";
import {parseDateToString} from "../helpers/help-functions";
import {environment} from "../../environments/environment";

const HOST = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = "/api/v1/students";

  constructor(private http: HttpClient) {
  }

  getStudents() {
    return this.http.get<Array<Student>>(HOST + this.url);
  }

  getStudent(id: number | string) {
    return this.http.get<Student>(HOST + this.url + '/' + id);
  }

  createStudent(student: Student) {
    student.birthday = parseDateToString(student.birthday);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Student>(HOST + this.url, JSON.stringify(student), {headers: myHeaders});
  }

  updateStudent(id: number | string, student: Student) {
    student.birthday = parseDateToString(student.birthday);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Student>(HOST + this.url + '/' + id, JSON.stringify(student), {headers: myHeaders});
  }

  deleteStudent(id: number | string) {
    return this.http.delete<Student>(HOST + this.url + '/' + id);
  }
}
