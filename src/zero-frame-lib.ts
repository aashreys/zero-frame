const DEFAULT_FRAME_LENGTH = 100;

export function _createZeroFrame(type: ZeroFrameType, length?: number): FrameNode {
  /* The resize() API does not allow setting a Frame's height or width 
  to 0 so instead we create a Line, wrap it in an AutoLayout frame, then 
  convert it into a regular Frame, and finally remove the Line */
  
  // Create a Line
  let line: LineNode = figma.createLine()
  line.resize(length ? length : DEFAULT_FRAME_LENGTH, 0)
  line.rotation = type === ZeroFrameType.WIDTH ? 90 : 0

  // Create an AutoLayout Frame
  let zeroFrame: FrameNode = figma.createFrame()
  zeroFrame.name = type === ZeroFrameType.WIDTH ? 'Zero Width Frame' : 'Zero Height Frame'
  zeroFrame.appendChild(line)
  zeroFrame.layoutMode = "VERTICAL"
  zeroFrame.primaryAxisSizingMode = "AUTO"
  zeroFrame.counterAxisSizingMode = "AUTO"

  // Convert it to regular Frame
  zeroFrame.layoutMode = "NONE"

  // Make it so we can see layers added to the zero frame
  zeroFrame.clipsContent = false

  // Remove line
  line.remove()
  
  // Return frame for further manipulation
  return zeroFrame
}

export enum ZeroFrameType {
  WIDTH, // width = 0
  HEIGHT // height = 0
}