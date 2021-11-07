import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
 @Input() dialogTitle: string;
 @Input() message: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {dialogTitle: string, message: string},

  ) {
    this.dialogTitle= data.dialogTitle;
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  onConfirm():void {
    this.dialogRef.close(true);

  }

  onCancel():void {
    this.dialogRef.close(false);

  }
}
