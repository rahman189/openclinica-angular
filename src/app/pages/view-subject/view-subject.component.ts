import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

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
  displayedStudyEventColumns: string[];
  subject: any = {
    enrollmentDate: '',
    label: '',
    secondaryLabel: '',
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
  globalSubject: any = {
    dateCreated: '',
    dateOfBirth: '',
    dateUpdated: '',
    firstName: '',
    gender: '',
    lastName: '',
    ownerId: '',
    personId: '',
    status: '',
    statusId: '',
    subjectId: ''
  }
  pipe = new DatePipe('en-US')
  studySubjectId: any;
  subjectId: any;
  search: string = ''
  lisStudyEventDefinition: any[]
  formStudyEvent: any
  arrayFormStudyEvent: any[]
  loading: boolean
  openedDialog: any
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.studySubjectId = this.route.snapshot.paramMap.get('id')
    this.subjectId = this.route.snapshot.paramMap.get('subjectId')
    forkJoin([
      this.apiService.get(`/subject/details/${this.studySubjectId}`),
      this.apiService.get(`/subject/details-subject/${this.subjectId}`),
      this.apiService.get(`/study-event/get-all/${this.studySubjectId}?search=`),
      this.apiService.get(`/study-event-controller/get-list-study-event-definition`)
    ]).subscribe(result => {
      const [subject, globalSubject, dataSource, lisStudyEventDefinition] = result
      this.subject = subject
      this.globalSubject = globalSubject
      this.dataSource = dataSource
      this.lisStudyEventDefinition = lisStudyEventDefinition
    })
    this.displayedColumns = [
      'index',
      'studyEventDefinition',
      'dateStart',
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
    this.displayedStudyEventColumns = [
      'index',
      'studyEventDefinitionId',
      'startDate',
      'endDate',
      'actions'
    ]
    this.arrayFormStudyEvent = []
    this.formStudyEvent = this.fb.group({
      studySubjecyId: [''],
      studyEventDefinitionId: ['', Validators.required],
      startDate: [this.pipe.transform(new Date(), 'yyyy-MM-ddT00:00'), Validators.required],
      endDate: ['', Validators.required]
    });
  }

  getValue(form: string, control: string) {
    return this[form].get(control).value
  }

  addNewSubject(): void {
    const dialogRef = this.dialog.open(DialogEditSubject, {
      width: '500px',
      data: this.globalSubject
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.get(`/subject/details-subject/${this.subjectId}`).subscribe((dataSubject) => {
          this.globalSubject = dataSubject
        })
      }
    });
  }
  editStudySubject(): void {
    const dialogRef = this.dialog.open(DialogEditStudySubject, {
      width: '500px',
      data: this.subject
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.get(`/subject/details/${this.studySubjectId}`).subscribe((data) => {
          this.subject = data
        })
      }
    });
  }

  searchStudyEvent(): void {
    this.apiService.get(`/study-event/get-all/${this.studySubjectId}?search=${this.search}`).subscribe(response => {
      this.dataSource = response
    })
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  checkErrors(form:string, controlName: string, validator: string) {
    return this[form].controls[controlName].hasError(validator);
  }
  openDialogAddStudyEvent(templateRef: TemplateRef<any>) {
    this.openedDialog = this.dialog.open(templateRef, {
      width: '800px'
    });
  }
  saveStudyEvent(): void {
    if (!this.formStudyEvent.invalid) {
      let data = [...this.arrayFormStudyEvent]
      data.push(this.formStudyEvent.value)
      this.arrayFormStudyEvent = data
      this.formStudyEvent.reset()
    }
    else this.validateAllFormFields(this.formStudyEvent)
  }
  deleteListStudyEvent(index) {
    let data = [...this.arrayFormStudyEvent]
    data.splice(index, 1)
    this.arrayFormStudyEvent = data
  }
  createStudyEvent(): void {
    if (!this.arrayFormStudyEvent.length) {
      this._snackBar.open('Study event not be empty', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['error-snackbar']
      });
    } else {
      const data = this.arrayFormStudyEvent.map(item => ({
        studyEventDefinitionId: item.studyEventDefinitionId.value,
        startDate: this.pipe.transform(new Date(item.startDate), 'yyyy-MM-dd HH:mm:ss'),
        endDate: this.pipe.transform(new Date(item.endDate), 'yyyy-MM-dd HH:mm:ss')
      }))
      const objectToSave = {
        subjectId: this.subjectId,
        data: data
      }
      this.loading = true
      this.apiService.post('/subject/save-study-event', objectToSave).subscribe({
        next: () => {
          this.loading = false
          this.openedDialog.close()
          this._snackBar.open('Success save data', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar']
          });
          this.searchStudyEvent()
        },
        error: error => {
          this._snackBar.open(error, '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['error-snackbar']
          });
          this.loading = false
        }
      })
    }
  }
}

