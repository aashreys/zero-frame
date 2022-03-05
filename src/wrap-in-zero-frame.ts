import { ZeroFrameType, _createZeroFrame } from "./zero-frame-lib";

export function wrapInZeroWidthFrame() {
  return _wrapInZeroFrame(ZeroFrameType.WIDTH)
}

export function wrapInZeroHeightFrame() {
  return _wrapInZeroFrame(ZeroFrameType.HEIGHT)
}

function _wrapInZeroFrame(type: ZeroFrameType) {
  let layers = figma.currentPage.selection
  if (layers.length > 0) {
    let parent = layers[0].parent;
    if (parent) {
      let tempGroup = figma.group(layers, parent)
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
    }
    figma.closePlugin(`Wrapped ${layers.length} ${layers.length === 1 ? 'layer' : 'layers'} in Zero ${type === ZeroFrameType.WIDTH ? 'Width' : 'Height'} Frame! 🎉`)
  }
  else {
    figma.closePlugin('🛑 Please select one or more layers wrap.')
  }
}