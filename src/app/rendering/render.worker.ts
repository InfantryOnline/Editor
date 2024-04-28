/// <reference lib="webworker" />

import { Renderer } from "./renderer";


let renderer = new Renderer();

addEventListener('message', async ({ data }) => {
  if (data.type === 'load') {
    renderer.context = data.context;
    renderer.terrainCanvas = data.terrainCanvas;
    renderer.objectCanvas = data.objectCanvas; 
    await renderer.load();

    self.postMessage({type: 'loaded'});
  }
  if (data.type === 'startrender') {
    let bounds = data.bounds;

    if (renderer.context) {
      renderer.context.viewport.topLeftX = bounds.x;
      renderer.context.viewport.topLeftY = bounds.y;
      renderer.canvasWidth = bounds.width;
      renderer.canvasHeight = bounds.height;
    }
    renderer.rendering = true;
    self.requestAnimationFrame((dt) => renderer.render(dt)); 
  }
  else if (data.type === 'updaterender') {
    let bounds = data.bounds;

    if (renderer.context) {
      renderer.context.viewport.topLeftX = bounds.x;
      renderer.context.viewport.topLeftY = bounds.y;
      renderer.context.viewport.scale = bounds.scale;
      renderer.canvasWidth = bounds.width;
      renderer.canvasHeight = bounds.height;
    }
  } else if (data.type === 'renderminimap') {
    let bitmap = renderer.renderMinimap();

    if (bitmap) {
      self.postMessage({type: 'minimap', bitmap: bitmap}, {transfer: [bitmap]});
    }

  } else if (data.type === 'stoprender') {
    renderer.rendering = false;
  }
});
