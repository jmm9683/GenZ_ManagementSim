import { Component, Input} from '@angular/core';
import { Node } from '../../../d3';
import {WebService} from '../../../webservice/web.service';

// add name of the node above when hover

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


  constructor(private webService: WebService) {
  }

  onClick(){
    // change the color of the component

    // get the data details for the id from the webservice

    // change the text on the Data details panel


    // change inner html to template with json as data


    this.webService.getObjectByURL(this.node.url);
    this.webService.getEndpointByURL(this.node.endpoint_url);
    document.getElementById("nodename").innerText = this.node.url;
    // clear the help text
    document.getElementById("componentjson").innerText = "Component JSON";
    document.getElementById("endpointjson").innerText = "Endpoint JSON";
    document.getElementById("mapping-help").innerText = "";
  }

  onHover(evt){
    //evt.CurrentTarget.addClass('selectednode');
    //console.log("hovering");
  }

  offHover(evt){
    //evt.CurrentTarget.removeClass('selectednode');
  }

}
