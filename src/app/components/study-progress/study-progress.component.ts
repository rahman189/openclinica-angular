import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-study-progress',
  templateUrl: './study-progress.component.html',
  styleUrls: ['./study-progress.component.scss']
})
export class StudyProgressComponent implements OnInit {
  displayedColumns: string[] = ['eventStatus', 'total', 'percentage'];
  dataSource: any[]
  
  constructor() { }

  ngOnInit(): void {
    this.dataSource = [
      {
        eventStatus: 'Scheduled',
        total: 0,
        percentage: 30
      },
      {
        eventStatus: 'Data entry started',
        total: 0,
        percentage: 50
      },
      {
        eventStatus: 'Completed',
        total: 0,
        percentage: 75
      },
      {
        eventStatus: 'Signed',
        total: 0,
        percentage: 20
      },
      {
        eventStatus: 'Locked',
        total: 0,
        percentage: 80
      },
      {
        eventStatus: 'Skipped',
        total: 0,
        percentage: 25
      },
      {
        eventStatus: 'Stopped',
        total: 0,
        percentage: 60
      }
    ]
  }
}
