import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { Workspace } from "../../../workspace/workspace";
import { MatTabGroup, MatTab, MatTabHeader } from "@angular/material/tabs";
import { MatDrawer } from "@angular/material/sidenav";
import { BlobFile } from "../../../io/blo";
import { LevelFile } from "../../../io/level";
import { BlobTabContext, ITabContext, LevelTabContext, LioTabContext, TabContextType } from "../../../workspace/tab-context";
import { LioFile } from "../../../io/lio/lio";

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

    async onLioSelected($event: File) {
        let idx = this.tabs.findIndex(t => t.name  === $event.name);

        if (idx === -1) {
            const reader: FileReader = new FileReader();

            reader.onload = () => {
                if (reader.result) {
                    let lio = new LioFile();
                    lio.parse(reader.result.toString());

                    let context = new LioTabContext();
                    context.name = $event.name;
                    context.file = lio;
                    context.workspace = this.workspace;

                    this.tabs.push(context);

                    this.selectedTabIndex = this.tabs.length + 1;
                } else {
                    throw new Error("Failed to read the file.");
                }
            };
            reader.onerror = (error) => {
                throw error;
            };

            reader.readAsText($event);

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

    asLioContext(tab: ITabContext): LioTabContext {
        return tab as LioTabContext;
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
        // add some logic here to prevent deleting tabs with dirty data at some point

        if (index >= 0 && index < this.tabs.length) {
            this.tabs.splice(index, 1);
        }
    }
}
