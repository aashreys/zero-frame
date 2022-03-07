import { isFrame, isAutoLayout, isGroup, getEffectiveHeight, getEffectiveWidth, centerInViewport } from "./utils"
import { ZeroFrameType, _createZeroFrame } from "./zero-frame-lib"

export function addZeroFrame(type: ZeroFrameType) {
  let selection = figma.currentPage.selection
  if (selection.length > 0) {
    let count = 0
    for (let child of selection) {
      if (isFrame(child)) {
        let zeroFrame = _addZeroFrameToContainer(type, child as FrameNode | GroupNode)
        count++
      }
    }
    return `Added zero ${count === 1 ? 'frame' : 'frames'} to ${count} ${count === 1 ? 'frame' : 'frames'}! 🎉`
  }
  else {
    let zeroFrame = _addZeroFrameToCanvas(type)
    centerInViewport(zeroFrame)
    figma.viewport.scrollAndZoomIntoView([zeroFrame])
    figma.currentPage.selection = [zeroFrame]
    return 'Added a zero frame to the canvas! 🎉'
  }
}

function _addZeroFrameToCanvas(type: ZeroFrameType): FrameNode {
  return _createZeroFrame(type)
}

function _addZeroFrameToContainer(type: ZeroFrameType, container: FrameNode | GroupNode): FrameNode {
  if (isFrame(container)) {
    if (isAutoLayout(container)) {
      return _addZeroFrameToAutoLayout(type, container as FrameNode)
    }
    else {
      return _addZeroFrameToFrame(type, container as FrameNode)
    }
  }
  else if (isGroup(container)) {
    return _addZeroFrameToGroup(type, container as GroupNode)
  }
  else {
    throw Error('Container is neither Frame nor Group. Cannot add Zero Frame.')
  }
}

function _addZeroFrameToGroup(type: ZeroFrameType, group: GroupNode): FrameNode {
  let zeroFrame = _createZeroFrame(
    type, 
    type === ZeroFrameType.WIDTH ? 
      getEffectiveHeight(group) : 
      getEffectiveWidth(group)
  )
  group.appendChild(zeroFrame)
  return zeroFrame
}

function _addZeroFrameToFrame(type: ZeroFrameType, frame: FrameNode): FrameNode {
  let zeroFrame = _createZeroFrame(
    type, 
    type === ZeroFrameType.WIDTH ? 
      getEffectiveHeight(frame) : 
      getEffectiveWidth(frame)
  )
  frame.appendChild(zeroFrame)
  return zeroFrame
}

function _addZeroFrameToAutoLayout(type: ZeroFrameType, autoLayout: FrameNode): FrameNode {
  let zeroFrame: FrameNode = _createZeroFrame(
    type, 
    type === ZeroFrameType.WIDTH ? 
      getEffectiveHeight(autoLayout) : 
      getEffectiveWidth(autoLayout)
  )
  setResizingConstraints(type, zeroFrame, autoLayout)
  autoLayout.appendChild(zeroFrame)
  return zeroFrame
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