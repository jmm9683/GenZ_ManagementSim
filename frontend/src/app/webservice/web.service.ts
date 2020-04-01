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

    private singleObject = new Subject();
    specificobject = this.singleObject.asObservable();

    private domainStore;
    private domainsSubject = new Subject();
    alldomains = this.domainsSubject.asObservable();

    constructor(private http: HttpClient){
    }

    getObjectById(id){
          const body = { '_id' : id}
          const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
          this.http.post(this.BASE_URL + '/object/search/', body, config).subscribe(response =>{
            console.log("POST specific object");
            console.log(response);
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
                console.log("GET all objects");
                console.log(response);
            }
            this.objectsSubject.next(this.objectStore)
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
            console.log("GET all objects");
            console.log(response);
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
        console.log("POST specific object");
        console.log(response);
      }, error => {
        this.handleError("Unable to add domain.");
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

