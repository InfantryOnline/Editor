import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { Workspace } from "../../../workspace/workspace";
import { MatTabGroup, MatTab, MatTabHeader } from "@angular/material/tabs";
import { MatDrawer } from "@angular/material/sidenav";
import { BlobFile } from "../../../io/blo";
import { LevelFile } from "../../../io/level";
import { LioFile } from "../../../io/lio/lio-file";
import { BlobTabContext, ITabContext, ItemTabContext, LevelTabContext, LioTabContext, RpgTabContext, TabContextType } from "../../../workspace/tab-context";
import { RpgFile } from "../../../io/rpg";
import { ItemFile } from "../../../io/itm";

/**
 * Contains the large blocks of the editor, i.e. the workspace.
 */
@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, AfterViewInit {
    @Input() workspace: Workspace = new Workspace();

    @ViewChild('drawer') drawer: MatDrawer | null = null;
    @ViewChild('tabGroup') tabGroup: MatTabGroup | null = null;

    selectedTabIndex: number = 1;
    tabs: ITabContext[] = [];

    TabContextType = TabContextType;

    constructor() { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        if (this.tabGroup !== null) {
            this.tabGroup._handleClick = this.handleTabClick.bind(this);
        }
    }

    async onBloSelected($event: File) {
        let idx = this.tabs.findIndex(t => t.name  === $event.name);

        if (idx === -1) {
            let buffer = await $event.arrayBuffer();

            let blo = new BlobFile();
            blo.deserialize(buffer);

            let context = new BlobTabContext();
            context.name = $event.name;
            context.file = blo;
            context.workspace = this.workspace;

            this.tabs.push(context);

            this.selectedTabIndex = this.tabs.length + 1;
        } else  {
            this.selectedTabIndex = idx + 1;
        }
    }

    async onLvlSelected($event: File) {
        let idx = this.tabs.findIndex(t => t.name  === $event.name);

        if (idx === -1) {
            let buffer = await $event.arrayBuffer();

            let lvl = new LevelFile();
            lvl.deserialize(buffer);

            let context = new LevelTabContext();
            context.name = $event.name;
            context.file = lvl;
            context.workspace = this.workspace;
            context.loading = true;

            this.tabs.push(context);

            this.selectedTabIndex = this.tabs.length + 1;
        } else  {
            this.selectedTabIndex = idx + 1;
        }
    }

    async onLioSelected($event: File) {
        let idx = this.tabs.findIndex(t => t.name  === $event.name);

        if (idx === -1) {
            let buffer = await $event.arrayBuffer();

            let entry = new LioFile();
            entry.parse(buffer);

            let context = new LioTabContext();
            context.name = $event.name;
            context.file = entry;
            context.workspace = this.workspace;

            this.tabs.push(context);

            this.selectedTabIndex = this.tabs.length + 1;
        } else  {
            this.selectedTabIndex = idx + 1;
        }
    }

    async onRpgSelected($event: File) {
        let idx = this.tabs.findIndex(t => t.name  === $event.name);

        if (idx === -1) {
            let buffer = await $event.arrayBuffer();

            let entry = new RpgFile();
            entry.parse(buffer);

            let context = new RpgTabContext();
            context.name = $event.name;
            context.file = entry;
            context.workspace = this.workspace;

            this.tabs.push(context);

            this.selectedTabIndex = this.tabs.length + 1;
        } else {
            this.selectedTabIndex = idx + 1;
        }
    }

    async onItmSelected($event: File) {
        let idx = this.tabs.findIndex(t => t.name  === $event.name);

        if (idx === -1) {
            let buffer = await $event.arrayBuffer();

            let entry = new ItemFile();
            entry.parse(buffer);

            let context = new ItemTabContext();
            context.name = $event.name;
            context.file = entry;
            context.workspace = this.workspace;

            this.tabs.push(context);

            this.selectedTabIndex = this.tabs.length + 1;
        } else {
            this.selectedTabIndex = idx + 1;
        }
    }

    asBlobContext(tab : ITabContext): BlobTabContext {
        return tab as BlobTabContext;
    }

    asLevelContext(tab: ITabContext): LevelTabContext {
        return tab as LevelTabContext;
    }

    asLioContext(tab: ITabContext): LioTabContext {
        return tab as LioTabContext;
    }

    asRpgContext(tab: ITabContext): RpgTabContext {
        return tab as RpgTabContext;
    }

    asItmContext(tab: ITabContext): ItemTabContext {
        return tab as ItemTabContext;
    }

    handleTabClick(tab: MatTab, tabHeader: MatTabHeader, idx: number) {
        if (idx === 0) {
            this.drawer?.toggle();
            return;
        }
        this.tabs[this.selectedTabIndex - 1].rendering = false;
        this.selectedTabIndex = idx;
        this.tabs[idx - 1].rendering = true;
    }

    deleteTab(index: number): void {
        // NICE: add some logic here to prevent deleting tabs with dirty data at some point

        if (!confirm('Are you sure you want to remove this tab?')) {
            return;
        }

        if (index >= 0 && index < this.tabs.length) {
            this.tabs.splice(index, 1);
        }
    }
}
