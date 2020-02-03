import { Component } from '@angular/core';
import {WebService } from './web.service'
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'single-system',
    templateUrl: './singleSystem.component.html'

})
export class SingleSystemComponent {

    constructor(private webService : WebService, private route: ActivatedRoute){}
    ngOnInit(){
        var sysID = this.route.snapshot.params.sysID;
        this.webService.getSystems(sysID);
    }
}