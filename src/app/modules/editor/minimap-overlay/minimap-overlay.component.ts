import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { LevelTabContext } from "../../../workspace/tab-context";

/**
 * Displays a minimap that the user can use to select a particular location on the map
 * to move the larger viewport over to.
 * 
 * Supports dragging to quickly pan around the map, and responds to zoom events as well.
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
        if (!this.context) {
            throw new Error('Missing context.');
        }

        if (!this.borderCanvas || !this.minimapCanvas) {
            throw new Error('Missing canvasses');
        }

        if (!this.minimapImage) {
            throw new Error('Missing minimap bitmap image');
        }

        this.borderCanvas.nativeElement.width = this.context.minimap.Width;
        this.borderCanvas.nativeElement.height = this.context.minimap.Height;

        this.minimapCanvas.nativeElement.width = this.context.minimap.Width;
        this.minimapCanvas.nativeElement.height = this.context.minimap.Height;

        let ctx = this.minimapCanvas.nativeElement.getContext('2d');
        ctx?.drawImage(this.minimapImage, 0, 0);

        this.rendering = true;
        this.renderBorder();
    }

    ngOnDestroy(): void {
        this.rendering = false;
    }

    renderBorder(): void {
        if (!this.context ||!this.borderCanvas) {
            throw new Error('Cannot render minimap borders - context or canvas missing.');
        }

        let ctx = this.borderCanvas.nativeElement.getContext('2d');

        if (ctx) {
            const bounds = this.context.minimap.viewportBounds;

            ctx.clearRect(0, 0, this.context.minimap.Width, this.context.minimap.Height);
            ctx.beginPath();
            ctx.rect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        }

        if (this.rendering) {
            requestAnimationFrame(()  => this.renderBorder());
        }
    }

    onMouseClick($event: MouseEvent): void {
        if (!this.context) {
            throw new Error('Missing context');
        }

        const p = this.context.minimap.toViewportOffCenter($event.offsetX, $event.offsetY);

        this.context.viewport.topLeftX = p.x;
        this.context.viewport.topLeftY = p.y;
    }

    onMouseDown($event: MouseEvent): void {
        if (!this.context) {
            throw new Error('Missing context');
        }

        this.dragging = true;
        
        const p = this.context.minimap.toViewportOffCenter($event.offsetX, $event.offsetY);

        this.context.viewport.topLeftX = p.x;
        this.context.viewport.topLeftY = p.y;
    }

    onMouseUp($event: MouseEvent): void {
        this.dragging = false;
    }

    onMouseMove($event: MouseEvent): void {
        if (this.dragging) {
            if (!this.context) {
                throw new Error('Missing context');
            }

            const p = this.context.minimap.toViewportOffCenter($event.offsetX, $event.offsetY);

            this.context.viewport.topLeftX = p.x;
            this.context.viewport.topLeftY = p.y;
        }
    }

    onMouseWheel($event: WheelEvent): void {
        let scrollSensitivity = 0.0005;
        
        if (this.context)
        {
            this.context.viewport.scale -= $event.deltaY * scrollSensitivity;

            if (this.context.viewport.scale < 1/4) {
                this.context.viewport.scale = 1/4;
            }

            if (this.context.viewport.scale > 2) {
                this.context.viewport.scale = 2;
            }
        }
    }
}
