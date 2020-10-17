import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['index', 'studySubjectId', 'subjectStatus', 'siteId', 'oid'];
  dataSource: any[]
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  
  constructor() { }

  ngOnInit(): void {
  }

}
