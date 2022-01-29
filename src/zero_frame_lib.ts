export default function () {
  let zeroHeightFrame = createZeroHeightFrame(200)
  zeroHeightFrame.name = 'Zero Height Frame'
  let zeroWidthFrame = createZeroWidthFrame(200)
  zeroWidthFrame.name = 'Zero Width Frame'
  figma.closePlugin()
}

export function createZeroHeightFrame(width?: number) {
  return _createZeroFrame(width, ZeroFrameType.WIDTH)
}

export function createZeroWidthFrame(height?: number) {
  return _createZeroFrame(height, ZeroFrameType.HEIGHT)
}

function _createZeroFrame(length?: number, type?: ZeroFrameType): FrameNode {
  /* The resize() API does not allow setting a Frame's height or width 
  to 0 so we create a Line, wrap it in an AutoLayout frame, then convert
  it into a regular Frame, and finally remove the Line */
  
  // Create a Line
  let line: LineNode = figma.createLine()
  line.resize(length ? length : 100, 0)
  line.rotation = type !== ZeroFrameType.HEIGHT ? 0 : 90

  // Create an AutoLayout Frame
  let zeroFrame: FrameNode = figma.createFrame()
  zeroFrame.appendChild(line)
  zeroFrame.layoutMode = "VERTICAL"
  zeroFrame.primaryAxisSizingMode = "AUTO"
  zeroFrame.counterAxisSizingMode = "AUTO"

  // Convert it to regular Frame
  zeroFrame.layoutMode = "NONE"

  // Remove line
  line.remove()
  
  // Return frame for further manipulation, like setting the layer name
  return zeroFrame
}

enum ZeroFrameType {
  WIDTH,
  HEIGHT
}