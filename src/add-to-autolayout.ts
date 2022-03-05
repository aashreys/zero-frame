import { ZeroFrameType, _createZeroFrame } from "./zero-frame-lib"

export function addZeroWidthFrameToAutoLayout() {
  _addZeroFrameToAutoLayout(ZeroFrameType.WIDTH)
}

export function addZeroHeightFrameToAutoLayout() {
  _addZeroFrameToAutoLayout(ZeroFrameType.HEIGHT)
}

function _addZeroFrameToAutoLayout(type: ZeroFrameType) {
  let selection = figma.currentPage.selection
  if (selection.length === 1 && isAutoLayout(selection[0])) {
    let autoLayout: FrameNode = selection[0] as FrameNode
    let zeroFrame: FrameNode = _createZeroFrame(
      type, 
      type === ZeroFrameType.WIDTH ? 
        getEffectiveHeight(autoLayout) : 
        getEffectiveWidth(autoLayout)
    )
    setResizingConstraints(type, zeroFrame, autoLayout)
    autoLayout.appendChild(zeroFrame)
    figma.closePlugin(`Zero ${type === ZeroFrameType.WIDTH ? 'Width' : 'Height'} Frame added to Auto Layout! 🎉`)
  } else {
    figma.closePlugin('🛑 Please select an Auto Layout first.')
  }
}

function getEffectiveHeight(autoLayout: FrameNode) {
  return autoLayout.height - autoLayout.paddingTop - autoLayout.paddingBottom
}

function getEffectiveWidth(autoLayout: FrameNode) {
  return autoLayout.width - autoLayout.paddingLeft - autoLayout.paddingRight
}

function setResizingConstraints(type: ZeroFrameType, zeroFrame: FrameNode, autoLayout: FrameNode) {
  if (autoLayout.layoutMode === 'HORIZONTAL') {
    if (type === ZeroFrameType.WIDTH) {
      zeroFrame.layoutGrow = 0 // Set width to fixed
      zeroFrame.layoutAlign = 'STRETCH' // Set height to fill container
    }
    else {
      zeroFrame.layoutGrow = 0 // Set width to fixed
      zeroFrame.layoutAlign = 'INHERIT' // Set height to fixed
    }
  }

  if (autoLayout.layoutMode === 'VERTICAL') {
    if (type === ZeroFrameType.WIDTH) {
      zeroFrame.layoutGrow = 0 // Set height to be fixed
      zeroFrame.layoutAlign = 'INHERIT' // Set width to fixed
    }
    else {
      zeroFrame.layoutGrow = 0 // Set height to fixed
      zeroFrame.layoutAlign = 'STRETCH' // Set width to fill container
    }
  }
}

function isAutoLayout(node: SceneNode) {
  return node.type === 'FRAME' && node.layoutMode !== 'NONE'
}