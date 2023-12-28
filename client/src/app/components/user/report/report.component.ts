import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../core/services/report.service';
import { Report } from '../../../core/models/report.model';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reports: Report[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getReports().subscribe((res) => {
      this.reports = res.data;
    });
  }
}