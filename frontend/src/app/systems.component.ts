import { Component } from '@angular/core';
import {WebService } from './web.service'
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'systems',
    templateUrl: './systems.component.html',
    styleUrls: ['./systems.component.css']

})
export class SystemsComponent {

    constructor(private webService : WebService, private route: ActivatedRoute){}
    ngOnInit(){
        var sysID = this.route.snapshot.params.sysID;
        this.webService.getSystems(sysID);
    }
}