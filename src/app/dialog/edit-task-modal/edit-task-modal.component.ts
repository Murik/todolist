import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../model/Task";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {Category} from "../../model/Category";
import {DataHandlerService} from "../../service/data-handler.service";
import {Priority} from "../../model/Priority";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css']
})
export class EditTaskModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private dataHandler: DataHandlerService,
    public dialog: MatDialog
  ) { }


  taskFormControl = new FormControl('', [Validators.required]);
  //
  // matcher = new MyErrorStateMatcher();

  categories: Category[];
  tmpCategory?: Category;

  priorities: Priority[];
  tmpPriority?: Priority;

  modalTitle: string;
  editedTask: Task;
  tmpTitle: string;

  tmpDate?: Date;

  ngOnInit(): void {
    this.editedTask = this.data[0];
    this.modalTitle = this.data[1];

    console.log(this.editedTask);
    this.tmpTitle = this.editedTask.title;
    this.tmpCategory = this.editedTask.category;
    this.tmpPriority = this.editedTask.priority;
    this.tmpDate = this.editedTask.date;

    this.dataHandler.getAllCategories().subscribe(value => this.categories=value);
    this.dataHandler.getPriorities().subscribe(value => this.priorities=value);

  }

  onConfirm(): void {
    this.editedTask.title = this.tmpTitle;
    this.editedTask.category = this.tmpCategory;
    this.editedTask.priority = this.tmpPriority;
    this.editedTask.date = this.tmpDate;

    this.dialogRef.close(this.editedTask);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }


  statusChange(): void {
    this.editedTask.completed = !this.editedTask.completed;
    this.dialogRef.close(this.editedTask);

  }

  delete(): void{
    var matDialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Delete confirmation',
        message: `Really want to delete task:"${this.editedTask.title}"?`
      },
      autoFocus:false
    });

    matDialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dialogRef.close('delete');
      }
      // console.log(`Dialog result: ${result}`);
    });

  }
}
