import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "../entities/Subject";
import {environment} from "../../environments/environment";


const HOST = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private url = "/api/v1/subjects";

  constructor(private http: HttpClient) {
  }

  getSubjects() {
    return this.http.get<Array<Subject>>(HOST + this.url);
  }

  getSubject(id: number | string) {
    return this.http.get<Subject>(HOST + this.url + '/' + id);
  }

  createSubject(subject: Subject) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Subject>(HOST + this.url, JSON.stringify(subject), {headers: myHeaders});
  }

  updateSubject(id: number | string, subject: Subject) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Subject>(HOST + this.url + '/' + id, JSON.stringify(subject), {headers: myHeaders});
  }

  deleteSubject(id: number | string) {
    return this.http.delete<Subject>(HOST + this.url + '/' + id);
  }
}
