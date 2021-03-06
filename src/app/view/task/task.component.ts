import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from "../../model/Task";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {EditTaskModalComponent} from "../../dialog/edit-task-modal/edit-task-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmModalComponent} from "../../dialog/confirm-modal/confirm-modal.component";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select']
  dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  tasks: Task[];


  @Input("tasks")
  set setTasks(value: Task[]) {
    this.tasks = value;
    this.fillTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output() selectCategory = new EventEmitter<Category>();


  constructor(
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Task>();
  }

  ngAfterViewInit() {
    this.addTableObjects()
  }

  ngOnInit(): void {
    this.fillTable();
  }

  getPrioryColor(task: Task): string {
    if (task.completed) {
      return "#F8F9FA"
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';
  }

  private fillTable(): void {

    if (!this.dataSource) return;

    this.dataSource.data = this.tasks;
    this.addTableObjects()

    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      switch (sortHeaderId) {
        case 'priority': {
          return data.priority ? data.priority.id : 0;
        }
        case 'category' : {
          return data.category ? data.category.title : '';
        }
        case 'date': {
          return data.date ? data.date.getTime() : Date.now();
        }
        case 'title': {
          return data.title;
        }
      }
      return '';
    }
  }

  private addTableObjects(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openEditTaskModal(task: Task): void {
    // this.updateTask.emit(task);
    const dialogRef = this.dialog.open(EditTaskModalComponent,
      {data: [task, 'Edit Task'], autoFocus: true},);
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'delete'){
        this.deleteTask.emit(task);
        return;
      }
        if(result as Task) {
          this.updateTask.emit(task);
          return;
        }
    })
  }

  openDeleteDialog(task: Task): void {
    var matDialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Delete confirmation',
        message: `Really want to delete task:"${task.title}"?`
      },
      autoFocus:false
    });

    matDialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteTask.emit(task);
      }
    });

  }

  onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  changeCategory(category: Category): void {
    this.selectCategory.emit(category);
  }
}
