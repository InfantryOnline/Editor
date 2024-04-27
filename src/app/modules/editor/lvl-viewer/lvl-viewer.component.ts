import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { LevelTabContext } from "../../../workspace/tab-context";
import { Directory } from "../../../workspace/directory";
import { BlobFile } from "../../../io/blo";
import { SpriteFile } from "../../../io/sprite";

@Component({
    selector: 'app-lvl-viewer',
    templateUrl: './lvl-viewer.component.html',
    styleUrls: ['./lvl-viewer.component.scss']
})
export class LvlViewerComponent implements AfterViewInit {
    @Input() context: LevelTabContext | null = null;

    @ViewChild('container') container?: ElementRef<HTMLDivElement>;
    @ViewChild('terrainCanvas') terrainCanvas?: ElementRef<HTMLCanvasElement>;
    @ViewChild('objectCanvas') objectCanvas?: ElementRef<HTMLCanvasElement>;

    dragging: boolean = false;
    canRender: boolean = false;
    dragStart = {x: 0, y: 0};

    renderWorker: Worker | null = null;

    cfsData: {name: string, frames: any[]}[] = [];

    get bounds(): any {
        if (!this.context) {
            throw new Error('Bad state');
        }

        let bounds = {
            x: this.context.viewport.topLeftX,
            y: this.context.viewport.topLeftY,
            width: 0,
            height: 0
        };

        if (this.container)  {
            let element = this.container.nativeElement;
            element.style.width = '100%';
            element.style.height = 'calc(100vh - 120px)';

            if (this.context && this.context.file) {
                bounds.width = element.offsetWidth;
                bounds.height = element.offsetHeight;
                this.context.viewport.width = bounds.width;
                this.context.viewport.height = bounds.height;
            }
        }

        return bounds;
    }

    get directory(): Directory {
        if (!this.context) {
            throw new Error('Missing context.');
        }

        return this.context.workspace.directory;
    }

    async ngAfterViewInit() {
        this.renderWorker = new Worker(new URL('./render.worker', import.meta.url));

        if (!this.terrainCanvas || !this.objectCanvas) {
            console.log('Error');
            return;
        }

        if (this.context) {
            this.context.loading = true;
        }

        let offscreenTerrainCanvas = this.terrainCanvas.nativeElement.transferControlToOffscreen();
        let offscreenObjectCanvas = this.objectCanvas.nativeElement.transferControlToOffscreen();

        this.renderWorker.postMessage({
            type: 'load',
            terrainCanvas: offscreenTerrainCanvas,
            objectCanvas: offscreenObjectCanvas,
            context: this.context,
        }, [offscreenTerrainCanvas, offscreenObjectCanvas]);

        this.renderWorker.onmessage = (message: MessageEvent) => {
            if (message.data.type === 'loaded') {
                this.canRender = true;
                this.renderWorker?.postMessage({
                    type: 'startrender',
                    bounds: this.bounds
                });

                this.render();
                this.renderWorker?.postMessage({type: 'renderminimap'});
            } else if (message.data.type === 'minimap') {
                if (this.context) {
                    this.context.minimapBitmap = message.data.bitmap;
                }

                if (this.context) {
                    this.context.loading = false;
                }
            }
        };
    }

    onMouseDown($event: MouseEvent) {
        if (!this.context) {
            return;
        }

        this.dragging = true;
        this.dragStart.x = this.getEventLocation($event).x / this.context.viewport.zoom - this.context.viewport.topLeftX;
        this.dragStart.y = this.getEventLocation($event).y / this.context.viewport.zoom - this.context.viewport.topLeftY;
    }

    onMouseUp($event: MouseEvent) {
        if (this.dragging) {
            this.dragging = false;
        }
    }

    onMouseMove($event: MouseEvent) {
        if (this.dragging && this.context) {
            this.context.viewport.topLeftX = this.getEventLocation($event).x / this.context.viewport.zoom - this.dragStart.x;
            this.context.viewport.topLeftY = this.getEventLocation($event).y / this.context.viewport.zoom - this.dragStart.y;
        }
    }

    onWheel($event: WheelEvent) {
        let scrollSensitivity = 0.0005;
        
        if (this.context)
        {
            this.context.viewport.zoom += $event.deltaY * scrollSensitivity;
        }
    }

    getEventLocation($event: MouseEvent) {
        return {x: $event.clientX, y: $event.clientY};
    }

    render(): void {
        if (!this.context) {           
            return;
        }

        if (this.canRender) {
            this.renderWorker?.postMessage({
                type: 'updaterender',
                bounds: this.bounds
            });
        }

        requestAnimationFrame(() => this.render());
    }
}
