import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class WebService {
    // Backend URL
    BASE_URL = 'http://localhost:63145'

    private objectStore;
    private objectsSubject = new Subject();
    allobjects = this.objectsSubject.asObservable();

    private singleObjectStore;
    private singleObject = new Subject();
    specificobject = this.singleObject.asObservable();

    private singleEndpointStore;
    private singleEndpoint = new Subject();
    specificendpoint = this.singleEndpoint.asObservable();

    private singleZoneStore;
    private singleZone = new Subject();
    specificzone = this.singleZone.asObservable();

    private domainStore;
    private domainsSubject = new Subject();
    alldomains = this.domainsSubject.asObservable();

    private nodeStore;
    private nodeSubject = new Subject();
    allnodes = this.nodeSubject.asObservable();

    private edgeStore;
    private edgeSubject = new Subject();
    alledges = this.edgeSubject.asObservable();

    private zoneStore;
    private zoneSubject = new Subject();
    allzones = this.zoneSubject.asObservable();

    constructor(private http: HttpClient){
    }


    public getZones(){
      this.http.get(this.BASE_URL+'/object/isZone').subscribe(response =>{
        if(!Array.isArray(response)) {
            this.zoneStore = [response];
        }
        else{
            this.zoneStore = response;
            // console.log("GET all zones");
            // console.log(response);
        }
        this.zoneSubject.next(this.zoneStore)
    }, error => {
            this.handleError("Unable to get systems.");
          });
    }

    getEndpointByURL(url){
      const body = { 'Id' : url, 'isEndpoint': true}
      // console.log(url);
      if(!url){
        this.singleEndpointStore = {'Empty': 'None'};
        this.singleEndpoint.next(this.singleEndpointStore);
        return;
      }

      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      this.http.post(this.BASE_URL + '/object/search/', body, config).subscribe(response => {
        // console.log("POST specific object");
        // console.log(response);
        if(!Array.isArray(response)) {
          this.singleEndpointStore = [response];
        }
        else{
          this.singleEndpointStore = response;
        }
        this.singleEndpoint.next(this.singleEndpointStore);
      }, error => {
        this.handleError("Unable to get endpoint.");
      });
    }


    getZoneByURL(url){
      const body = { 'Id' : url, 'isZone': true}
      if(!url){
        this.singleZoneStore = {'Empty': 'None'};
        this.singleZone.next(this.singleZoneStore);
        return;
      }

      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      this.http.post(this.BASE_URL + '/object/search/', body, config).subscribe(response => {
        if(!Array.isArray(response)) {
          this.singleZoneStore = [response];
        }
        else{
          this.singleZoneStore = response;
        }
        this.singleZone.next(this.singleZoneStore);
      }, error => {
        this.handleError("Unable to get endpoint.");
      });
    }

    getObjectById(id){
          const body = { '_id' : id}
          const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
          this.http.post(this.BASE_URL + '/object/search/', body, config).subscribe(response =>{
            // console.log("POST specific object");
            // console.log(response);
            if(!Array.isArray(response)) {
              this.singleObjectStore = [response];
            }
            else{
              this.singleObjectStore = response;
            }
            this.singleObject.next(this.singleObjectStore);
          }, error => {
            this.handleError("Unable to get systems.");
          });
      }


    getObjectByURL(url){
        const body = { 'Id' : url}
        const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
        this.http.post(this.BASE_URL + '/object/search/', body, config).subscribe(response =>{
          // console.log("POST specific object");
          // console.log(response);
          if(!Array.isArray(response)) {
            this.objectStore = [response];
          }
          else{
            this.objectStore = response;
          }
          this.singleObject.next(this.objectStore);
        }, error => {
          this.handleError("Unable to get systems.");
        });
    }

    public getAllObjects(){
        // gets and returns all objects
        this.http.get(this.BASE_URL+'/object').subscribe(response =>{
            if(!Array.isArray(response)) {
                this.objectStore = [response];
            }
            else{
                this.objectStore = response;
                // console.log("GET all objects");
                // console.log(response);
            }
            this.objectsSubject.next(this.objectStore)
        }, error => {
                this.handleError("Unable to get systems.");
              });
    }

    public getEndpoints(){
      this.http.get(this.BASE_URL+'/object/isEndpoint').subscribe(response =>{
        if(!Array.isArray(response)) {
            this.edgeStore = [response];
        }
        else{
            this.edgeStore = response;
            // console.log("GET all edges");
            // console.log(response);
        }
        this.edgeSubject.next(this.edgeStore)
    }, error => {
            this.handleError("Unable to get systems.");
          });
    }

    public getSwitches(){
      this.http.get(this.BASE_URL+'/object/isSwitch').subscribe(response =>{
        if(!Array.isArray(response)) {
            this.nodeStore = [response];
        }
        else{
            this.nodeStore = response;
            // console.log("GET all nodes");
            // console.log(response);
        }
        this.nodeSubject.next(this.nodeStore)
    }, error => {
            this.handleError("Unable to get systems.");
          });
    }

    public getAllDomains(){
      // gets and returns all domains
      this.http.get(this.BASE_URL+'/domain').subscribe(response =>{
        if(!Array.isArray(response)) {
            this.domainStore = [response];
        }
        else{
            this.domainStore = response;
            // console.log("GET all objects");
            // console.log(response);
        }
        this.domainsSubject.next(this.domainStore);
    }, error => {
            this.handleError("Unable to get systems.");
          });
    }

    public addNewDomain(id){
      const body = {'Id':id};
      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      this.http.post(this.BASE_URL + '/domain', body, config).subscribe(response =>{
        // console.log("POST specific object");
        // console.log(response);
      }, error => {
        this.handleError("Unable to add domain.");
      });
    }


    public removeDomain(id){
      const body = {'Id': id};
      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      this.http.post(this.BASE_URL + '/domain/delete', body, config).subscribe(response => {
        console.log(response);
      }, error => {
        this.handleError("Unable to remove domain.");
      });
    }

    // postMessage(message){
    //     this.http.post(this.BASE_URL + '/message', message).subscribe(response => {
    //       this.systemStore.push(response);
    //       this.systemSubject.next(this.systemStore);
    //     }, error => {
    //       this.handleError("Unable to post message.")
    //     });

    // }

    private handleError(error){
      console.error(error);
    }
}

