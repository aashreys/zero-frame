import { ZeroFrameType, _createZeroFrame } from "./zero-frame-lib";

export function wrapInZeroFrame(type: ZeroFrameType): string {
  let selection = figma.currentPage.selection
  if (selection.length > 0) {
    let parent = selection[0].parent;
    if (parent) {
      let tempGroup = figma.group(selection, parent)
      let zeroFrame = _createZeroFrame(type, type === ZeroFrameType.WIDTH ? tempGroup.height : tempGroup.width)
      parent.appendChild(zeroFrame);
      zeroFrame.x = tempGroup.x;
      zeroFrame.y = tempGroup.y;
      zeroFrame.appendChild(tempGroup)
      tempGroup.x = 0
      tempGroup.y = 0
      for (let child of tempGroup.children) {
        zeroFrame.appendChild(child)
      }
      figma.currentPage.selection = [zeroFrame]
    }
    return `Wrapped ${selection.length} ${selection.length === 1 ? 'layer' : 'layers'} in a zero frame! 🎉`
  }
  else {
    return '🛑 Please select one or more layers wrap.'
  }
}