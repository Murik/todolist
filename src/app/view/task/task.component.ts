import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from "../../model/Task";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['color', 'id', 'title','date', 'priority', 'category']
  dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  tasks: Task[];

  @Input("tasks")
  set getTasks(value: Task[]) {
    this.tasks = value;
    this.fillTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  constructor() {
    this.dataSource = new MatTableDataSource<Task>();
  }

  ngAfterViewInit() {
    this.addTableObjects()
  }

  ngOnInit(): void {
    this.fillTable();
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  getPrioryColor(task: Task) {
      if(task.completed) {
        return "#F8F9FA"
      }

      if(task.priority && task.priority.color){
        return task.priority.color;
      }

      return '#fff';
  }

  private fillTable() {

    if(!this.dataSource) return;

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

  private addTableObjects(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onClickTask(task: Task) {
    this.updateTask.emit(task);
  }
}
