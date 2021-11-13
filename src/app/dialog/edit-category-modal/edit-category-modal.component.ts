import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {Category} from "../../model/Category";
import {DataHandlerService} from "../../service/data-handler.service";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.css']
})
export class EditCategoryModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Category, string],
    private dataHandler: DataHandlerService,
    public dialog: MatDialog
  ) { }


  categoryFormControl = new FormControl('', [Validators.required]);
  modalTitle: string;
  editedCategory: Category;
  tmpCategoryTitle: string;

  tmpDate?: Date;

  ngOnInit(): void {
    this.editedCategory = this.data[0];
    this.modalTitle = this.data[1];

    this.tmpCategoryTitle = this.editedCategory.title;
  }

  onConfirm(): void {
    this.editedCategory.title = this.tmpCategoryTitle;
    this.dialogRef.close(this.editedCategory);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  delete(): void{
    var matDialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Delete confirmation',
        message: `Do u really want to delete category:"${this.editedCategory.title}" (Tasks will not be deleted) ?`
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
