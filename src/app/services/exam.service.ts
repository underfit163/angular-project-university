import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Exam} from "../entities/Exam";

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private url = "http://localhost:8080/api/v1/exams";

  constructor(private http: HttpClient) {
  }

  getExams() {
    return this.http.get<Array<Exam>>(this.url);
  }

  getExam(id: number | string) {
    return this.http.get<Exam>(this.url + '/' + id);
  }

  createExam(exam: Exam) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Exam>(this.url, JSON.stringify(exam), {headers: myHeaders});
  }

  updateExam(id: number | string, exam: Exam) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Exam>(this.url + '/' + id, JSON.stringify(exam), {headers: myHeaders});
  }

  deleteExam(id: number | string) {
    return this.http.delete<Exam>(this.url + '/' + id);
  }
}
