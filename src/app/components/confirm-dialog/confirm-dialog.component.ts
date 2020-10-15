import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title>
      <mat-icon *ngIf="showIcon">warning</mat-icon>
      {{title}}
    </h1>

    <div mat-dialog-content>
      <p>{{message}}</p>
    </div>

    <div mat-dialog-actions style="float: right;">
      <button mat-button (click)="onDismiss()">No</button>
      <button mat-raised-button color="primary" (click)="onConfirm()">Yes</button>
    </div>
  `,
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  title: string;
  message: string;
  showIcon: Boolean;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.title = data.title;
    this.message = data.message;
    this.showIcon = true;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

}
