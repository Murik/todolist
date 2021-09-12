import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Priority} from "../model/Priority";
import {Task} from "../model/Task";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }

  getCategories(): Category[]{
   return TestData.categories;
  }

  getPriorities(): Priority[]{
    return TestData.priorities;
  }

  getTasks(): Task[]{
    return TestData.tasks;
  }
}
