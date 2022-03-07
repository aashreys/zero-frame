import { getEffectiveHeight, getEffectiveWidth, isAutoLayout } from "./utils";

const DEFAULT_FRAME_LENGTH = 100;

export function _createZeroFrame(type: ZeroFrameType, length?: number): FrameNode {
  let frame = figma.createFrame()
  frame.name = 'Frame'
  length = length ? length : DEFAULT_FRAME_LENGTH
  frame.resize(length, length)
  return _convertToZeroFrame(type, frame)
}

export function _convertToZeroFrame(type: ZeroFrameType, frame: FrameNode): FrameNode {
  /* Store child information and remove children from the frame we're about to 
  convert to a zero frame. */
  let children: Array<any> = []
  for (let child of frame.children) {
    children.push({
      layer: child,
      x: child.x,
      y: child.y
    })
    figma.currentPage.appendChild(child)
  }

  /* Begin Zero Frame conversion process
  The resize() API does not allow setting a Frame's height or width 
  to 0 so instead we create a Line, wrap it in an auto layout frame, convert 
  the auto layout into a regular frame, and finally remove the Line */
  let line: LineNode = figma.createLine()
  line.resize(type == ZeroFrameType.WIDTH ? getEffectiveHeight(frame) : getEffectiveWidth(frame), 0)
  line.rotation = type === ZeroFrameType.WIDTH ? 90 : 0
  frame.appendChild(line)


  /* Set up frame as autolayout which will be resized to a zero frame with 
  the line we created above */  

  let isAutoLayoutAlready: boolean = frame.layoutMode !== 'NONE'

  // Remove any padding depending on zero frame type
  if (type === ZeroFrameType.WIDTH) {
    frame.paddingLeft = frame.paddingRight = 0
  }
  else {
    frame.paddingTop = frame.paddingBottom = 0
  }

  // Set layout mode
  frame.layoutMode = isAutoLayoutAlready ? frame.layoutMode : 'VERTICAL'

  // Set sizing modes for primary and counter axis
  frame.primaryAxisSizingMode = isAutoLayoutAlready ? computePrimaryAxisSizingMode(type, frame) : 'AUTO'
  frame.counterAxisSizingMode = isAutoLayoutAlready ? computeCounterAxisSizingMode(type, frame) : 'AUTO'

  // Convert to regular frame if it was one before we started converting to zero frame
  frame.layoutMode = isAutoLayoutAlready ? frame.layoutMode : 'NONE'

  // Make it so we can see layers added to the zero frame
  frame.clipsContent = false

  // Remove line
  line.remove()

  // Add zero frame type to layer name
  frame.name = frame.name + (type === ZeroFrameType.WIDTH ? ' (Zero Width)' : ' (Zero Height)')

  console.log(frame.height)

  /* Zero Frame conversion process complete... 
  Restore children to the zero frame and orignal coordinates */
  for (let i in children) {
    frame.appendChild(children[i].layer)
    children[i].layer.x = children[i].x
    children[i].layer.y = children[i].y
  }
  
  // Return frame for further manipulation
  return frame
}

function computePrimaryAxisSizingMode(type: ZeroFrameType, frame: FrameNode): "FIXED" | "AUTO" {
  if (isAutoLayout(frame)) {
    if (frame.layoutMode === 'HORIZONTAL') { // primary axis is x-axis or width
      return type === ZeroFrameType.WIDTH ? 'FIXED' : frame.primaryAxisSizingMode
    }
    else { // primary axis is y-axis or height
      return type === ZeroFrameType.WIDTH ? frame.primaryAxisSizingMode : 'FIXED'
    }
  }
  else {
    return 'AUTO'
  }
}

function computeCounterAxisSizingMode(type: ZeroFrameType, frame: FrameNode): "FIXED" | "AUTO" {
  if (isAutoLayout(frame)) {
    if (frame.layoutMode === 'HORIZONTAL') { // counter axis is y-axis or height
      return type === ZeroFrameType.WIDTH ? frame.counterAxisSizingMode : 'FIXED'
    } 
    else { // counter axis is x-axis or width
      return type === ZeroFrameType.WIDTH ? 'FIXED' : frame.counterAxisSizingMode
    }
  }
  else {
    return 'AUTO'
  }
}

export enum ZeroFrameType {
  WIDTH, // width = 0
  HEIGHT // height = 0
}