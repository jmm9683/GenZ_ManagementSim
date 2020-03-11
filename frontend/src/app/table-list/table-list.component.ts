import { Component, OnInit } from '@angular/core';
import {WebService } from '../webservice/web.service';
import {combineLatest, Observable, of} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  objects$ : Observable<any>;
  filteredStates$: Observable<any>;
  filter: FormControl;
  filter$: Observable<string>;
  num_objects: number;

  constructor(
    private webService: WebService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {

    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));

    this.webService.getAllObjects();
    console.log(this.webService.allobjects.subscribe);
    this.objects$ = this.webService.allobjects;
    this.filteredStates$ = combineLatest(this.objects$, this.filter$).pipe(
      map(([objects, filterString]) => objects.filter(object => object.jsonFile.Name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    );
    this.filteredStates$.subscribe( response =>
      this.num_objects = Array(response)[0].length
    );

  }
}
