import { Component, Input } from "@angular/core";
import { BlobFile, IBlobEntry } from "../../../io/blo";
import { BlobTabContext } from "../../../workspace/tab-context";
import { SpriteFile } from "../../../io/sprite";

enum SupportedBloFormats {
    Cfs,
    Wav,
}

/**
 * Displays the tab for a given blo file.
 */
@Component({
    selector: 'app-blo-tab',
    templateUrl: './blo-tab.component.html',
    styleUrls: ['./blo-tab.component.scss']
})
export class BloTabComponent {
    SupportedBloFormats = SupportedBloFormats;

    @Input() context: BlobTabContext | null = null;

    selectedEntry: IBlobEntry | null = null;
    selectedSprite: SpriteFile | null = null;

    selectedFormat: SupportedBloFormats | null = null;

    fileBuffer?: ArrayBuffer;

    attributes: {label: string, text: string}[] = [];

    isProcessing: boolean = false;

    get blo(): BlobFile | null | undefined {
        return this.context?.file;
    }

    async onEntrySelected(entry: IBlobEntry) {
        if (this.blo) {
            let file = this.context?.workspace.directory$.value.bloFiles.find(b => b.name === this.context?.name);
            this.fileBuffer = await file?.arrayBuffer();

            if (!this.fileBuffer) {
                throw new Error('Could not parse file buffer.');
            }

            this.selectedEntry = entry;
            this.attributes = [];

            this.attributes.push({
                label: 'Name',
                text: this.selectedEntry.name
            }, {
                label: 'Offset',
                text: `${this.selectedEntry.offset}`
            }, {
                label: 'Size',
                text: `${this.selectedEntry.length}`
            });

            if (entry.name.toLowerCase().endsWith('.cfs')) {
                let spriteFile = new SpriteFile();
                var spriteBuffer = this.fileBuffer.slice(entry.offset, entry.offset + entry.length);

                if (spriteBuffer) {
                    spriteFile.deserialize(spriteBuffer);
                    this.selectedSprite = spriteFile;
                }

                this.attributes.push({
                    label: 'Frames',
                    text: `${this.selectedSprite?.frames.length}`
                });

                this.selectedFormat = SupportedBloFormats.Cfs;
            } else if (entry.name.toLowerCase().endsWith('.wav')) {
                this.selectedFormat = SupportedBloFormats.Wav;
            }
        }
    }

    async onPlay() {
        if (this.selectedFormat !== SupportedBloFormats.Wav) {
            throw new Error('Invalid format selection.');
        }

        if (!this.fileBuffer || !this.selectedEntry) {
            throw new Error('File buffer not loaded.');
        }
        
        var audioBuffer = this.fileBuffer.slice(this.selectedEntry.offset, this.selectedEntry.offset + this.selectedEntry.length);

        let context = new AudioContext();
        let data = await context.decodeAudioData(audioBuffer);

        let source = context.createBufferSource();
        source.buffer = data;
        source.connect(context.destination);
        source.start();

        source.addEventListener('ended', () => this.isProcessing = false);

        this.isProcessing = true;
    }
}
