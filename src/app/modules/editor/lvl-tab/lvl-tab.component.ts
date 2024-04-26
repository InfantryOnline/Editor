import { Component, Input } from "@angular/core";
import { LevelTabContext } from "../../../workspace/tab-context";
import { MatDialog } from "@angular/material/dialog";

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

    constructor(public dialog: MatDialog) {}

    onFloorSelect(): void {
        // let dialogRef = this.dialog.open(UserProfileComponent, {
        //     height: '400px',
        //     width: '600px',
        // });
    }
}