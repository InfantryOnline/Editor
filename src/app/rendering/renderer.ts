import { BlobFile } from "../io/blo";
import { SpriteFile } from "../io/sprite";
import { Directory } from "../workspace/directory";

/**
 * 
 */
export class Renderer {
    cfsData: { name: string, frames: any[] }[] = [];
    context: any;
    terrainCanvas: OffscreenCanvas | null = null;
    objectCanvas: OffscreenCanvas | null = null;
    canvasWidth = 0;
    canvasHeight = 0;
    rendering = true;

    floorCanvases: OffscreenCanvas[] = [];
    physicsCanvases: OffscreenCanvas[] = [];
    canvasesWidth = 0;
    canvasesHeight = 0;

    floorCanvasSize = 1024;

    objectGrid: any[] = [];
    objectGridSize = this.floorCanvasSize;
    lastDt: number = 0;

    physicsFrames: any[] = [];
    visionFrames: any[] = [];

    get directory(): Directory { return this.context.workspace.directory; }

    async loadUiBlob() {
        const ctx2d = this.objectCanvas?.getContext('2d');

        let file = this.directory?.files.find(f => f.name.toLowerCase() === "uiart.blo");

        if (!file) {
            throw new Error('Was not able to find uiart.blo. This is bad.');
        }

        let buffer = await file?.arrayBuffer();

        if (!buffer) {
            throw new Error('Could not load up uiartblo. This is bad.');
        }

        let blobFile = new BlobFile();
        blobFile.deserialize(buffer);

        let entry = blobFile.entries.find(t => t.name.toLowerCase() === 'physics.cfs');

        if (!entry) {
            throw new Error('uiart.blo does not contain physics.cfs. This is bad.');
        }

        let physFile = new SpriteFile();
        physFile.deserialize(buffer.slice(entry.offset, entry.offset + entry.length));

        let ctx = this.objectCanvas?.getContext('2d');

        if (!ctx) {
            throw new Error('Could not create context for physics canvas.');
        }

        for (let frame of physFile.frames) {
            let frameData = [];

            for (let y = 0; y < frame.height; y++) {
                for (let x = 0; x < frame.width; x++) {
                    let offset = x + (y * frame.width);
                    let paletteEntry = physFile.palette[frame.pixels[offset]];

                    // RGBA i believe.
                    frameData.push((paletteEntry >> 24) & 0xFF);
                    frameData.push((paletteEntry >> 16) & 0xFF);
                    frameData.push((paletteEntry >> 8) & 0xFF);
                    frameData.push((paletteEntry >> 0) & 0xFF);
                }
            }

            let frameDataUint8 = Uint8ClampedArray.from(frameData);

            if (frame.width === 0 || frame.height === 0) {
                this.physicsFrames.push({ x: frame.x, y: frame.y, width: 0, height: 0 });
            } else {
                let imageData = ctx.createImageData(frame.width, frame.height);
                imageData.data.set(frameDataUint8);

                let bitmap = await self.createImageBitmap(imageData);
                let pattern = ctx.createPattern(bitmap, 'repeat');
    
                this.physicsFrames.push({ x: frame.x, y: frame.y, width: frame.width, height: frame.height, bitmap: bitmap, pattern: pattern });
            }
        }
    }