@Component({
  selector: 'edit-subject-dialog',
  templateUrl: 'edit-subject-dialog.component.html',
  styles: [
    `
      .mat-progress-bar {
        position: relative;
        top: -25px;
        width: 500px;
        left: -25px;
        border-top-right-radius: 2px;
        border-top-left-radius: 2px;
      }
    `
  ]
})
export class DialogEditSubject {
  subjectForm = this.fb.group({
    subjectId: ['', Validators.required],
    personId: ['', Validators.required],
    sex: ['', Validators.required],
    dateOfBirth: ['', Validators.required]
  });
  pipe = new DatePipe('en-US')
  loading: boolean
  constructor(
    public dialogRef: MatDialogRef<DialogEditSubject>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.subjectForm.controls['subjectId'].setValue(this.data.subjectId);
      this.subjectForm.controls['personId'].setValue(this.data.personId);
      this.subjectForm.controls['sex'].setValue(this.data.gender);
      this.subjectForm.controls['dateOfBirth'].setValue(this.data.dateOfBirth);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  checkErrors(controlName: string, validator: string) {
    return this.subjectForm.controls[controlName].hasError(validator);
  }

  onSubmit(): void {
    if (!this.subjectForm.invalid) {
      const data = {
        subjectId: this.subjectForm.value.subjectId,
        personId: this.subjectForm.value.personId,
        sex: this.subjectForm.value.sex,
        dateOfBirth: this.pipe.transform(this.subjectForm.value.dateOfBirth, 'yyyy-MM-dd')
      }
      this.loading = true
      this.apiService.put('/subject/update-subject', data).subscribe({
        next: () => {
          this.loading = false
          this.dialogRef.close(this.subjectForm.value)
        },
        error: error => {
          this._snackBar.open(error, '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['error-snackbar']
          });
        }
      })
    }
    else this.validateAllFormFields(this.subjectForm)
  }

}

@Component({
  selector: 'edit-subject-dialog',
  templateUrl: 'edit-study-subject-dialog.component.html',
  styleUrls: ['./view-subject.component.scss']
})
export class DialogEditStudySubject {
  subjectForm = this.fb.group({
    studySubjectId: ['', Validators.required],
    label: ['', Validators.required],
    secondaryLabel: [''],
    enrollmentDate: ['', Validators.required]
  });
  pipe = new DatePipe('en-US')
  loading: boolean
  constructor(
    public dialogRef: MatDialogRef<DialogEditStudySubject>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.subjectForm.controls['studySubjectId'].setValue(this.data.studySubjectId);
      this.subjectForm.controls['label'].setValue(this.data.label);
      this.subjectForm.controls['secondaryLabel'].setValue(this.data.secondaryLabel);
      this.subjectForm.controls['enrollmentDate'].setValue(this.data.enrollmentDate);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  checkErrors(controlName: string, validator: string) {
    return this.subjectForm.controls[controlName].hasError(validator);
  }

  onSubmit(): void {
    if (!this.subjectForm.invalid) {
      const data = {
        studySubjectId: this.subjectForm.value.studySubjectId,
        label: this.subjectForm.value.label,
        secondaryLabel: this.subjectForm.value.secondaryLabel,
        enrollmentDate: this.pipe.transform(this.subjectForm.value.enrollmentDate, 'yyyy-MM-dd')
      }
      this.loading = true
      this.apiService.put('/subject/update-study-subject', data).subscribe({
        next: () => {
          this.loading = false
          this.dialogRef.close(this.subjectForm.value)
        },
        error: error => {
          this._snackBar.open(error, '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['error-snackbar']
          });
        }
      })
    }
    else this.validateAllFormFields(this.subjectForm)
  }

}