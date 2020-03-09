import { Component, OnInit } from '@angular/core';
import {WebService } from '../webservice/web.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(
    private webService: WebService, 
    private route:ActivatedRoute, 
    ) { }

  ngOnInit() {
    this.webService.getAllObjects();
    console.log(this.webService.allobjects);
  }
}
