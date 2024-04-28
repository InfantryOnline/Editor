import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { Workspace } from "../../../workspace/workspace";
import { MatTabChangeEvent, MatTabGroup, MatTab, MatTabHeader } from "@angular/material/tabs";
import { MatDrawer } from "@angular/material/sidenav";
import { BlobFile } from "../../../io/blo";
import { LevelFile } from "../../../io/level";
import { BlobTabContext, ITabContext, LevelTabContext, TabContextType } from "../../../workspace/tab-context";

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

    asBlobContext(tab : ITabContext): BlobTabContext {
        return tab as BlobTabContext;
    }

    asLevelContext(tab: ITabContext): LevelTabContext {
        return tab as LevelTabContext;
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
}