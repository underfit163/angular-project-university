import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Mark} from "../entities/Mark";
import {parseDateToString} from "../helpers/help-functions";

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  private url = "http://localhost:8080/api/v1/marks";

  constructor(private http: HttpClient) {
  }

  getMarks() {
    return this.http.get<Array<Mark>>(this.url);
  }

  getMarksByIdExam(id:number| string) {
    return this.http.get<Array<Mark>>(this.url+ '/' + id + '/exam');
  }

  getMark(id: number | string) {
    return this.http.get<Mark>(this.url + '/' + id);
  }

  createMark(mark: Mark, idExam: number) {
    mark.examidfk = idExam;
    mark.passdate = parseDateToString(mark.passdate);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Mark>(this.url, JSON.stringify(mark), {headers: myHeaders});
  }

  updateMark(id: number | string, mark: Mark, idExam: number) {
    mark.examidfk = idExam
    mark.passdate = parseDateToString(mark.passdate);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Mark>(this.url + '/' + id, JSON.stringify(mark), {headers: myHeaders});
  }

  deleteMark(id: number | string) {
    return this.http.delete<Mark>(this.url + '/' + id);
  }
}
