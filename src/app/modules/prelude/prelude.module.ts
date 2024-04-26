import { NgModule } from "@angular/core";
import { ImportDirectoryComponent } from "./import-directory/import-directory.component";
import { MatButtonModule } from '@angular/material/button';

/**
 * Prelude module contains all the Angular elements that are generally used prior to the
 * editor being in a full ready-to-use state.
 */
@NgModule({
    declarations: [ImportDirectoryComponent],
    exports: [ImportDirectoryComponent],
    imports: [MatButtonModule]
})
export class PreludeModule {

}