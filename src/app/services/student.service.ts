import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Student} from "../entities/Student";
import {parseDateToString} from "../helpers/help-functions";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = "http://localhost:8080/api/v1/students";

  constructor(private http: HttpClient) {
  }

  getStudents() {
    return this.http.get<Array<Student>>(this.url);
  }

  getStudent(id: number | string) {
    return this.http.get<Student>(this.url + '/' + id);
  }

  createStudent(student: Student) {
    student.birthday = parseDateToString(student.birthday);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Student>(this.url, JSON.stringify(student), {headers: myHeaders});
  }

  updateStudent(id: number | string, student: Student) {
    student.birthday = parseDateToString(student.birthday);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Student>(this.url + '/' + id, JSON.stringify(student), {headers: myHeaders});
  }

  deleteStudent(id: number | string) {
    return this.http.delete<Student>(this.url + '/' + id);
  }
}
