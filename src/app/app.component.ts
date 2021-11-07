import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "./service/data-handler.service";
import {Task} from "./model/Task";
import {Category} from "./model/Category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todolist';
  tasks: Task[];
  categories: Category[];
  private selectedCategory: Category;

  constructor(private dataHandler: DataHandlerService) {

  }

  ngOnInit(): void {
  this.dataHandler.getAllTasks().subscribe(value => this.tasks = value);
    this.dataHandler.getAllCategories().subscribe(value => this.categories = value);

  }


  onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.dataHandler.searchTasks(
      this.selectedCategory).subscribe(tasks => {
        this.tasks = tasks;
    })
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      //todo bad stile -> move to map
        this.dataHandler.searchTasks(
          this.selectedCategory).subscribe(tasks => {
            this.tasks = tasks;
        });
    });
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      //todo bad stile -> move to map
      this.dataHandler.searchTasks(
        this.selectedCategory).subscribe(tasks => {
        this.tasks = tasks;
      });

    });
  }
}
