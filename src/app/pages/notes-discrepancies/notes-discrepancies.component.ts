import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-discrepancies',
  templateUrl: './notes-discrepancies.component.html',
  styleUrls: ['./notes-discrepancies.component.scss']
})
export class NotesDiscrepanciesComponent implements OnInit {
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
    this.displayedColumns = [
      'index',
      'studySubjectId',
      'type',
      'resolutionStatus',
      'dateCreated',
      'dateUpdated',
      'daysOpen',
      'daysSinceUpdated',
      'eventName',
      'eventDate',
      'crf',
      'crfStatus',
      'entityName',
      'entityValue',
      'entityType',
      'description',
      'detailedNotes',
      'totalNotes',
      'assignedUser',
      'owner',
      'actions'];
    this.dataSource = [];
  }

}
