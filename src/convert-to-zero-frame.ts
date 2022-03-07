import { isFrame } from "./utils";
import { ZeroFrameType, _convertToZeroFrame } from "./zero-frame-lib";

export function convertToZeroFrame(type: ZeroFrameType): string {
  let selection = figma.currentPage.selection
  if (selection.length > 0) {
    let count = 0
    for (let child of selection) {
      if(isFrame(child)) {
        _convertToZeroFrame(type, child as FrameNode)
        count++
      }  
    }
    return `Converted ${count} ${count === 1 ? 'frame' : 'frames'} to zero ${count === 1 ? 'frame' : 'frames'}! 🎉`
  }
  else {
    return '🛑 Please select one or more frames or auto layouts to convert.'
  }
}