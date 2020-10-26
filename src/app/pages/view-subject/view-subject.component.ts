import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewSubjectComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any[];
  length:number;
  pageSize: number;
  pageSizeOptions: number[] ;
  subject: object = {
    enrollmentDate: '',
    label: '',
    status: '',
    statusId: '',
    studySubjectId: '',
    subjectId: '',
    gender: '',
    dateOfBirth: '',
    oid: '',
    personId: '',
    siteId: ''
  }
  studySubjectId: any
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.studySubjectId = this.route.snapshot.paramMap.get('id')
    this.apiService.get(`/subject/details/${this.studySubjectId}`).subscribe((data) => {
      this.subject = data
    })
    this.pageSizeOptions = [5, 10, 25, 100];
    this.length = 100;
    this.pageSize = 10;
    this.displayedColumns = [
      'index',
      'event',
      'startDate',
      'location',
      'status',
      'actions',
      'crf'];
    this.dataSource = [];
  }

}
