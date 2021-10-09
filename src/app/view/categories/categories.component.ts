import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../model/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input() categories: Category[];
  @Output() selectCategory = new EventEmitter<Category>();

  selectedCategory?: Category = undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  showTasksByCategory(category: Category) {
    if (this.selectedCategory === category) return;

    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);

  }
}
