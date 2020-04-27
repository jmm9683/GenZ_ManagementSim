import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Node, Link } from '../d3';
import {combineLatest, Observable, of} from 'rxjs';
import {WebService } from '../webservice/web.service';
import {ViewChild, ElementRef} from '@angular/core';
import { GraphComponent } from '../visuals/graph/graph.component';

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

  constructor(public webService: WebService) {
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


    // create zones

    this.webService.getEndpoints();
    this.webService.alledges.subscribe( response => {

      let mapping = new Map();
      console.log(response);

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

        let entities = element['jsonFile']['ConnectedEntities'];

        let links = element['jsonFile']['Links'];

        if(links instanceof Object && links['Chassis'] ){
          links['Chassis'].forEach(link => {
            // create node for component
            let entityid = element['domainID'] + link['@odata.id'];

            if(mapping.has(entityid) == false){
              mapping.set(entityid,index);
              //mapping.set(element['Id'],index)
              let node = new Node("c "+index);
              node.linkCount++;
              node.url = entityid;
              node.endpoint_url = element['Id'];
              this.graphRef.graph.nodes.push(node);
              this.graphRef.graph.initNodes();
              index++;
            }
            this.graphRef.graph.links.push(new Link(mapping.get(element['Id']), mapping.get(entityid)));
            this.graphRef.graph.initLinks();

          });
        }


        if(entities instanceof Object){
          entities.forEach(entity => {
            if(entity['EntityRole']!='Target' || entity['EntityType'] != 'MemoryChunk') {
              // create node for component
              let entityid = element['domainID'] + entity['EntityLink']['@odata.id'];

              if(mapping.has(entityid) == false){
                mapping.set(entityid,index);
                let node = new Node("c "+index);
                node.linkCount++;
                node.url = entityid;
                node.type = entity['EntityType'];
                node.endpoint_url = element['Id'];
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
        // set each node to a zone based on get zones
        this.webService.getZones();
        this.webService.allzones.subscribe(response=>{
          response.forEach(element => {
            let endpoints = element['jsonFile']['Links']['Endpoints'];
            let zone_name = element['jsonFile']['Description'];
            endpoints.forEach(endpoint=> {

              let endpointurl =  element['domainID']+endpoint;
              console.log(mapping.get(endpointurl));
              // for each endpoint, find corresponding node
              let endpoint_node = this.graphRef.graph.nodes.find(node => node.endpoint_url==endpointurl);
              console.log(endpoint_node);
              endpoint_node.group = zone_name;
            })


          });
        })


      });

    });
  }


  ngAfterViewInit() {

    this.mapping.forEach((value: number, key: string) => {
      console.log(key);
    });
    // after nodes have been added

  }

  // add a node to the mapping



  // add a link to the mapping



}

