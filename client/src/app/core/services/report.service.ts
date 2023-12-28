// report.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServerResponse } from '../models/server-response.model';
import { Report } from '../models/report.model';

const baseUrl = 'http://localhost:8000/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient) { }

  reportComment(id: string, payload: Report): Observable<ServerResponse<Report>> {
    return this.http.post<ServerResponse<Report>>(`${baseUrl}/${id}`, payload);
  }

  getReports(): Observable<ServerResponse<Report[]>> {
    return this.http.get<ServerResponse<Report[]>>(baseUrl);
  }
}
