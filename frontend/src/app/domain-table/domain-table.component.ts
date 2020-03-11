import { Component, OnInit } from '@angular/core';
import {WebService } from '../webservice/web.service';
import {combineLatest, Observable, of} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-domain-table',
  templateUrl: './domain-table.component.html',
  styleUrls: ['./domain-table.component.css']
})
export class DomainTableComponent implements OnInit {

  addDomainForm;


  objects$ : Observable<any>;
  filteredStates$: Observable<any>;
  filter: FormControl;
  filter$: Observable<string>;
  num_domains: number;

  constructor(
    private webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    )
    {
      this.addDomainForm = formBuilder.group({
          Id: ''
        })
    }

  ngOnInit() {

    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));

    this.webService.getAllDomains();
    this.objects$ = this.webService.alldomains;
    this.filteredStates$ = combineLatest(this.objects$, this.filter$).pipe(
      map(([objects, filterString]) => objects.filter(object => object.Id.toLowerCase().indexOf(filterString.toLowerCase()) !== -1))
    );
    this.filteredStates$.subscribe( response =>
      this.num_domains = Array(response)[0].length
    );

  }

  onSubmit(formValue) {
    const id = formValue.Id;
    // Process checkout data here

    if(id.length > 0){
      console.log('Adding New Domain ... '+id);
      this.webService.addNewDomain(id);
    }
  }


}
