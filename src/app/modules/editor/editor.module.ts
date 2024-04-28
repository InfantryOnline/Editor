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
        MinimapOverlayComponent
    ],
    exports: [WorkspaceComponent, DirectoryComponent],
    imports: [
        SharedModule
    ]
})
export class EditorModule {

}
