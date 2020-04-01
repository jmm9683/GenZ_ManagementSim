import { Component, OnInit, OnChanges } from '@angular/core';
import { WebService } from '../webservice/web.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'single-object',
    templateUrl: './singleObject.component.html',
    providers: [WebService]
})
export class SingleObjectComponent implements OnInit,OnChanges{

    constructor(private webService : WebService, private route: ActivatedRoute
      , private router: Router
      ){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      }
    ngOnInit(){
        // get the object using the webservice
        var objID = this.route.snapshot.params.objID;
        this.webService.getObjectById(objID);
        //this.links = this.getLinks(this.webService.specificobject.jsonFile)
    }

    ngOnChanges(){
      var objID = this.route.snapshot.params.objID;
      this.webService.getObjectById(objID);
    }
}
