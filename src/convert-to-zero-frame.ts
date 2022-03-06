import { isFrame } from "./utils";
import { ZeroFrameType, _convertToZeroFrame } from "./zero-frame-lib";

export function convertToZeroFrame(type: ZeroFrameType) {
  let selection = figma.currentPage.selection
  if (selection.length === 1) {
    for (let child of selection) {
      if(isFrame(child)) {
        let zeroFrame = _convertToZeroFrame(type, child as FrameNode)
      }  
    }
  }
}