import { NgModule } from '@angular/core';
import { TableListComponent } from './table-list.component'
import { FilterPipe} from './filter.pipe';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports:      [ FormsModule, CommonModule, ReactiveFormsModule],
  declarations: [ TableListComponent, FilterPipe ],
  exports:      [TableListComponent, FilterPipe],
  providers:    [ FilterPipe ]
})

export class TableListModule {}
