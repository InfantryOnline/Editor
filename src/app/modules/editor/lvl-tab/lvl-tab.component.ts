import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { LevelTabContext } from "../../../workspace/tab-context";
import { MatDialog } from "@angular/material/dialog";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { MinimapOverlayComponent } from "../minimap-overlay/minimap-overlay.component";
import { MatButton } from "@angular/material/button";

/**
 * Displays the tab for a given blo file.
 */
@Component({
    selector: 'app-lvl-tab',
    templateUrl: './lvl-tab.component.html',
    styleUrls: ['./lvl-tab.component.scss']
})
export class LvlTabComponent {
    @Input() context: LevelTabContext | null = null;
    @ViewChild('minimap', {read: ElementRef}) minimap?: ElementRef<MatButton>;

    constructor(public dialog: MatDialog, public overlay: Overlay) {}

    minimapPortal?: ComponentPortal<MinimapOverlayComponent>;
    overlayRef?: OverlayRef;

    showPhysics: boolean = false;

    onToggleMinimap(): void {
        if (this.overlayRef) {
            this.overlayRef?.dispose();
            this.overlayRef = undefined;
            this.minimapPortal = undefined;
        } else {
            if (this.minimap) {
                const positionStrategy = this.overlay.position().flexibleConnectedTo(this.minimap).withPositions([{
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                  }, {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                  }]);

                this.overlayRef = this.overlay.create({positionStrategy: positionStrategy});
                this.minimapPortal = new ComponentPortal(MinimapOverlayComponent);
                const componentRef = this.overlayRef.attach(this.minimapPortal);

                if (this.context) {
                    componentRef.instance.minimapImage = this.context.minimapBitmap;
                    componentRef.instance.context = this.context;
                }
            }
        }
    }

    onFloorSelect(): void {

    }

    onToggleShowPhysics(checked: boolean): void {
        this.showPhysics = checked;
    }
}
