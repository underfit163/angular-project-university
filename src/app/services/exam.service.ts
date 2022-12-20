import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Exam} from "../entities/Exam";
import {environment} from "../../environments/environment";

const HOST = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private url = "/api/v1/exams";

  constructor(private http: HttpClient) {
  }

  getExams() {
    return this.http.get<Array<Exam>>(HOST + this.url);
  }

  getExam(id: number | string) {
    return this.http.get<Exam>(HOST + this.url + '/' + id);
  }

  createExam(exam: Exam) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Exam>(HOST + this.url, JSON.stringify(exam), {headers: myHeaders});
  }

  updateExam(id: number | string, exam: Exam) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Exam>(HOST + this.url + '/' + id, JSON.stringify(exam), {headers: myHeaders});
  }

  deleteExam(id: number | string) {
    return this.http.delete<Exam>(HOST + this.url + '/' + id);
  }
}
