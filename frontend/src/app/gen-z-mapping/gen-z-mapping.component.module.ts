import { NgModule } from '@angular/core';
import { GenZMappingComponent } from './gen-z-mapping.component'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { D3Service, D3_DIRECTIVES } from '../d3';
import { GraphComponent } from '../visuals/graph/graph.component';
import { SHARED_VISUALS } from '../visuals/shared';
import { CommonModule } from '@angular/common';
import { SingleObjectModule } from 'app/single-object/singleObject.module';


@NgModule({
  imports:      [CommonModule, FormsModule, HttpClientModule, SingleObjectModule],
  declarations: [ GenZMappingComponent, GraphComponent, ...SHARED_VISUALS,  ...D3_DIRECTIVES],
  exports:      [ GenZMappingComponent],
  providers:    [D3Service],
})

export class GenZMappingModule {}
