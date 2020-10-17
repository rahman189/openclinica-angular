import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subject-count',
  templateUrl: './subject-count.component.html',
  styleUrls: ['./subject-count.component.scss']
})
export class SubjectCountComponent implements OnInit {
  displayedColumns: string[] = ['eventStatus', 'total', 'percentage'];
  dataSource: any[]

  constructor() { }

  ngOnInit(): void {
    this.dataSource = [
      {
        eventStatus: 'Available',
        total: 1,
        percentage: 100
      },
      {
        eventStatus: 'Signed',
        total: 0,
        percentage: 0
      },
      {
        eventStatus: 'Removed',
        total: 0,
        percentage: 0
      }
    ]
  }

}
