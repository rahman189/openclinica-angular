import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-subject-study',
  templateUrl: './table-subject-study.component.html',
  styleUrls: ['./table-subject-study.component.scss']
})
export class TableSubjectStudyComponent implements OnInit {
  displayedColumns: string[] = ['index', 'studySubjectId', 'subjectStatus', 'siteId', 'oid'];
  dataSource: any[]
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor() { }

  ngOnInit(): void {
    this.dataSource = []
  }

}
