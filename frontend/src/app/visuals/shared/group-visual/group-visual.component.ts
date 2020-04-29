import { Component, Input, OnChanges} from '@angular/core';
import { Node } from '../../../d3';
import * as d3 from 'd3';
import {WebService} from '../../../webservice/web.service';
import { DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core';

// divide nodes based on group

// add attr.d = draw()
@Component({
  selector: '[groupVisual]',
  template: `
    <svg:g *ngFor="let nodes_ of array_groups; index as i">
      <svg:g *ngIf="nodes_.length > 0">
            <g [singleGroupVisual]="nodes_" [name]="reverse_mapping[i]" [color]="color_matrix[i%color_matrix.length]"></g>
      </svg:g>
    </svg:g>
  `,
  styleUrls: ['./group-visual.component.css']
})
export class GroupVisualComponent implements DoCheck {
  @Input('groupVisual') nodes: Node[];

  differ: KeyValueDiffer<string, any>;

  array_groups = [];

  color_matrix =
  ["rgb(51,255,153)","rgb(255,102,102)","rgb(38,137,223)",'yellow']


  mapping: Map<String, number> = new Map()
  reverse_mapping : Map<number, String> = new Map();

  // x and y coordinates of the center of the group

  // 2-d array of groups and their nodes
  groups: Map<String, Node[]> = new Map();

  public centroids: Map<String, number[]> = new Map();
  public scaleFactor = 1.2;

  constructor(private webService: WebService, private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create();
  }

  ngDoCheck() {
    // check for changes in groups for each node in nodes
    this.nodes.forEach(node => {
      const change = this.differ.diff(node);
      if (change) {
        change.forEachChangedItem(changed => {
          if (changed.key !== 'group') {
            return;
          }
          let groups = changed.currentValue;
          if(groups && groups.length > 0){
            groups.forEach(group => {
              if (!this.mapping[group]){
                // index for the mapping
                this.mapping[group] = this.array_groups.length;
                this.reverse_mapping[this.array_groups.length] = group;
              }
              // check if node has already been added

              // if this group hasnt been added
              if (this.mapping[group] >= this.array_groups.length){
                this.array_groups.push([]);
              }

              //console.log(this.mapping[group] + " " + this.array_groups.length);

              let added = this.array_groups[this.mapping[group]].some(e => e.url === node.url);
              if (added === false) {
                this.array_groups[this.mapping[group]].push(node);
              }
            });
          }
        });
      }
    });
  }
}

function add_array(value, key, map) {
  console.log(value);
}
