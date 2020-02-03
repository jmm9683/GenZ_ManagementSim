import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:63145'

    private systemStore;

    private systemSubject = new Subject();

    systems = this.systemSubject.asObservable();

    constructor(private http: HttpClient, private sb : MatSnackBar){
      this.getSystems('');
    }

    getSystems(id){
          id = (id) ? '/' + id : '';
          this.http.get(this.BASE_URL + '/system' + id).subscribe(response =>{

            if(!Array.isArray(response)) {
              this.systemStore = [response];   
            }  
            else{
              this.systemStore = response;   
            } 
            this.systemSubject.next(this.systemStore);
          }, error => {
            this.handleError("Unable to get systems.");
          });
          console.log(this.systemStore);
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
      this.sb.open(error, 'close', {duration: 5000})
    }
}

