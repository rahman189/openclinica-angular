import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogData, ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-subject-matrix',
  templateUrl: './subject-matrix.component.html',
  styleUrls: ['./subject-matrix.component.scss']
})
export class SubjectMatrixComponent implements OnInit {
  
  displayedColumns: string[] = ['index', 'label', 'status', 'siteId', 'oid', 'gender', 'secondaryId', 'actions'];
  dataSource: any[] = [];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  search: string = ''

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get('/subject/getAll/?search=').subscribe((data) => {
      this.dataSource = data
    })
  }

  addNewSubject(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = [...this.dataSource]
        data.push(result)
        this.dataSource = data
      }
    });
  }

  confirmDelete(index: number): void {
    const data:DialogData = {
      message: 'Are you sure to delete this data?',
      title: 'Confirmation'
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: data,
      role: 'alertdialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(index,this.dataSource[index], result)
        let data = [...this.dataSource]
        data.splice(index, 1)
        this.dataSource = data
      }
    });
  }
  
  applyFilter() {
    this.apiService.get(`/subject/getAll/?search=${this.search}`).subscribe((data) => {
      this.dataSource = data
    })
  }
}

@Component({
  selector: 'subject-matrix-dialog',
  templateUrl: 'subject-matrix-dialog.component.html',
  styleUrls: ['./subject-matrix.component.scss']
})
export class DialogOverviewExampleDialog {
  subjectForm = this.fb.group({
    studySubjectId: ['', Validators.required],
    personId: ['', Validators.required],
    enrollmentDate: [new Date(), Validators.required],
    sex: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    studyEvent: ['', Validators.required],
    startDate: [new Date(), Validators.required],
  });
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private fb: FormBuilder,
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
    if (!this.subjectForm.invalid) this.dialogRef.close(this.subjectForm.value)
    else this.validateAllFormFields(this.subjectForm)
  }

}