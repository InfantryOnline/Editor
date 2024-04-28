import { Bounds } from "./bounds";
import { MAPSIZE_PIXELS, MINIMAP_PIXELS } from "./constants";
import { Viewport } from "./viewport";

/**
 * Allows for some basic querying and updating of the viewport if we are using the minimap.
 */
export class Minimap {
    readonly Width  = MINIMAP_PIXELS;
    readonly Height = MINIMAP_PIXELS;

    readonly MinimapScaleX = (MAPSIZE_PIXELS) / this.Width;
    readonly MinimapScaleY = (MAPSIZE_PIXELS) / this.Height;

    constructor(private vp: Viewport) {}

    /**
     * Returns the rectangular area within the minimap that is currently visible
     * in the actual viewport. This will be bounded by [0, 0,] -> [Width, Height] respectively.
     */
    get viewportBounds(): Bounds {
        // Because we are dealing with the scaling factor, we will
        // find the mid point and then grow it out.

        let hw = (this.vp.topLeftX + this.vp.width  / 2.0);
        let hh = (this.vp.topLeftY + this.vp.height / 2.0);

        let newHW = (this.vp.width  / this.vp.scale) / 2.0;
        let newHH = (this.vp.height / this.vp.scale) / 2.0;

        let b: Bounds = {
            left:   (hw - newHW) / this.MinimapScaleX,
            top:    (hh - newHH) / this.MinimapScaleY,
            right:  (hw + newHW) / this.MinimapScaleX,
            bottom: (hh + newHH) / this.MinimapScaleY
        };

        return b;
    }

    /**
     * Converts minimap location to viewport location.
     * 
     * @param x
     * @param y 
     */
    toViewport(x: number, y: number): {x: number, y: number} {
        return {
            x: (x * this.MinimapScaleX),
            y: (y * this.MinimapScaleY)
        };
    }

    /**
     * Converts minimap location to viewport location.
     * 
     * The returned point is half-width, half-height subtracted so that it
     * can represent the center point in the viewport.
     * 
     * @param x 
     * @param y 
     */
    toViewportOffCenter(x: number, y: number): {x: number, y: number} { 
        const vpCoord = this.toViewport(x, y);
        
        let hw = (this.vp.width) / 2.0;
        let hh = (this.vp.height) / 2.0;

        return {x: vpCoord.x - hw, y: vpCoord.y - hh};
    }
}