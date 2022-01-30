import { wrapInZeroWidthFrame } from "../zero_frame_lib";

export default function () {
  let numLayers: number = figma.currentPage.selection.length
  if (numLayers > 0) {
    wrapInZeroWidthFrame(figma.currentPage.selection)
    figma.closePlugin(`Wrapped ${numLayers} ${numLayers == 1 ? "layer" : "layers"} in Zero Width Frame`)
  } else {
    figma.closePlugin('Nothing selected. Please select layers to wrap.')
  }
}