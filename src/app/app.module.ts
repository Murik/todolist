import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CategoriesComponent} from './view/categories/categories.component';
import {TaskComponent} from './view/task/task.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {EditTaskModalComponent} from './dialog/edit-task-modal/edit-task-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ConfirmModalComponent} from './dialog/confirm-modal/confirm-modal.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {TaskDatePipe} from './pipe/task-date.pipe';
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {MatCheckboxModule} from "@angular/material/checkbox";

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TaskComponent,
    EditTaskModalComponent,
    ConfirmModalComponent,
    TaskDatePipe
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [],
  entryComponents:[
    EditTaskModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
