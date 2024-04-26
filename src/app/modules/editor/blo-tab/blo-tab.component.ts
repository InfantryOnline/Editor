import { Component, Input } from "@angular/core";
import { BlobFile, IBlobEntry } from "../../../io/blo";
import { BlobTabContext } from "../../../workspace/tab-context";
import { SpriteFile } from "../../../io/sprite";

/**
 * Displays the tab for a given blo file.
 */
@Component({
    selector: 'app-blo-tab',
    templateUrl: './blo-tab.component.html',
    styleUrls: ['./blo-tab.component.scss']
})
export class BloTabComponent {
    @Input() context: BlobTabContext | null = null;

    selectedEntry: IBlobEntry | null = null;
    selectedSprite: SpriteFile | null = null;

    get blo(): BlobFile | null | undefined {
        return this.context?.file;
    }

    async onEntrySelected(entry: IBlobEntry) {
        if (this.blo) {
            let file = this.context?.workspace.directory.bloFiles.find(b => b.name === this.context?.name);
            let buffer = await file?.arrayBuffer();

            this.selectedEntry = entry;

            if (entry.name.endsWith('.cfs')) {
                let spriteFile = new SpriteFile();
                var spriteBuffer = buffer?.slice(entry.offset, entry.offset + entry.length);

                if (spriteBuffer) {
                    spriteFile.deserialize(spriteBuffer);
                    this.selectedSprite = spriteFile;
                }
            }            
        }
    }
}