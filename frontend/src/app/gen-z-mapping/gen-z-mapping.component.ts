import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Node, Link } from '../d3';
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


  // returns the correct full url checking for leading connection url


  geturl(domainID: string, link: string){
    if(link.split(":").length > 1){
      // add leading http:
      //console.log(link);
      return "http://"+link;
    }
    return domainID+link;
  }

  ngOnInit(){
    let index = 0;

    // get endpoints

    this.webService.getEndpoints();
    this.webService.alledges.subscribe((response:any[]) => {
      // mapping maps the link to the node's index
      let mapping = new Map();

      console.log(response);


      // create Fabric Manager Node

      let node = new Node("Gen-Z");
      node.linkCount+=20;
      node.url = "Endpoint";
      this.mapping.set("Gen-Z", index);
      this.graphRef.graph.nodes.push(node);
      index++;
      this.graphRef.graph.initNodes();

      response.forEach( endpoint => {
        if (!mapping.has(endpoint['Id'])) {

          // links

          let link_indexes = [];
          let entity_indexes = [];


          // create new nodes for component link
          let links = endpoint['jsonFile']['Links']
          // chassis based
          if(links instanceof Object && links['Chassis']){
            links['Chassis'].forEach( link => {
              // create node for link
              let entityid = this.geturl(endpoint['domainID'], link['@odata.id']);
              let temp = entityid.split("/");
              if(mapping.has(entityid) == false){

                let node = new Node("c "+index);
                node.linkCount++;
                node.url = entityid
                node.endpoint_url = endpoint['Id'];
                // node.type
                this.graphRef.graph.nodes.push(node);
                // set entity link to
                mapping.set(entityid, index);
                link_indexes.push(index);
                index++;

                // also map element['domainID'] split link to this index
                if(temp[2]!=endpoint['domainID']){
                  temp[2] = endpoint['domainID'];
                  mapping.set(temp.join("/"), index);
                }
              }
              else{
                // if link already created, then change endpoint to this
                let found_node = this.graphRef.graph.nodes[mapping.get(entityid)];
                found_node.endpoint_url = endpoint['Id'];
                link_indexes.push(mapping.get(entityid));
              }
              this.graphRef.graph.initNodes();
            });
          }

          // switch port based

          if(links instanceof Object && links['ConnectedSwitchPorts']){
            links['ConnectedSwitchPorts'].forEach( link => {
              // create node for link
              let entityid = this.geturl(endpoint['domainID'], link['@odata.id']);
              let temp = entityid.split("/");
              if(mapping.has(entityid) == false){

                let node = new Node("c "+index);
                node.linkCount++;
                node.url = entityid
                node.endpoint_url = endpoint['Id'];
                node.type = "Switch Port";
                this.graphRef.graph.nodes.push(node);
                // set entity link to
                mapping.set(entityid, index);
                // set endpoint to index
                mapping.set(endpoint['Id'], index);
                link_indexes.push(index);
                index++;

                // also map element['domainID'] split link to this index
                if(temp[2]!=endpoint['domainID']){
                  temp[2] = endpoint['domainID'];
                  mapping.set(temp.join("/"), index);
                }
              }
              else{
                // if link already created, then change endpoint to this
                let found_node = this.graphRef.graph.nodes[mapping.get(entityid)];
                found_node.endpoint_url = endpoint['Id'];
                link_indexes.push(mapping.get(entityid));
              }
              this.graphRef.graph.initNodes();
            });
          }



          // create new nodes for connected entities
          let entities = endpoint['jsonFile']['ConnectedEntities'];
          if(entities instanceof Object){
            entities.forEach( entity => {

              let entitylink = entity['EntityLink']['@odata.id'];
              let entityrole = entity['EntityRole'];
              if(!entitylink){
                entitylink = entity['EntityLink'];
              }
              let entityid = this.geturl(endpoint['domainID'], entitylink);
              let temp = entityid.split("/");
              if(mapping.has(entityid) == false) {
                let node = new Node("c "+index);
                node.linkCount++;
                node.url = entityid
                // node.endpoint_url = endpoint['Id'];
                node.type = entity['EntityType']
                this.graphRef.graph.nodes.push(node);
                this.graphRef.graph.initNodes();
                // set entity link to
                mapping.set(entityid, index);

                if(entity['EntityType'] =='MediaController'){
                  console.log(endpoint);
                  console.log(links);
                  console.log(mapping.get(entityid));
                }

                // if adapater
                if(node.url.includes("Adapter")){
                  //add link to gen-z
                  this.graphRef.graph.links.push(new Link(index, 0));
                  this.graphRef.graph.initLinks();
                }

                if(entity['EntityRole']!='Target') {
                  entity_indexes.push(index);
                }

                // also map element['domainID'] split link to this index
                if(temp[2]!=endpoint['domainID']){
                  temp[2] = endpoint['domainID'];
                  mapping.set(temp.join("/"), index);
                }
                index++;
              }
              else{
                if(entity['EntityRole']!='Target') {
                  entity_indexes.push(mapping.get(entityid));
                }
              }
            });
          }
          // add links between the connected entities and the component
          console.log(endpoint,link_indexes,entity_indexes);
          for(var i=0; i<link_indexes.length; i++){
            for(var j=0; j<entity_indexes.length;j++){
              // push link between
              this.graphRef.graph.links.push(new Link(link_indexes[i], entity_indexes[j]));
              this.graphRef.graph.initLinks();
            }
          }

        }

      });


      // add connect switch ports to switches

      for (let node of this.graphRef.graph.nodes){

        if(node.url.includes('Switches') && node.url.includes('Ports')){
          let temp = Array.from(node.url.split("/"));
          let sub = temp.slice(0,temp.length-2);
          let switch_name = sub.join("/");
          this.graphRef.graph.nodes[mapping.get(switch_name)].linkCount+=5;
          this.graphRef.graph.links.push(new Link(mapping.get(switch_name), mapping.get(node.url)));
          this.graphRef.graph.initLinks();
        }
      }



      // add zones
      this.webService.getZones();
      this.webService.allzones.subscribe( (response: any[]) =>{
        response.forEach(element => {
          // support zone of zones (check contains)
          if(element['jsonFile']['ZoneType'] === 'ZoneOfEndpoints'){
            let endpoints = element['jsonFile']['Links']['Endpoints'];
            let zone_name = element['jsonFile']['Description'];
            endpoints.forEach(endpoint=> {
              let endpointurl = this.geturl(element['domainID'], endpoint['@odata.id']);
              // for each endpoint, find corresponding node

              if(mapping.has(endpointurl)){
                let endpoint_node = this.graphRef.graph.nodes[mapping.get(endpointurl)]
                endpoint_node.group.push(zone_name); // push zone_name if zone not already added
                endpoint_node.group_urls.push(element['Id']);
              }
              else{
                console.log(endpointurl);
              }
            })
          }
          // if(element['jsonFile']['ZoneType']=='ZoneOfZones'){
          //   let zone_url = element['Id'];
          //   let zone_name = element['jsonFile']['Description'];
          //   this.addRecursiveZone(element, zone_name, zone_url, mapping);
          // }
        });
      })

    })
  }

  init(){
    let index = 0;


    // create zones

    this.webService.getEndpoints();
    this.webService.alledges.subscribe( (response: any[]) => {

      let mapping = new Map();
      //console.log(response);

      response.forEach(element => {
        if(!mapping.has(element['Id'])){
          let node = new Node("e "+index);
          node.linkCount++;
          node.url = element['Id'];
          node.endpoint_url = element['Id'];
          node.type = 'Endpoint';
          this.graphRef.graph.nodes.push(node);

          this.graphRef.graph.initNodes();
          this.graphRef.graph.simulation.restart();

          mapping.set(element['Id'], index);
          //index++;

          let entities = element['jsonFile']['ConnectedEntities'];

          let links = element['jsonFile']['Links'];

          if(links instanceof Object && links['Chassis'] ){
            links['Chassis'].forEach(link => {
              // create node for component
              let entityid = this.geturl(element['domainID'], link['@odata.id']);
              let temp = entityid.split("/");
              if(mapping.has(entityid) == false){

                // set entity link to
                mapping.set(entityid, index);

                // also map element['domainID'] split link to this index
                if(temp[2]!=element['domainID']){
                  //console.log(temp);
                  temp[2] = element['domainID'];
                  mapping.set(temp.join("/"), index);
                }

                //mapping.set(element['Id'],index)
                //let node = new Node("c "+index);
                node.url = entityid;
                node.type="";
                //this.graphRef.graph.nodes.push(node);
                this.graphRef.graph.initNodes();
              }
              // this.graphRef.graph.links.push(new Link(mapping.get(element['Id']), mapping.get(entityid)));
              // this.graphRef.graph.initLinks();

            });
          }
          index++;


          if(entities instanceof Object){
            entities.forEach(entity => {
              if(entity['EntityRole']=='Target' && entity['EntityType']=='Switch'){
                // convert endpoint to type switch
                let entityid = this.geturl(element['domainID'], entity['EntityLink']['@odata.id']);

                if(mapping.has(entityid) == false){
                  let node = this.graphRef.graph.nodes[mapping.get(element['Id'])]
                  node.linkCount++;
                  node.url = entityid;
                  node.type='Switch';
                  node.id = "e "+node.index;

                  mapping.set(entityid,mapping.get(element['Id']));
                  //mapping.set(element['Id'],index)
                  //let node = new Node("c "+index);
                  //this.graphRef.graph.nodes.push(node);
                  this.graphRef.graph.initNodes();
                }
              }
              if(entity['EntityRole']=='Initiator' && entity['EntityType']=='Bridge'){
                  // convert endpoint to type fabric adapter
                  let entityid = this.geturl(element['domainID'], entity['EntityLink']['@odata.id']);

                  if(mapping.has(entityid) == false){
                    let node = this.graphRef.graph.nodes[mapping.get(element['Id'])]
                    node.linkCount++;
                    node.url = entityid;
                    node.type='Adapter';
                    node.id = "a "+node.index;

                    mapping.set(entityid,mapping.get(element['Id']));
                    //mapping.set(element['Id'],index)
                    //let node = new Node("c "+index);
                    //this.graphRef.graph.nodes.push(node);
                    this.graphRef.graph.initNodes();
                  }
              }else{
                  if(entity['EntityRole']!='Target' || entity['EntityType'] != 'MemoryChunk') {
                  // create node for component

                  let entityid = this.geturl(element['domainID'], entity['EntityLink']['@odata.id']);

                  if(mapping.has(entityid) == false){
                    //
                    let node = new Node("c "+index);
                    node.linkCount++;
                    node.url = entityid;
                    node.type = entity['EntityType'];
                    node.endpoint_url = element['Id'];
                    this.graphRef.graph.nodes.push(node);
                    mapping.set(entityid, index);
                    this.graphRef.graph.initNodes();
                    index++;
                  }
                  this.graphRef.graph.links.push(new Link(mapping.get(element['Id']), mapping.get(entityid)));
                  this.graphRef.graph.initLinks();
                }
              }

            });
          }
        }


      });
      // create switch ports
      this.webService.getSwitches();
      this.webService.allnodes.subscribe( (response: any[]) => {
        console.log(response);
        Array(response)[0].forEach(element => {

          // Switch ports

          if(!mapping.has(element['Id'])){
            let endpoint = this.geturl(element['domainID'], element['jsonFile']['Links']['AssociatedEndpoints'][0]['@odata.id']);
            let switch_port_node = this.graphRef.graph.nodes[mapping.get(endpoint)]
            switch_port_node.linkCount++;
            switch_port_node.url = element['Id'];
            switch_port_node.type = 'Switch Port'

            // this.graphRef.graph.nodes.push(node);
            this.graphRef.graph.initNodes();

            mapping.set(element['Id'], mapping.get(endpoint));

            // this.graphRef.graph.links.push(new Link(index, mapping.get(endpoint)))
            // this.graphRef.graph.initLinks();

            //index++;

            // add links to parent switch --->

            let temp1 = Array.from(element['Id'].split("/"))
            let portname = temp1[temp1.length - 3]

            for (let switchnode of this.graphRef.graph.nodes){
              let temp = Array.from(switchnode.url.split("/"));
              let switchname = temp[temp.length - 1];

              if((switchnode.type == "Switch") && (portname===switchname) && (switch_port_node.url.includes(switchnode.url))){
                // adding switch links
                //console.log(switchnode.id+" "+switch_port_node.id+"  "+switchnode.url+"     "+element['Id']+ "  "+mapping.get(endpoint));
                switchnode.linkCount+=10;
                this.graphRef.graph.links.push(new Link(mapping.get(switchnode.url), mapping.get(endpoint)));
                this.graphRef.graph.initLinks();
                this.graphRef.graph.simulation.restart();
                break;
              }
            }
          }
          // create fabric adapter node if haven't been created already
          console.log(element['jsonFile']);

          if(element['jsonFile']['Links']['ConnectedAdapterPorts']){
            let fabricadapter = this.geturl(element['domainID'], element['jsonFile']['Links']['ConnectedAdapterPorts'][0]['@odata.id']);

            //console.log(fabricadapter)
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
          }
        });
        // set each node to a zone based on get zones
        this.webService.getZones();
        this.webService.allzones.subscribe( (response: any[]) =>{
          response.forEach(element => {
            // support zone of zones (check contains)
            if(element['jsonFile']['ZoneType'] === 'ZoneOfEndpoints'){
              let endpoints = element['jsonFile']['Links']['Endpoints'];
              let zone_name = element['jsonFile']['Description'];
              endpoints.forEach(endpoint=> {
                let endpointurl = this.geturl(element['domainID'], endpoint['@odata.id']);
                // for each endpoint, find corresponding node
                let endpoint_node = this.graphRef.graph.nodes[mapping.get(endpointurl)]
                endpoint_node.group.push(zone_name);
                endpoint_node.group_urls.push(element['Id']);
                // console.log(element['Id']);
              })
            }
            if(element['jsonFile']['ZoneType']=='ZoneOfZones'){
              let zone_url = element['Id'];
              let zone_name = element['jsonFile']['Description'];
              this.addRecursiveZone(element, zone_name, zone_url, mapping);
            }
          });
        })


      });

    });
  }


  // recursive adds zone info to nodes
  addRecursiveZone(element, zone_name, zone_url, mapping){

    // recursively add zone info
    if(!element['jsonFile']){element = element[0]}
    //console.log(zone_name+" "+element['Id']);
    if(element['jsonFile']['ZoneType']=='ZoneOfEndpoints'){
      let endpoints = element['jsonFile']['Links']['Endpoints'];
      endpoints.forEach(endpoint=> {
        let endpointurl =  this.geturl(element['domainID'], endpoint['@odata.id']);
        // for each endpoint, find corresponding node
        let endpoint_node = this.graphRef.graph.nodes[mapping.get(endpointurl)]

        // if zone name not already in zone names
        if(-1 == endpoint_node.group.findIndex(element => element === zone_name)){
          endpoint_node.group.push(zone_name);
        }
        endpoint_node.group_urls.push(zone_url);
        //console.log(element['Id']);
      })
    }
    // TODO: move this to the after all zones are created
    if(element['jsonFile']['ZoneType']=='ZoneOfZones'){
      let subzones = element['jsonFile']['Links']['Contains'];
      // for each subzone get the endpoints for that zone
      subzones.forEach(subzone => {
        //console.log(subzone)
        // call addRecursiveZone using new element

        let temp = subzone['@odata.type']

        if(!temp){temp = subzone['@odata.id']}

        let subzone_url = this.geturl(element['domainID'],temp);
        //console.log(subzone_url);
        this.webService.getZoneByURL(subzone_url);
        this.webService.specificzone.subscribe(subzone => {
          this.addRecursiveZone(subzone, zone_name, zone_url, mapping);
        });
      });
    }
  }


  ngAfterViewInit() {

    // this.mapping.forEach((value: number, key: string) => {
    //   console.log(key);
    // });
    // // after nodes have been added

  }

  // add a node to the mapping



  // add a link to the mapping



}

