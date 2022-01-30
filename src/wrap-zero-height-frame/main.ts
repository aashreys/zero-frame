import { wrapInZeroHeightFrame } from "../zero_frame_lib";

export default function () {
  let numLayers: number = figma.currentPage.selection.length
  if (numLayers > 0) {
    wrapInZeroHeightFrame(figma.currentPage.selection)
    figma.closePlugin(`Wrapped ${numLayers} ${numLayers == 1 ? "layer" : "layers"} in Zero Height Frame`)
  } else {
    figma.closePlugin('Nothing selected. Please select layers to wrap.')
  }
}