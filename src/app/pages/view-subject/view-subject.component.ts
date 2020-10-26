import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.scss']
})
export class ViewSubjectComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any[];
  dataSourceGroup: any[];
  displayedColumnsGroup: string[];
  subject: any = {
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
    this.displayedColumns = [
      'index',
      'event',
      'startDate',
      'location',
      'status',
      'actions',
      'crf'];
    this.dataSource = [];

    this.displayedColumnsGroup = [
      'index',
      'groupClass',
      'studyGroup',
      'notes'];
    this.dataSourceGroup = [];
  }

}
