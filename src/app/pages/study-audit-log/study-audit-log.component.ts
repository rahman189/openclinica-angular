import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-study-audit-log',
  templateUrl: './study-audit-log.component.html',
  styleUrls: ['./study-audit-log.component.scss']
})
export class StudyAuditLogComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any[];
  length:number;
  pageSize: number;
  pageSizeOptions: number[] ;
  constructor() { }

  ngOnInit(): void {
    this.pageSizeOptions = [5, 10, 25, 100];
    this.length = 100;
    this.pageSize = 10;
    this.displayedColumns = ['index', 'studySubjectId', 'secondarySubjectId', 'studySubjectOid', 'dateOfBirth', 'personId', 'createdBy', 'status', 'actions'];
    this.dataSource = [];
  }
}
