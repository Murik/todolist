import {TaskDAO} from "../interface/TaskDAO";
import {Category} from "../../model/Category";
import {Observable, of} from "rxjs";
import {Priority} from "../../model/Priority";
import {TestData} from "../TestData";
import {Task} from "../../model/Task";

export class TaskDAOImpl implements TaskDAO{
  add(data: Task): Observable<Task> {
    return of(data);
  }

  delete(id: number): Observable<Task | undefined> {
    return of(undefined);
  }

  get(id: number): Observable<Task | undefined> {
    return of(TestData.tasks.find(value => value.id === id));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return of(0);
  }

  getTotalCount(): Observable<number> {
    return of(0);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return of(0);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return of(0);
  }

  search(searchText?: string, category?: Category, status?: boolean, priority?: Priority): Observable<Task[]> {
    return of(this.searchTasks(searchText,category,status,priority));
  }

  searchTasks(searchText?: string, category?: Category, status?: boolean, priority?: Priority): Task[]{
    var tasks = TestData.tasks;
      if(category){
        tasks = tasks
          .filter(value => value.category === category);
      }
      // .filter(value => value.title.indexOf(searchText)>0)
      // .filter(value => value.completed == status)
      // .filter(value => value.priority == priority)
    return tasks;
  }

  update(id: number, data: Task): Observable<Task> {
    return of(data);
  }


}
