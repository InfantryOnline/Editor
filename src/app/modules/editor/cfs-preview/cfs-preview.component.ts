import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { SpriteFile } from "../../../io/sprite";

@Component({
    selector: 'app-cfs-preview',
    templateUrl: './cfs-preview.component.html',
    styleUrls: ['./cfs-preview.component.scss']
})
export class CfsPreviewComponent implements AfterViewInit {
    private _sprite = new SpriteFile();

    @Input() set sprite(val: SpriteFile) {
        this._sprite = val;
        this.initialize();
    }

    get sprite(): SpriteFile {
        return this._sprite;
    }

    @ViewChild('previewCanvas') previewCanvas?: ElementRef<HTMLCanvasElement>;

    frames: any[] = [];

    time: number = 0;
    frame: number = 0;

    async ngAfterViewInit() {
        await this.initialize();
        this.render();
    }

    async initialize() {
        this.frames = [];

        if (this.previewCanvas && this.sprite) {
            let ctx = this.previewCanvas.nativeElement.getContext('2d');

            if (!ctx) {
                throw new Error('Failed to acquire context.');
            }

            for(let frame of this.sprite.frames) {
                let frameData = [];

                for (let y = 0; y < frame.height; y++) {
                    for (let x = 0; x < frame.width; x++) {
                        let offset = x + (y * frame.width);
                        let paletteEntry = this.sprite.palette[frame.pixels[offset]];

                        frameData.push((paletteEntry >> 24) & 0xFF);
                        frameData.push((paletteEntry >> 16) & 0xFF);
                        frameData.push((paletteEntry >> 8 ) & 0xFF);
                        frameData.push((paletteEntry >> 0 ) & 0xFF);
                    }
                }

                let imageData = Uint8ClampedArray.from(frameData);

                if (frame.width == 0 || frame.height == 0) {
                    this.frames.push({x: 0, y: 0, width: 0, height: 0});
                } else  {
                    let d = ctx.createImageData(frame.width, frame.height);
                    d.data.set(imageData);

                    let imageBitmap = await window.createImageBitmap(d);

                    this.frames.push({
                        x: frame.x,
                        y: frame.y,
                        width: frame.width,
                        height: frame.height,
                        bitmap: imageBitmap
                    });
                }
            }
        }

        this.frame = 0;
        this.time = performance.now();
    }

    render(): void {
        if (this.previewCanvas && this.sprite) {
            this.previewCanvas.nativeElement.width = this.sprite.header?.width || 0;
            this.previewCanvas.nativeElement.height = this.sprite.header?.height || 0;

            let ctx = this.previewCanvas.nativeElement.getContext('2d');

            let current = performance.now();

            if (this.sprite.header?.animationTime) {
                if ((current - this.time) > this.sprite.header?.animationTime) {
                    this.time = current;
                    this.frame++;

                    if (this.frame > this.frames.length - 1) {
                        this.frame = 0;
                    }
                }
            }

            let currentFrame = this.frames[this.frame];

            if (currentFrame.bitmap) {
                ctx?.drawImage(currentFrame.bitmap, currentFrame.x, currentFrame.y);
            }
        }

        requestAnimationFrame(() => this.render());
    }
}