    async load() {
        await this.loadUiBlob();

        const ctx2d = this.terrainCanvas?.getContext('2d');

        if (!this.context || !this.context.file || !ctx2d) {
            return;
        }

        const level = this.context.file;

        let blobCfsReferences: { filename: string, refs: string[] }[] = [];

        // Extract all referenced blobs and corresponding cfs files in a de-duplicated array,
        // and then proceed to actually load the CFS data in, with all the frames and whatnot.

        for (let i = 0; i < level.header.floorCount; i++) {
            const floor = level.floors[i];

            let blob = blobCfsReferences.find(r => r.filename === floor.filename);

            if (blob) {
                const ref = blob.refs.find(r => r === floor.id);

                if (ref) {
                    continue;
                }

                blob.refs.push(floor.id);
            } else {
                let entry = { filename: floor.filename, refs: [floor.id] };
                blobCfsReferences.push(entry);
            }
        }

        for (let i = 0; i < level.header.objectCount; i++) {
            const object = level.objects[i];

            let blob = blobCfsReferences.find(r => r.filename === object.filename);

            if (blob) {
                const ref = blob.refs.find(r => r === object.id);

                if (ref) {
                    continue;
                }

                blob.refs.push(object.id);
            } else {
                let entry = { filename: object.filename, refs: [object.id] };
                blobCfsReferences.push(entry);
            }
        }

        for (let blob of blobCfsReferences) {
            let file = this.directory?.files.find(f => f.name.toLowerCase() === blob.filename.toLowerCase());

            if (!file) {
                console.log('Blob file not found:', blob.filename);
                continue;
            }

            let blobFile = new BlobFile();
            let buffer = await file?.arrayBuffer();

            if (!buffer) {
                continue;
            }

            blobFile.deserialize(buffer);

            for (let ref of blob.refs) {
                let entry = blobFile.entries.find(e => e.name.toLowerCase() === ref.toLowerCase());

                if (!entry) {
                    console.log('Blob entry not found: ', ref);
                    continue;
                }

                let spriteFile = new SpriteFile();
                spriteFile.deserialize(buffer.slice(entry.offset, entry.offset + entry.length));

                let frames: { x: number, y: number, width: number, height: number, bitmap?: ImageBitmap, pattern?: CanvasPattern }[] = [];

                for (let frame of spriteFile.frames) {
                    let frameData = [];

                    for (let y = 0; y < frame.height; y++) {
                        for (let x = 0; x < frame.width; x++) {
                            let offset = x + (y * frame.width);
                            let paletteEntry = spriteFile.palette[frame.pixels[offset]];

                            // RGBA i believe.
                            frameData.push((paletteEntry >> 24) & 0xFF);
                            frameData.push((paletteEntry >> 16) & 0xFF);
                            frameData.push((paletteEntry >> 8) & 0xFF);
                            frameData.push((paletteEntry >> 0) & 0xFF);
                        }
                    }

                    let frameDataUint8 = Uint8ClampedArray.from(frameData);

                    if (frame.width === 0 || frame.height === 0) {
                        frames.push({ x: frame.x, y: frame.y, width: 0, height: 0 });
                    } else {
                        let imageData = ctx2d.createImageData(frame.width, frame.height);
                        imageData.data.set(frameDataUint8);

                        let bitmap = await self.createImageBitmap(imageData);
                        let pattern = ctx2d.createPattern(bitmap, 'repeat');

                        if (!pattern) {
                            console.log('Pattern creation failed for: ', `${blob.filename}#${ref}`);
                            continue;
                        }

                        // TODO: Only generate a pattern for floors; introduce a flag or some such.
                        frames.push({ x: frame.x, y: frame.y, width: frame.width, height: frame.height, bitmap: bitmap, pattern: pattern });
                    }
                }

                this.cfsData.push({
                    name: `${blob.filename}#${ref}`,
                    frames: frames
                });
            }
        }

        this.initializeObjectGrid();
        this.initializeCanvasGrid();
    }

