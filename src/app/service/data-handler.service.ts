import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Priority} from "../model/Priority";
import {Task} from "../model/Task";
import {Observable} from "rxjs";
import {TaskDAOImpl} from "../data/impl/TaskDAOImpl";
import {TaskDAO} from "../data/interface/TaskDAO";
import {CategoryDAO} from "../data/interface/CategoryDAO";
import {CategoryDAOImpl} from "../data/impl/CategoryDAOImpl";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  // taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  private taskDao: TaskDAO = new TaskDAOImpl();
  private categoryDao: CategoryDAO = new CategoryDAOImpl();

  constructor() { }

  getAllCategories(): Observable<Category[]>{
   return this.categoryDao.getAll();
  }

  getPriorities(): Priority[]{
    return TestData.priorities;
  }

  getAllTasks(): Observable<Task[]>{
    return this.taskDao.getAll();
  }

  searchTasks(selectedCategory: Category, searchText?: string, status?: boolean, priority?: Priority) : Observable<Task[]>{
    return this.taskDao.search(searchText, selectedCategory,status,priority);
  }
}
