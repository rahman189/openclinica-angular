import { Component, Inject, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogData, ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ApiService } from '../../services/api.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subject-matrix',
  templateUrl: './subject-matrix.component.html',
  styleUrls: ['./subject-matrix.component.scss']
})
export class SubjectMatrixComponent implements OnInit, AfterViewChecked {
  
  displayedColumns: string[] = ['index', 'label', 'status', 'siteId', 'oid', 'gender', 'secondaryId', 'actions'];
  dataSource: any[] = [];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  search: string = ''
  @ViewChild('myTable') table;
  tableHeight: number
  tableWidth: number
  isLoading: boolean
  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router) {}

  ngAfterViewChecked(): void {
    this.tableHeight = this.table._elementRef.nativeElement.clientHeight + 9
    this.tableWidth = this.table._elementRef.nativeElement.clientWidth + 5
  }

  ngOnInit(): void {
    this.apiService.get('/subject/get-all/?search=').subscribe((data) => {
      this.dataSource = data
    })
  }

  addNewSubject(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applyFilter()
      }
    });
  }

  confirmDelete(index: number): void {
    const data:DialogData = {
      message: 'Are you sure to delete this data?',
      title: 'Confirmation'
    }
    const dataStudySubject = this.dataSource[index]
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: data,
      role: 'alertdialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.delete(`/subject/${dataStudySubject.subjectId}/${dataStudySubject.studySubjectId}`).subscribe({
          next: () => {
            this.applyFilter()
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
    });
  }
  
  applyFilter() {
    this.isLoading = true
    this.apiService.get(`/subject/get-all/?search=${this.search}`).subscribe((data) => {
      this.dataSource = data
      this.tableHeight = this.table._elementRef.nativeElement.clientHeight + 9
      this.tableWidth = this.table._elementRef.nativeElement.clientWidth + 5
      this.isLoading = false
    })
  }

  details(data) {
    this.router.navigate(['/view-subject', { id: data.studySubjectId, subjectId: data.subjectId }]);
  }
}

@Component({
  selector: 'subject-matrix-dialog',
  templateUrl: 'subject-matrix-dialog.component.html',
  styleUrls: ['./subject-matrix.component.scss']
})
export class DialogOverviewExampleDialog {
  subjectForm = this.fb.group({
    label: ['', Validators.required],
    personId: ['', Validators.required],
    enrollmentDate: [new Date(), Validators.required],
    sex: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    studyEvent: ['', Validators.required],
    startDate: [new Date(), Validators.required],
  });
  pipe = new DatePipe('en-US')
  loading: boolean
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

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
        label: this.subjectForm.value.label,
        enrollmentDate: this.pipe.transform(this.subjectForm.value.enrollmentDate, 'yyyy-MM-dd'),
        personId: this.subjectForm.value.personId,
        sex: this.subjectForm.value.sex,
        dateOfBirth: this.pipe.transform(this.subjectForm.value.dateOfBirth, 'yyyy-MM-dd')
      }
      this.loading = true
      this.apiService.post('/subject/save-study-subject', data).subscribe({
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