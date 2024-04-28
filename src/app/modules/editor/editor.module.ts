import { NgModule } from "@angular/core";
import { WorkspaceComponent } from "./workspace/workspace.component";
import { DirectoryComponent } from "./directory/directory.component";
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BloTabComponent } from "./blo-tab/blo-tab.component";
import { LvlTabComponent } from "./lvl-tab/lvl-tab.component";
import { LvlViewerComponent } from "./lvl-viewer/lvl-viewer.component";
import { LioTabComponent } from "./lio-tab/lio-tab.component";
import { ItmTabComponent } from "./itm-tab/itm-tab.component";
import { VehTabComponent } from "./veh-tab/veh-tab.component";
import { BaseEditorComponent } from "./base-editor/base-editor.component";
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CfsPreviewComponent } from "./cfs-preview/cfs-preview.component";
import {MatChipsModule} from '@angular/material/chips';
import {OverlayModule} from '@angular/cdk/overlay';
import { MinimapOverlayComponent } from "./minimap-overlay/minimap-overlay.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from "@angular/common";


/**
 * Contains all the angular entities as it relates to the editor.
 */
@NgModule({
    declarations: [
        WorkspaceComponent,
        DirectoryComponent,
        BloTabComponent,
        LvlTabComponent,
        LvlViewerComponent,
        LioTabComponent,
        ItmTabComponent,
        VehTabComponent,
        BaseEditorComponent,
        CfsPreviewComponent,
        MinimapOverlayComponent
    ],
    exports: [WorkspaceComponent, DirectoryComponent],
    imports: [
        CommonModule,
        MatTreeModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        MatDialogModule,
        MatCheckboxModule,
        MatChipsModule,
        OverlayModule,
        MatProgressSpinnerModule
    ]
})
export class EditorModule {

}