    initializeCanvasGrid(): void {
        if (!this.context || !this.context.file) {
            return;
        }

        let tileWidth = this.context?.file?.header.width;
        let tileHeight = this.context?.file?.header.height;

        // In pixels.
        let totalWidth = tileWidth * 16;
        let totalHeight = tileHeight * 16;

        this.canvasesWidth = Math.ceil(totalWidth / this.floorCanvasSize);
        this.canvasesHeight = Math.ceil(totalHeight / this.floorCanvasSize);

        for (let x = 0; x < this.canvasesWidth; x++) {
            for (let y = 0; y < this.canvasesHeight; y++) {
                this.floorCanvases.push(new OffscreenCanvas(this.floorCanvasSize, this.floorCanvasSize));
                this.physicsCanvases.push(new OffscreenCanvas(this.floorCanvasSize, this.floorCanvasSize));
            }
        }

        // Render floors.

        for (let x = 0; x < tileWidth; x++) {
            for (let y = 0; y < tileHeight; y++) {
                let canvasX = Math.floor((x * 16) / this.floorCanvasSize);
                let canvasY = Math.floor((y * 16) / this.floorCanvasSize);

                let canvas = this.floorCanvases[(canvasY * this.canvasesWidth) + canvasX];

                let ctx = canvas.getContext('2d');

                if (!ctx) {
                    console.log('Canvas not initialized');
                    return;
                }

                let tile = this.context.file.tiles[(y * tileWidth) + x];
                let terrainIndex = tile.bitsA & 0x7F;
                let physicsIndex = tile.bitsC & 0x1F;
                let floor = this.context.file.floors[terrainIndex];
                let physTile = this.physicsFrames[physicsIndex];

                let floorImage = this.cfsData.find(c => c.name === `${floor.filename}#${floor.id}`);

                if (!floorImage) {
                    console.log('Missing floor image: ', `${floor.filename}#${floor.id}`);
                    continue;
                }

                const pX = (x * 16) - canvasX * this.floorCanvasSize;
                const pY = (y * 16) - canvasY * this.floorCanvasSize;

                let frame = floorImage.frames[0];

                ctx.fillStyle = frame.pattern;
                ctx.fillRect(pX, pY, 16, 16);

                if (physTile.width > 0 && physTile.height > 0) {
                    let physicsCanvas = this.physicsCanvases[(canvasY * this.canvasesWidth) + canvasX];
                    let physCtx = physicsCanvas.getContext('2d');

                    if  (physCtx) {
                        physCtx.fillStyle = physTile.pattern;
                        physCtx.fillRect(pX, pY, 16, 16);
                    }
                }
            }
        }

        // Render objects (TODO: Transparencies, shadow layers, all that fun stuff.)

        for (let x = 0; x < this.canvasesWidth; x++) {
            for (let y = 0; y < this.canvasesHeight; y++) {
                let objectGridEntry = this.objectGrid[(y * this.canvasesWidth) + x];
                let canvas = this.floorCanvases[(y * this.canvasesWidth) + x];
                let ctx = canvas.getContext('2d');

                let TLX = x * this.floorCanvasSize;
                let TLY = y * this.floorCanvasSize;

                if (!ctx) {
                    throw new Error('Unable to get context.');
                }

                for (let entity of objectGridEntry.entities) {
                    let objIndex = entity.bitsA & 0x00001FFF;
                    let frameIndex = (entity.bitsA & 0x000FE000) >> 13;
                    let obj = this.context.file.objects[objIndex];
                    let objImage = this.cfsData.find(c => c.name === `${obj.filename}#${obj.id}`)?.frames[frameIndex];

                    if (objImage.width === 0 || objImage.height === 0) {
                        console.log('Warning: zero width/height bitmap: ', obj, objImage);
                        continue;
                    }

                    ctx.drawImage(objImage.bitmap, (entity.x + objImage.x) - TLX, (entity.y + objImage.y) - TLY);
                }
            }
        }
    }

