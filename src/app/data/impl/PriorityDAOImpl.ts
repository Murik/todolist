import {PriorityDAO} from "../interface/PriorityDAO";
import {Priority} from "../../model/Priority";
import {Observable, of} from "rxjs";
import {TestData} from "../TestData";

export class PriorityDAOImpl implements PriorityDAO{
  add(data: Priority): Observable<Priority> {
    return of(data);
  }

  delete(id: number): Observable<Priority | undefined> {
    return of(undefined);
  }

  get(id: number): Observable<Priority | undefined> {
    return of(TestData.priorities.find(value => value.id === id));
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(data: Priority): Observable<Priority> {
    return of(data);
  }



}
