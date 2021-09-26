import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from "../../model/Task";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  displayedColumns: string[] = ['color', 'id', 'title','date', 'priority', 'category']
  dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  tasks: Task[] = [];

  constructor(private dataHandler: DataHandlerService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.dataHandler.taskSubject.subscribe(value => this.tasks = value);

    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)


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
  }
}
