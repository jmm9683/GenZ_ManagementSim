import { NgModule } from '@angular/core';
import { DomainTableComponent } from './domain-table.component'
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports:      [ FormsModule, CommonModule, ReactiveFormsModule],
  declarations: [ DomainTableComponent],
  exports:      [ DomainTableComponent],
})

export class DomainTableModule {}
