import { Component, Input, ElementRef } from '@angular/core';
import { Node } from '../../../d3';
import { SingleObjectViewerComponent } from 'app/single-object/single-object-viewer/single-object-viewer.component';
import {ViewChild} from '@angular/core';
import {WebService} from '../../../webservice/web.service';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'" (click)="onClick()"
    (mouseenter) ="onHover()" (mouseleave) ="offHover()">
      <svg:circle
          class="node"
          [attr.fill]="node.color"
          cx="0"
          cy="0"
          [attr.r]="node.r">
      </svg:circle>
      <svg:text
          class="node-name"
          [attr.font-size]="node.fontSize">
        {{node.id}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
  @ViewChild('nodeinfo', { static: false }) infoRef: SingleObjectViewerComponent;
  @ViewChild('nodename', { static: false }) nameRef: ElementRef;


  constructor(private webService: WebService) {
  }

  onClick(){
    // change the color of the component

    // get the data details for the id from the webservice

    // change the text on the Data details panel


    // change inner html to template with json as data


    this.webService.getObjectByURL(this.node.url);
    document.getElementById("nodename").innerText = this.node.url;
    this.webService.specificobject.subscribe( response => {
      console.log(response);
      let data = response;
      document.getElementById("nodedata").innerText = JSON.stringify(data);
    });
  }

  onHover(evt){
    evt.CurrentTarget.addClass('selectednode');
    console.log("hovering");
  }

  offHover(evt){
    evt.CurrentTarget.removeClass('selectednode');
  }

}
