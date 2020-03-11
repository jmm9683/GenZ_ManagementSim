import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/table-list', title: 'Component Table',  icon:'content_paste', class: '' },
    { path: '/domain-table', title: 'Domain Table',  icon:'http', class: '' },
    { path: '/dashboard', title: 'Stats',  icon: 'dashboard', class: '' },
    //{ path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/phys-map', title: 'Physical Mappings',  icon: 'sd_storage', class: '' },
    { path: '/genz-map', title: 'GenZ Relationship Map',  icon: 'map', class: '' },
    { path: '/adv-search', title: 'Advanced Search',  icon: 'search', class: '' },
    //{ path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    //{ path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    //{ path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    //{ path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
