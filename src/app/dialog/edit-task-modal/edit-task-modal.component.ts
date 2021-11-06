import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../model/Task";


@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css']
})
export class EditTaskModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
  ) { }

  modalTitle: string;
  editedTask: Task;

  ngOnInit(): void {
    this.editedTask = this.data[0];
    this.modalTitle = this.data[1];

    console.log(this.editedTask);
  }

}
