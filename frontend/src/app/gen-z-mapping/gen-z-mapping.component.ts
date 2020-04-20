import { Component, OnInit, AfterViewInit } from '@angular/core';
import APP_CONFIG from './gen-z-mapping.config';
import { Node, Link } from '../d3';
import {combineLatest, Observable, of} from 'rxjs';
import * as d3 from 'd3';
import {WebService } from '../webservice/web.service';
import {ViewChild, ElementRef} from '@angular/core';
import { GraphComponent } from '../visuals/graph/graph.component';
import { PassThrough } from 'stream';

@Component({
  selector: 'gen-z-mapping',
  templateUrl: './gen-z-mapping.component.html',
  styleUrls: ['./gen-z-mapping.component.css']
})

export class GenZMappingComponent implements OnInit, AfterViewInit{
  nodes: Node[] = [];
  links: Link[] = [];
  nodes$: Observable<any>;
  edges$: Observable<any>;
  num_nodes: number;
  mapping: Map<string, number> = new Map();

  @ViewChild('genzmapping', { static: false }) graphRef: GraphComponent;

  constructor(private webService: WebService) {
    const N = APP_CONFIG.N,
          getIndex = number => number - 1;



    /** constructing the nodes array */


    // this.nodes.push(new Node("a"));
    // this.nodes.push(new Node("p"));

    // for (let i = 1; i <= N; i++) {
    //   for (let m = 2; i * m <= N; m++) {
    //     /** increasing connections toll on connecting nodes */
    //     this.nodes[getIndex(i)].linkCount++;
    //     this.nodes[getIndex(i * m)].linkCount++;

    //     /** connecting the nodes before starting the simulation */
    //     // if(Math.random()<.1){
    //     //   this.links.push(new Link(i-1, (i * m)-1));
    //     // }
    //   }
    // }
  }

  ngOnInit(){
    let index = 0;
    this.webService.getEndpoints();
    this.webService.alledges.subscribe( response => {

      let mapping = new Map();

      Array(response)[0].forEach(element => {
        let node = new Node("e "+index);
        node.linkCount++;
        node.url = element['Id'];
        node.type = 'Endpoint';
        this.graphRef.graph.nodes.push(node);
        this.graphRef.graph.initNodes();
        this.graphRef.graph.simulation.restart();

        mapping.set(element['Id'], index);
        index++;

        let entities = Array(element['jsonFile']['ConnectedEntities'])[0];
        console.log(entities);

        if(entities instanceof Object){
          entities.forEach(entity => {
            if((entity['EntityType']!='Switch')&&(entity['EntityType']!='Bridge')){
              // create node for component
              let entityid = element['domainID'] + entity['EntityLink']['@odata.id'];

              if(mapping.has(entityid)==false){
                mapping.set(entityid,index);
                let node = new Node("c "+index);
                node.linkCount++;
                node.url = entityid;
                node.type = 'Component';
                this.graphRef.graph.nodes.push(node);
                this.graphRef.graph.initNodes();
                index++;
              }
              this.graphRef.graph.links.push(new Link(mapping.get(element['Id']), mapping.get(entityid)));
              this.graphRef.graph.initLinks();
            }
          });
        }
      });

      this.webService.getSwitches();
      this.webService.allnodes.subscribe( response => {
        Array(response)[0].forEach(element => {
          let node = new Node("s "+index);
          node.linkCount++;
          node.url = element['Id'];
          node.type = 'Switch'
          let endpoint = element['domainID']+element['jsonFile']['Links']['AssociatedEndpoints'][0]['@odata.id'];

          console.log(mapping.get(endpoint));

          this.graphRef.graph.nodes.push(node);
          this.graphRef.graph.initNodes();

          mapping.set(element['Id'], index);

          this.graphRef.graph.links.push(new Link(index, mapping.get(endpoint)))
          this.graphRef.graph.initLinks();

          index++;


          // create fabric adapter node if haven't been created already

          let fabricadapter = element['domainID']+element['jsonFile']['Links']['ConnectedAdapterPorts'][0]['@odata.id'];

          console.log(fabricadapter)
          if(mapping.has(fabricadapter)==false){
            mapping.set(fabricadapter,index);
            let node = new Node("ad"+index);
            node.type = 'Adapter';
            node.linkCount++;
            node.url = fabricadapter;
            this.graphRef.graph.nodes.push(node);
            this.graphRef.graph.initNodes();
            index++;
          }
          this.graphRef.graph.links.push(new Link(mapping.get(element['Id']), mapping.get(fabricadapter)));
          this.graphRef.graph.initLinks();
          this.graphRef.graph.simulation.restart();
        });
      });

    });
  }


  ngAfterViewInit() {

    this.mapping.forEach((value:number,key:string)=>{
      console.log(key);
    });



    // let index = 0;
    // // adding endpoints
    // this.webService.getEdges();
    // this.webService.alledges.subscribe( response => {
    //   let existingnodes = new Map<string, number>();
    //   Array(response)[0].forEach(element => {
    //     // add node to nodes
    //     //this.nodes.push(new Node(1));
    //     let node = new Node("e "+index);
    //     // add names of nodes and the respective index

    //     let eindex = index;

    //     let entities = Array(element['jsonFile']['ConnectedEntities'])[0]
    //     try{
    //       entities.forEach(entity =>{

    //         let id = element['domainID'] + entity['EntityLink']['@odata.id']
    //         console.log(existingnodes.has(id));

    //         if(existingnodes.has(id)==false){
    //           existingnodes.set(id,index);
    //           this.webService.getObjectByURL(id);
    //           this.webService.specificobject.subscribe( response => {
    //             try{
    //               console.log(response[0]['@odata'])

    //               var node = new Node("n "+index);
    //               node.linkCount=.5;
    //               node.data = response[0];
    //               this.graphRef.graph.nodes.push(node);
    //               this.graphRef.graph.initNodes();

    //               // add link from endpoint to component
    //               this.graphRef.graph.links.push(new Link(index,index+1));
    //               if (index > 2) {
    //                 this.graphRef.graph.links.push(new Link(eindex, index));
    //                 this.graphRef.graph.initLinks();
    //                 this.graphRef.graph.simulation.restart();
    //               }
    //               this.graphRef.graph.simulation.restart();
    //               index++;
    //             }
    //             catch(e){console.log(e)}
    //           });
    //         }
    //       });
    //     } catch(e){}
    //     node.linkCount++;
    //     node.data = element;
    //     this.graphRef.graph.nodes.push(node);
    //     this.graphRef.graph.initNodes();
    //     this.graphRef.graph.simulation.restart();
    //     index++;
    //   });
    // });

    // let index = 0;
    // this.webService.getEdges();
    // this.webService.alledges.subscribe( response => {
    //   Array(response)[0].forEach(element => {
    //     let node = new Node("e "+index);
    //     node.linkCount++;
    //     node.data = element;
    //     this.graphRef.graph.nodes.push(node);
    //     this.graphRef.graph.initNodes();
    //     this.graphRef.graph.simulation.restart();
    //     index++;
    //   });
    // });


  }

  // add a node to the mapping



  // add a link to the mapping



}

