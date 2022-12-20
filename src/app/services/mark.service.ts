import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Mark} from "../entities/Mark";
import {parseDateToString} from "../helpers/help-functions";
import {environment} from "../../environments/environment";

const HOST = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  private url = "/api/v1/marks";

  constructor(private http: HttpClient) {
  }

  getMarks() {
    return this.http.get<Array<Mark>>(HOST + this.url);
  }

  getMarksByIdExam(id:number| string) {
    return this.http.get<Array<Mark>>(HOST + this.url+ '/' + id + '/exam');
  }

  getMark(id: number | string) {
    return this.http.get<Mark>(HOST + this.url + '/' + id);
  }

  createMark(mark: Mark, idExam: number) {
    mark.examidfk = idExam;
    mark.passdate = parseDateToString(mark.passdate);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Mark>(HOST + this.url, JSON.stringify(mark), {headers: myHeaders});
  }

  updateMark(id: number | string, mark: Mark, idExam: number) {
    mark.examidfk = idExam
    mark.passdate = parseDateToString(mark.passdate);
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Mark>(HOST + this.url + '/' + id, JSON.stringify(mark), {headers: myHeaders});
  }

  deleteMark(id: number | string) {
    return this.http.delete<Mark>(HOST + this.url + '/' + id);
  }
}
