import { Component } from '@angular/core';


@Component({
    selector: 'nav',
    template: `
    <mat-toolbar color="primary">
        <button mat-button routerLink="/">Gen-Z Management Tool</button>
    </mat-toolbar>
    `

})
export class NavComponent {}