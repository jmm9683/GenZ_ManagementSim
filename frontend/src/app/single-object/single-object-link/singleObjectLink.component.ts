import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

export interface Link {
  link: string; // simulation link
  name: string; // name of the component
  id: string; // _id in database
}


@Component({
  selector: 'app-single-object-link',
  templateUrl: './SingleObjectLink.component.html',
})
export class SingleObjectLinkComponent implements OnInit {

  BASE_URL = 'http://localhost:63145';

  @Input() json: any;
  @Input() domainID: string;

  links: Link[] = [];

  //private linksSubject = new Subject<Link[]>();
  //links = this.linksSubject.asObservable();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if(typeof this.json === 'object'){
      const json_string = JSON.stringify(this.json);
      for(let i of json_string.split(',')){
        if(i.includes('"@odata.id"') && i.includes('/')){
          const odata_info = i.split('"');

          let index = odata_info.indexOf('@odata.id');

          if(odata_info[index + 2] === this.json['@odata.id']){
            // same as previous
            continue;
          }

          const l: Link = {
            link: this.domainID + odata_info[index + 2],
            name: '',
            id: '',
          };
          const url = this.domainID + odata_info[index + 2];
          const body = {'Id' : url};
          const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
          const headers = new HttpHeaders ({'Content-Type': 'application/json'});
          this.http.post(this.BASE_URL+'/object/search/',body,config).subscribe(response =>{
            if (!Array.isArray(response)) {
              l.name = response['jsonFile']['Name'];
              l.id = response['_id'];
            } else {
              console.log(Array(response));
              if(Array(response)[0].length > 0){
                l.name = response[0]['jsonFile']['Name'];
                l.id = response[0]['_id'];
              }
              else {
                l.name = "DEAD LINK";
              }
            }

            // add to links
            this.links.push(l);
          }, error => {
            console.log(error)
          });
        }
      }

      console.log(this.links);

      return;
    }


  }

}
