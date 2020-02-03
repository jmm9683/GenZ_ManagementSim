import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule, MatFormFieldModule, MatSnackBarModule  } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SystemsComponent } from './systems.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { WebService } from './web.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';
import { SingleSystemComponent } from './singleSystem.component';

var routes = [
  {
  path: '',
  component: HomeComponent
},
{
  path: 'systems',
  component: SystemsComponent
},
{
  path: 'systems/:sysID',
  component: SingleSystemComponent
}
];

@NgModule({
  declarations: [
    AppComponent,
    SystemsComponent,
    NavComponent,
    HomeComponent,
    SingleSystemComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
    
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
