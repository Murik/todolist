import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../model/Category";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryModalComponent} from "../../dialog/edit-category-modal/edit-category-modal.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input() categories: Category[];
  @Output() selectCategory = new EventEmitter<Category | null>();
  @Output()
  updateCategory = new EventEmitter<Category>();
  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Input() selectedCategory?: Category | null;
  indexMouseMove: number | null;

  constructor(
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  showTasksByCategory(category: Category | null): void {
    if (this.selectedCategory === category) return;

    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);

  }

  showEditIcon(index: number | null) {
      this.indexMouseMove = index;
  }

  openEditCategoryModal(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryModalComponent,
      {data: [category, 'Edit Category'],
        width: '400px',
        autoFocus: true},);
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'delete'){
        this.deleteCategory.emit(category);
        return;
      }
      if(result as Category) {
        this.updateCategory.emit(result);
        return;
      }
    })
  }
}
