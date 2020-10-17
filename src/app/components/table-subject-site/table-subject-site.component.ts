import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-subject-site',
  templateUrl: './table-subject-site.component.html',
  styleUrls: ['./table-subject-site.component.scss']
})
export class TableSubjectSiteComponent implements OnInit {
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
