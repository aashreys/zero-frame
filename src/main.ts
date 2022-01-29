export default function () {
  let zeroHeightFrame = createZeroHeightFrame(200)
  zeroHeightFrame.name = 'Zero Height Frame'
  let zeroWidthFrame = createZeroWidthFrame(200)
  zeroWidthFrame.name = 'Zero Width Frame'
  figma.closePlugin()
}

function createZeroHeightFrame(width?: number) {
  return _createZeroFrame(width, ZeroFrameType.WIDTH)
}

function createZeroWidthFrame(height?: number) {
  return _createZeroFrame(height, ZeroFrameType.HEIGHT)
}

function _createZeroFrame(length?: number, type?: ZeroFrameType): FrameNode {
  let line: LineNode = figma.createLine()
  line.resize(length ? length : 100, 0)
  line.rotation = type !== ZeroFrameType.HEIGHT ? 0 : 90 

  let frame: FrameNode = figma.createFrame()
  frame.appendChild(line)
  frame.layoutMode = "VERTICAL"
  frame.primaryAxisSizingMode = "AUTO"
  frame.counterAxisSizingMode = "AUTO"
  frame.layoutMode = "NONE"
  line.remove()
  return frame
}

enum ZeroFrameType {
  WIDTH,
  HEIGHT
}