    initializeObjectGrid(): void {
        if (!this.context) {
            throw new Error('');
        }

        const file = this.context.file;
        const header = file?.header;

        if (!file) {
            throw new Error('Cannot find file');
        }

        let tileWidth = file.header.width;
        let tileHeight = file.header.height;

        // In pixels.
        let totalWidth = tileWidth * 16;
        let totalHeight = tileHeight * 16;

        let gridX = Math.ceil(totalWidth / this.objectGridSize);
        let gridY = Math.ceil(totalHeight / this.objectGridSize);

        for (let x = 0; x < gridX; x++) {
            for (let y = 0; y < gridY; y++) {
                this.objectGrid.push({ entities: [] });
            }
        }

        for (let entity of file.entities) {
            // Because an entity may span multiple grid cells, we will add the entity to all of them. The entity position therefore
            // may sit "outside" of the grid boundaries, which is fine, because it just means that it will be cut off when it gets
            // rendered.
            let objIndex = entity.bitsA & 0x00001FFF;
            let frameIndex = (entity.bitsA & 0x000FE000) >> 13;
            let obj = file.objects[objIndex];
            let objImage = this.cfsData.find(c => c.name === `${obj.filename}#${obj.id}`)?.frames[frameIndex];

            let gridTLX = Math.floor(entity.x / this.objectGridSize);
            let gridTLY = Math.floor(entity.y / this.objectGridSize);

            let gridBRX = Math.floor((entity.x + objImage.width) / this.objectGridSize);
            let gridBRY = Math.floor((entity.y + objImage.height) / this.objectGridSize);

            for (let x = gridTLX; x <= gridBRX; x++) {
                for (let y = gridTLY; y <= gridBRY; y++) {
                    this.objectGrid[(y * gridX) + x].entities.push(entity);
                }
            }
        }
    }

    render(dt: number): void {
        let ctx = this.terrainCanvas?.getContext('2d');
        let physCtx = this.objectCanvas?.getContext('2d');

        if (!this.terrainCanvas || !ctx || !this.context || !physCtx || !this.objectCanvas) {
            return;
        }

        this.lastDt = dt;

        // Render the sub-canvases.

        if (this.terrainCanvas.width != this.canvasWidth || this.terrainCanvas.height != this.canvasHeight) {
            this.terrainCanvas.width = this.canvasWidth;
            this.terrainCanvas.height = this.canvasHeight;
            this.objectCanvas.width = this.canvasWidth;
            this.objectCanvas.height = this.canvasHeight;
        }

        ctx.resetTransform();
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Translate to middle of canvas first, and then zoom in; this ensures that
        // the zoom's origin is always from the centerpoint of the canvas.
        ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2)
        ctx.scale(this.context.viewport.scale, this.context.viewport.scale);
        ctx.translate((-this.canvasWidth / 2) - this.context.viewport.topLeftX, (-this.canvasHeight / 2) - this.context.viewport.topLeftY);

        physCtx.resetTransform();
        physCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Translate to middle of canvas first, and then zoom in; this ensures that
        // the zoom's origin is always from the centerpoint of the canvas.
        physCtx.translate(this.canvasWidth / 2, this.canvasHeight / 2)
        physCtx.scale(this.context.viewport.scale, this.context.viewport.scale);
        physCtx.translate((-this.canvasWidth / 2) - this.context.viewport.topLeftX, (-this.canvasHeight / 2) - this.context.viewport.topLeftY);

        // Note: Game represents each tile as a 16x16 pixel block

        // Determine with scaling factor where our top left and bottom right are (in tile units). A clear way to think about it is to
        // take the midpoint of where our canvas is, and then grow it out in all directions using the scaling factor. Divide by two
        // to get the half width and half height so that way we can simply subtract to find top left, and add to find bottom right corners.

        let newHW = (this.canvasWidth / this.context.viewport.scale) / 2.0;
        let newHH = (this.canvasHeight / this.context.viewport.scale) / 2.0;

        let hwx = this.context.viewport.topLeftX + (this.canvasWidth / 2.0);
        let hwy = this.context.viewport.topLeftY + (this.canvasHeight / 2.0);

        // Now simply add the new scalingW 

        let TLX = Math.floor((hwx - newHW) / 16) - 1;
        let TLY = Math.floor((hwy - newHH) / 16) - 1;

        let BRX = Math.ceil((hwx + newHW) / 16) + 1;
        let BRY = Math.ceil((hwy + newHH) / 16) + 1;

        const file = this.context?.file;
        const header = file?.header;

        if (!header) {
            throw new Error('Missing header');
        }

        if (TLX < 0) {
            TLX = 0;
        }

        if (TLY < 0) {
            TLY = 0;
        }

