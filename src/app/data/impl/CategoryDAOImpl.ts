import {CategoryDAO} from "../interface/CategoryDAO";
import {Category} from "../../model/Category";
import {Observable, of} from "rxjs";
import {TestData} from "../TestData";

export class CategoryDAOImpl implements CategoryDAO{
  add(data: Category): Observable<Category> {
    return of(data);
  }

  delete(id: number): Observable<Category | undefined> {
    return of(undefined);
  }

  get(id: number): Observable<Category| undefined> {
    return of(TestData.categories.find(value => value.id === id));
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return of(TestData.categories
      .filter(value => value.title.indexOf(title)>0)
    );
  }

  update(id: number, data: Category): Observable<Category> {
    return of(data);
  }


}
