import {CategoryDAO} from "../interface/CategoryDAO";
import {Category} from "../../model/Category";
import {Observable, of} from "rxjs";
import {TestData} from "../TestData";

export class CategoryDAOImpl implements CategoryDAO{
  add(data: Category): Observable<Category> {
    return of(data);
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if(task.category?.id === id){
        task.category = null;
      }
    })

    const find = TestData.categories.find(value => value.id === id);
    TestData.categories.splice(TestData.categories.indexOf(find!), 1);
    return of(find!);
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

  update(category: Category): Observable<Category> {
    const find = TestData.categories.find(value => value.id === category.id);
    TestData.categories.splice(TestData.categories.indexOf(find!), 1, category);
    return of(find!);
  }


}