        if (BRX > header.width) {
            BRX = header.width;
        }

        if (BRY > header.height) {
            BRY = header.height;
        }

        let tlCanvasX = Math.floor((TLX * 16) / this.floorCanvasSize);
        let tlCanvasY = Math.floor((TLY * 16) / this.floorCanvasSize);

        let brCanvasX = Math.ceil((BRX * 16) / this.floorCanvasSize);
        let brCanvasY = Math.ceil((BRY * 16) / this.floorCanvasSize);

        if (tlCanvasX < 0) {
            tlCanvasX = 0;
        }

        if (tlCanvasY < 0) {
            tlCanvasY = 0;
        }

        if (brCanvasX > this.canvasesWidth) {
            brCanvasX = this.canvasesWidth;
        }

        if (brCanvasY > this.canvasesHeight) {
            brCanvasY = this.canvasesHeight;
        }

        for (let x = tlCanvasX; x < brCanvasX; x++) {
            for (let y = tlCanvasY; y < brCanvasY; y++) {
                let offsetX = x * this.floorCanvasSize;
                let offsetY = y * this.floorCanvasSize;

                ctx.drawImage(this.floorCanvases[(y * this.canvasesWidth) + x], offsetX, offsetY);
                physCtx.drawImage(this.physicsCanvases[(y * this.canvasesWidth) + x], offsetX, offsetY);
            }
        }

        // Render objects

        // if (this.objectCanvas)
        // {
        //   if (this.objectCanvas.width != this.canvasWidth || this.objectCanvas.height != this.canvasHeight) {
        //     this.objectCanvas.width = this.canvasWidth;
        //     this.objectCanvas.height = this.canvasHeight;
        //   }

        //   const ctx = this.objectCanvas.getContext('2d');

        //   if (!ctx) {
        //     throw new Error();
        //   }

        //   ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        //   let tlGridX = Math.floor((TLX * 16) / this.floorCanvasSize);
        //   let tlGridY = Math.floor((TLY * 16) / this.floorCanvasSize);

        //   let brGridX = Math.ceil((BRX * 16) / this.floorCanvasSize);
        //   let brGridY = Math.ceil((BRY * 16) / this.floorCanvasSize);

        //   for (let x = tlGridX; x < brGridX; x++) { 
        //     for (let y = tlGridY; y < brGridY; y++) {
        //       let grid = this.objectGrid[(y * this.canvasesWidth) + x];

        //       for(let entity of grid.entities) {
        //         let objIndex = entity.bitsA & 0x00001FFF;
        //         let frameIndex = (entity.bitsA & 0x000FE000) >> 13;
        //         let obj = file.objects[objIndex];
        //         let objImage = this.cfsData.find(c => c.name === `${obj.filename}#${obj.id}`)?.frames[frameIndex];

        //         ctx.drawImage(objImage.bitmap, this.context.viewport.topLeftX + entity.x + objImage.x, this.context.viewport.topLeftY + entity.y + objImage.y);
        //       }
        //     }
        //   }
        // }

        if (this.rendering) {
            self.requestAnimationFrame((dt) => this.render(dt));
        }
    }

    renderMinimap(): ImageBitmap | null {
        let minimapCanvas = new OffscreenCanvas(512, 512);
        let ctx = minimapCanvas.getContext('2d');

        if (!ctx) {
            return null;
        }

        // The minimap canvas is 512; the largest a map can be is 2048x2048 (32768px x 32768px)
        // therefore our scaling factor is 64.

        ctx.clearRect(0, 0, 512, 512);
        ctx.scale(1 / 64, 1 / 64);

        for (let x = 0; x < this.canvasesWidth; x++) {
            for (let y = 0; y < this.canvasesHeight; y++) {
                let canvas = this.floorCanvases[(y * this.canvasesWidth) + x];

                ctx.drawImage(canvas, x * this.floorCanvasSize, y * this.floorCanvasSize);
            }
        }

        return minimapCanvas.transferToImageBitmap();
    }
}