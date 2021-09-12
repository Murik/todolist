import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CategoriesComponent} from './view/categories/categories.component';
import {TaskComponent} from './view/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
