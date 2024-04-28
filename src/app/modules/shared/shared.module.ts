import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from "@angular/common";
import { BaseEditorComponent } from "./base-editor/base-editor.component";
import { TreeComponent } from "./tree/tree.component";


/**
 * Contains all the angular entities as it relates to the editor.
 */
@NgModule({
    declarations: [
        BaseEditorComponent,
        TreeComponent
    ],
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
        MatProgressSpinnerModule,
    ],
    exports: [
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
        MatProgressSpinnerModule,
        TreeComponent,
        BaseEditorComponent,
    ],
})
export class SharedModule {

}
