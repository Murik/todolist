import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
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

  tasks: Task[] = [];

  constructor(private dataHandler: DataHandlerService) {
    this.dataSource = new MatTableDataSource<Task>();
  }

  ngAfterViewInit() {
    this.addTableObjects()
  }

  ngOnInit(): void {
    this.dataHandler.taskSubject.subscribe(value => this.tasks = value);
    this.refreshTable();
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

  private refreshTable() {
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
}
