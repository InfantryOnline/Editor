import { NgModule } from "@angular/core";
import { WorkspaceComponent } from "./workspace/workspace.component";
import { DirectoryComponent } from "./directory/directory.component";
import { BloTabComponent } from "./blo-tab/blo-tab.component";
import { LvlTabComponent } from "./lvl-tab/lvl-tab.component";
import { LvlViewerComponent } from "./lvl-viewer/lvl-viewer.component";
import { LioTabComponent } from "./lio-tab/lio-tab.component";
import { ItmTabComponent } from "./itm-tab/itm-tab.component";
import { VehTabComponent } from "./veh-tab/veh-tab.component";
import { CfsPreviewComponent } from "./cfs-preview/cfs-preview.component";
import { MinimapOverlayComponent } from "./minimap-overlay/minimap-overlay.component";
import { SharedModule } from "../shared/shared.module";
import { RpgTabComponent } from "./rpg-tab/rpg-tab.component";
import { ReactiveFormsModule } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';

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
        CfsPreviewComponent,
        MinimapOverlayComponent,
        RpgTabComponent
    ],
    exports: [WorkspaceComponent, DirectoryComponent],
    imports: [
        MatInputModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatSelectModule,
        MatDividerModule,
        MatExpansionModule,
        SharedModule
    ]
})
export class EditorModule {

}
