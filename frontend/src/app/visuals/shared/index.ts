export * from './node-visual/node-visual.component';
export * from './link-visual/link-visual.component';
export * from './group-visual/group-visual.component';

import { NodeVisualComponent } from './node-visual/node-visual.component';
import { LinkVisualComponent } from './link-visual/link-visual.component';
import { GroupVisualComponent } from './group-visual/group-visual.component';
import { SingleGroupVisualComponent } from './group-visual/single-group-visual.component';

export const SHARED_VISUALS = [
    NodeVisualComponent,
    LinkVisualComponent,
    GroupVisualComponent,
    SingleGroupVisualComponent,
];
