import { HttpClient } from '@angular/common/http';
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

    constructor(private http: HttpClient){
      this.getAllObjects();
    }

    getObject(id){
          id = (id) ? '/' + id : '';
          this.http.get(this.BASE_URL + '/system' + id).subscribe(response =>{

            if(!Array.isArray(response)) {
              this.objectStore = [response];   
            }  
            else{
              this.objectStore = response;   
            } 
            this.objectsSubject.next(this.objectStore);
          }, error => {
            this.handleError("Unable to get systems.");
          });
      }

    getAllObjectsService(){
        return this.http.get(this.BASE_URL+'/object');
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

