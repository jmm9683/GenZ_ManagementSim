import { Component, Input} from '@angular/core';
import { Node } from '../../../d3';
import * as d3 from 'd3';
import {WebService} from '../../../webservice/web.service';


// add attr.d = draw()
@Component({
  selector: '[singleGroupVisual]',
  template: `
    <svg:g [attr.transform]="'translate('  + centroid[0] + ',' + (centroid[1]) + ') scale(' + scaleFactor + ')'" >
      <svg:path style="stroke-opacity:.5;fill-opacity:.1;" [attr.fill] = "color" [attr.stroke]="color" stroke-width="20"
      [attr.transform]="'scale(1) translate(0,0)'" [attr.d]="draw()">
     </path>
      <svg:text style="font-size:100px" [attr.fill]="color" *ngIf="group.length>0">{{this.groupname}}</svg:text>
    </svg:g>
  `,
  styleUrls: ['./group-visual.component.css']
})
export class SingleGroupVisualComponent {

  @Input('singleGroupVisual') group: Node[];
  @Input('name') groupname: String;
  @Input('color') color: String;
  // x and y coordinates of the center of the group
  public centroid = [];
  public scaleFactor = 1.2;

  constructor(private webService: WebService) {
  }

  // returns the polygon for the group
  polygonGenerator() {
    let node_coords = [];
    this.group.forEach(element => {
      node_coords.push([element.x, element.y])
    })
    return d3.polygonHull(node_coords);
  };

  draw(){
    if(!(this.group instanceof Array)) {
      console.log("not array")
      return;
    }

    if(this.group.length==0){
      console.log("empty array")
      return;
    }

    let polygon = this.polygonGenerator();

    if(!polygon){
      return;
    }

    let temp = d3.polygonCentroid(polygon);
    if(!(temp instanceof Array)||(temp.length!=2)){
      return;
    }

    this.centroid = d3.polygonCentroid(polygon);

    let centroid = this.centroid;

    let valueline = d3.line()
    .x(function(d) { return d[0]; })
    .y(function(d) { return d[1]; })
    .curve(d3.curveCatmullRomClosed);

    return valueline(
      polygon.map(function(point) {
        return [  point[0] - centroid[0], point[1] - centroid[1] ];
    }));
  }


}
