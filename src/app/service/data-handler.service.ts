import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {Priority} from "../model/Priority";
import {Task} from "../model/Task";
import {Observable} from "rxjs";
import {TaskDAOImpl} from "../data/impl/TaskDAOImpl";
import {TaskDAO} from "../data/interface/TaskDAO";
import {CategoryDAO} from "../data/interface/CategoryDAO";
import {CategoryDAOImpl} from "../data/impl/CategoryDAOImpl";
import {PriorityDAO} from "../data/interface/PriorityDAO";
import {PriorityDAOImpl} from "../data/impl/PriorityDAOImpl";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  // taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  private taskDao: TaskDAO = new TaskDAOImpl();
  private categoryDao: CategoryDAO = new CategoryDAOImpl();
  private priorityDao: PriorityDAO = new PriorityDAOImpl();


  constructor() { }

  getAllCategories(): Observable<Category[]>{
   return this.categoryDao.getAll();
  }

  getPriorities(): Observable<Priority[]>{
    return this.priorityDao.getAll();
  }

  getAllTasks(): Observable<Task[]>{
    return this.taskDao.getAll();
  }

  searchTasks(selectedCategory: Category| null, searchText?: string, status?: boolean, priority?: Priority) : Observable<Task[]>{
    return this.taskDao.search(searchText, selectedCategory,status,priority);
  }

  updateTask(task: Task): Observable<Task>{
      return this.taskDao.update(task);
  }

  deleteTask(id: number): Observable<Task | undefined> {
    return this.taskDao.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDao.update(category);
  }

  deleteCategory(id: number): Observable<Category | undefined> {
    return this.categoryDao.delete(id);
  }
}
