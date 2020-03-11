import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleObjectComponent } from './singleObject.component'
import { SingleObjectLinkComponent} from './single-object-link/singleObjectLink.component';
import { SingleObjectViewerComponent } from './single-object-viewer/single-object-viewer.component';
import { SingleObjectPathComponent } from './single-object-path/single-object-path.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SingleObjectComponent,
    SingleObjectLinkComponent,
    SingleObjectViewerComponent,
    SingleObjectPathComponent,
  ],
  exports: [
    SingleObjectComponent,
    SingleObjectLinkComponent,
    SingleObjectViewerComponent,
    SingleObjectPathComponent,
  ]
})
export class SingleObjectModule { }
