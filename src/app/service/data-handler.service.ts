import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Priority} from "../model/Priority";
import {Task} from "../model/Task";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);

  constructor() { }

  getCategories(): Category[]{
   return TestData.categories;
  }

  getPriorities(): Priority[]{
    return TestData.priorities;
  }

  fillTasks() {
    this.taskSubject.next(TestData.tasks);
  }

  fillTasksByCategory(category: Category){
    const tasks = TestData.tasks.filter(value => value.category === category)
    this.taskSubject.next(tasks);
  }
}
