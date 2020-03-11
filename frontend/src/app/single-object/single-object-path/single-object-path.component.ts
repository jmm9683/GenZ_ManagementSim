import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Path {
  fullurl: string;
  display: string;
  id: string;
}

@Component({
  selector: 'app-single-object-path',
  templateUrl: './single-object-path.component.html',
})
export class SingleObjectPathComponent implements OnInit {

  BASE_URL = 'http://localhost:63145';

  @Input() url: string;
  @Input() domainID: string;


  paths: Path[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const i = this.url.indexOf(this.domainID) + this.domainID.length;
    const path = this.url.substring(i);
    const paths_to_make = path.split('/');

    console.log(paths_to_make);
    let currentpath = this.domainID;

    for(let i of paths_to_make){

      if(i === '' ){
        continue;
      }

      currentpath += '/'+ i;

      const p: Path = {
        fullurl : currentpath,
        display : "/"+i,
        id : ''
      }
      // check to see if current path exists
      let url = currentpath;

      if(i=='v1'){url+='/';}

      const body = {'Id' : url};
      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      this.http.post(this.BASE_URL+'/object/search/',body,config).subscribe(response =>{
        if (!Array.isArray(response)) {
          p.id = response['_id'];
          this.paths.push(p);
        } else {
          if(Array(response)[0].length > 0){
            p.id = response[0]['_id'];
            this.paths.push(p);
          }
        }
      }, error => {
        console.log(error)
      });
      // if new value is added to paths reset
    }

    // reformat display names;

    let previous_path = "";
    for (let j of this.paths){
      let z = j.display.indexOf(previous_path);
      j.display = j.display.substring(z);
      previous_path = j.display;
    }
    this.paths = this.paths.sort((a,b) => a.fullurl.length - b.fullurl.length)

    console.log(this.paths);
  }

}
