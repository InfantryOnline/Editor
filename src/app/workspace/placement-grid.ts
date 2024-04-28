import { Bounds } from "./bounds";
import { Viewport } from "./viewport";

/**
 * Allows for creating and visualizing of a grid, usually used for placement of
 * things like terrain tiles, physics tiles, and vision tiles.
 */
export class PlacementGrid {
    public activeBounds: Bounds | null = null;

    constructor(private vp: Viewport) {}

    /**
     * Returns the bounds that represent one tile at a given viewport pixel, taking scaling into account.
     * 
     * @param x 
     * @param y 
     */
    getGridTileAtViewportPixel(x: number, y: number) : Bounds {
        throw new Error('Not implemented.');
    }

    /**
     * Returns the bounds that represent the span of tiles at a given viewport bounds, taking scaling into account.
     * @param bounds 
     */
    getGridTilesAtViewportPixelSpan(pxSpan: Bounds): Bounds  {
        let tl = this.getGridTileAtViewportPixel(pxSpan.left, pxSpan.top);
        let br = this.getGridTileAtViewportPixel(pxSpan.right, pxSpan.bottom);

        let output = { left: tl.left, top: tl.top, right: br.right, bottom: br.bottom };

        if (output.left > output.right) {
            let tmp = output.right;
            output.right = output.left;
            output.left = tmp;
        }

        if (output.top > output.bottom) {
            let tmp = output.bottom;
            output.bottom = output.top;
            output.top = tmp;
        }

        return output;
    }
}