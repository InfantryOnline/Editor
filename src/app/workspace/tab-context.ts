import { BlobFile } from "../io/blo";
import { LevelFile } from "../io/level";
import { LioFile } from "../io/lio/lio";
import { RpgFile } from "../io/rpg";
import { Minimap } from "./minimap";
import { Viewport } from "./viewport";
import { Workspace } from "./workspace";

export enum TabContextType {
    Blo,
    Lvl,
    Itm,
    Veh,
    Lio,
    Rpg,
    Cfg
}

export interface ITabContext {
    readonly type: TabContextType;
    name: string;
    workspace: Workspace;
    rendering: boolean;
}

export class BlobTabContext implements ITabContext {
    readonly type: TabContextType = TabContextType.Blo;
    name: string = '';
    file: BlobFile | null = null;
    workspace: Workspace = new Workspace();
    rendering: boolean = false;
}

export class LevelTabContext implements ITabContext {
    readonly type: TabContextType = TabContextType.Lvl;
    name: string = '';
    file: LevelFile | null = null;
    loading: boolean = false;
    workspace: Workspace = new Workspace();
    viewport: Viewport = new Viewport();
    minimap: Minimap = new Minimap(this.viewport);
    rendering: boolean = false;
    minimapBitmap: ImageBitmap | null = null;
}

export class LioTabContext implements ITabContext {
    readonly type: TabContextType = TabContextType.Lio;
    name: string = '';
    file: LioFile | null = null;
    workspace: Workspace = new Workspace();
    rendering: boolean = false;
}

export class RpgTabContext implements ITabContext {
    readonly type: TabContextType = TabContextType.Rpg;
    name: string = '';
    file: RpgFile | null = null;
    workspace: Workspace = new Workspace();
    rendering: boolean = false;
}
