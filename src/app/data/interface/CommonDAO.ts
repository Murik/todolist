import {Observable} from "rxjs";

export interface CommonDAO<T>{

  add(data: T): Observable<T>;

  get(id: number): Observable<T | undefined>;

  delete(id: number): Observable<T | undefined>;

  update(id: number, data: T): Observable<T>;

  getAll(): Observable<T[]>;


}
