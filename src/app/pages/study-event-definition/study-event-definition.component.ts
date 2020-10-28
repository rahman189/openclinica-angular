import { Component, Inject, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogData, ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ApiService } from '../../services/api.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-study-event-definition',
  templateUrl: './study-event-definition.component.html',
  styleUrls: ['./study-event-definition.component.scss']
})
export class StudyEventDefinitionComponent implements OnInit, AfterViewChecked {
  displayedColumns: string[] = ['index', 'name', 'repeating', 'type', 'category', 'description', 'study', 'status', 'actions'];
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
    private _snackBar: MatSnackBar) {}

  ngAfterViewChecked(): void {
    this.tableHeight = this.table._elementRef.nativeElement.clientHeight + 9
    this.tableWidth = this.table._elementRef.nativeElement.clientWidth + 5
  }

  ngOnInit(): void {
    this.apiService.get('/study-event-controller/get-all/?search=').subscribe((data) => {
      this.dataSource = data
    })
  }

  edit(data): void {
    const dialogRef = this.dialog.open(StudyEventDefinitionDialog, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applyFilter()
      }
    });
  }
  addNewSubject(): void {
    const dialogRef = this.dialog.open(StudyEventDefinitionDialog, {
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
    const dataStudyEvent = this.dataSource[index]
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: data,
      role: 'alertdialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.delete(`/study-event-controller/${dataStudyEvent.studyEventDefinitionId}`).subscribe({
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
    this.apiService.get(`/study-event-controller/get-all/?search=${this.search}`).subscribe((data) => {
      this.dataSource = data
      this.tableHeight = this.table._elementRef.nativeElement.clientHeight + 9
      this.tableWidth = this.table._elementRef.nativeElement.clientWidth + 5
      this.isLoading = false
    })
  }

}

@Component({
  selector: 'study-event-dialog',
  templateUrl: 'study-event-dialog.component.html',
  styleUrls: ['./study-event-definition.component.scss']
})
export class StudyEventDefinitionDialog implements OnInit {
  studyEventForm = this.fb.group({
    studyEventDefinitionId: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    repeating: [false],
    type: ['', Validators.required],
    category: ['', Validators.required],
    statusId: ['', Validators.required],
    studyId: ['', Validators.required],
    oid: ['', Validators.required]
  });
  loading: boolean;
  statusList: any[];
  studyList: any[];
  constructor(
    public dialogRef: MatDialogRef<StudyEventDefinitionDialog>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    forkJoin([
      this.apiService.get('/study-event-controller/get-status'),
      this.apiService.get('/study-event-controller/get-study')
    ]).subscribe(result => {
      const [ statusList, studyList ] = result
      this.statusList = statusList
      this.studyList = studyList
    })
    if (this.data) {
      console.log(this.data)
      this.studyEventForm.patchValue({
        studyEventDefinitionId: this.data.studyEventDefinitionId,
        name: this.data.name,
        description: this.data.description,
        repeating: this.data.repeating,
        type: this.data.type,
        category: this.data.category,
        statusId: this.data.statusId,
        studyId: this.data.studyId,
        oid: this.data.oid
      })
    }
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
    return this.studyEventForm.controls[controlName].hasError(validator);
  }

  onSubmit(): void {
    if (!this.studyEventForm.invalid) {
      this.loading = true
      if (this.studyEventForm.get('studyEventDefinitionId').value) {
        this.apiService.put('/study-event-controller/update', this.studyEventForm.value).subscribe({
          next: () => {
            this.loading = false
            this.dialogRef.close(this.studyEventForm.value)
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
      } else {
        this.apiService.post('/study-event-controller/create', this.studyEventForm.value).subscribe({
          next: () => {
            this.loading = false
            this.dialogRef.close(this.studyEventForm.value)
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
      
    }
    else this.validateAllFormFields(this.studyEventForm)
  }

}
