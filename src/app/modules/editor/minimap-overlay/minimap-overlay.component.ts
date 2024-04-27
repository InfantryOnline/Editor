import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { LevelTabContext } from "../../../workspace/tab-context";

/**
 * 
 */
@Component({
    selector: 'app-minimap-overlay',
    templateUrl: './minimap-overlay.component.html',
    styleUrls: ['./minimap-overlay.component.scss']
})
export class MinimapOverlayComponent implements AfterViewInit, OnDestroy {
    @Input() minimapImage: ImageBitmap | null =  null;
    @Input() context: LevelTabContext | null = null;

    @ViewChild('minimapCanvas', {read: ElementRef}) minimapCanvas?: ElementRef<HTMLCanvasElement>
    @ViewChild('borderCanvas', {read: ElementRef}) borderCanvas?: ElementRef<HTMLCanvasElement>

    rendering = true;
    dragging = false;
    dragStart = {x: 0, y: 0};

    ngAfterViewInit(): void {
        if (this.borderCanvas) {
            this.borderCanvas.nativeElement.width = 512;
            this.borderCanvas.nativeElement.height = 512;
        }

        if (this.minimapCanvas) {
            this.minimapCanvas.nativeElement.width = 512;
            this.minimapCanvas.nativeElement.height = 512;

            if (this.minimapImage) {
                let ctx = this.minimapCanvas.nativeElement.getContext('2d');
                ctx?.drawImage(this.minimapImage, 0, 0);
            }
        }

        this.rendering = true;
        this.renderBorder();
    }

    ngOnDestroy(): void {
        this.rendering = false;
    }

    renderBorder(): void {
        if (this.context && this.borderCanvas) {
            let ctx = this.borderCanvas.nativeElement.getContext('2d');

            if (ctx) {
                ctx.clearRect(0, 0, 512, 512);
                ctx.beginPath();
                ctx.rect(
                    -this.context.viewport.topLeftX / 64,
                    -this.context.viewport.topLeftY / 64,
                    this.context.viewport.width / 64,
                    this.context.viewport.height / 64
                );
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
            }
        }

        if (this.rendering) {
            requestAnimationFrame(()  => this.renderBorder());
        }
    }

    onMouseClick($event: MouseEvent): void {
        // Scale from the minimap, which is 512x512, to the actual map, which is up to 32768 x 32768 pixels.
        let x = $event.offsetX * 64;
        let y = $event.offsetY * 64;

        if (this.context) {
            let hw = Math.floor(this.context.viewport.width / 2);
            let hh = Math.floor(this.context.viewport.height / 2);
            this.context.viewport.topLeftX = -x + hw;
            this.context.viewport.topLeftY = -y + hh;
        }
    }

    onMouseDown($event: MouseEvent): void {
        //this.dragging = true;
        this.dragStart.x = $event.clientX;
        this.dragStart.y = $event.clientY;
    }

    onMouseUp($event: MouseEvent): void {
        this.dragging = false;
    }

    onMouseMove($event: MouseEvent): void {
        if (this.dragging) {
            let x = ($event.clientX - this.dragStart.x) * 64;
            let y = ($event.clientY - this.dragStart.y) * 64;

            console.log(x, y);

            if (this.context) {
                this.context.viewport.topLeftX = Math.floor(x - this.context.viewport.topLeftX);
                this.context.viewport.topLeftY = Math.floor(y - this.context.viewport.topLeftY);
            }
        }
    }
}
