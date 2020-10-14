import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-subject-matrix',
  templateUrl: './subject-matrix.component.html',
  styleUrls: ['./subject-matrix.component.scss']
})
export class SubjectMatrixComponent {
  
  displayedColumns: string[] = ['index', 'studySubjectId', 'subjectStatus', 'siteId', 'oid', 'sex', 'secondaryId', 'actions'];
  dataSource: any[] = [];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(public dialog: MatDialog) {}

  addNewSubject(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      let data = [...this.dataSource]
      data.push(result)
      this.dataSource = data
      console.log('The dialog was closed', result, this.dataSource);
    });
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

  public checkErrors(controlName: string, validator: string) {
    return this.subjectForm.controls[controlName].hasError(validator);
  }

  onSubmit(): void {
    if (!this.subjectForm.invalid) this.dialogRef.close(this.subjectForm.value);
  }

}