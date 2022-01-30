const DEFAULT_FRAME_LENGTH = 100;

export function createZeroHeightFrame(width?: number): FrameNode {
  let zeroFrame = _createZeroFrame(ZeroFrameType.HEIGHT, width);
  zeroFrame.name = 'Zero Height Frame'
  return zeroFrame
}

export function createZeroWidthFrame(height?: number): FrameNode {
  let zeroFrame =  _createZeroFrame(ZeroFrameType.WIDTH, height)
  zeroFrame.name = 'Zero Width Frame'
  return zeroFrame
}

export function wrapInZeroHeightFrame(layers: ReadonlyArray<BaseNode>) {
  return _wrapInZeroFrame(ZeroFrameType.HEIGHT, layers)
}

export function wrapInZeroWidthFrame(layers: ReadonlyArray<BaseNode>) {
  return _wrapInZeroFrame(ZeroFrameType.WIDTH, layers)
}

function _createZeroFrame(type: ZeroFrameType, length?: number): FrameNode {
  /* The resize() API does not allow setting a Frame's height or width 
  to 0 so we create a Line, wrap it in an AutoLayout frame, then convert
  it into a regular Frame, and finally remove the Line */
  
  // Create a Line
  let line: LineNode = figma.createLine()
  line.resize(length ? length : DEFAULT_FRAME_LENGTH, 0)
  line.rotation = type === ZeroFrameType.WIDTH ? 90 : 0

  // Create an AutoLayout Frame
  let zeroFrame: FrameNode = figma.createFrame()
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
  
  // Return frame for further manipulation, like setting the layer name
  return zeroFrame
}

// TODO: Needs error handling
function _wrapInZeroFrame(type: ZeroFrameType, layers: ReadonlyArray<BaseNode>) {
  if (layers.length > 0) {
    let parent = layers[0].parent;
    if (parent) {
      let tempGroup = figma.group(layers, parent)
      let zeroFrame = type === ZeroFrameType.WIDTH ? createZeroWidthFrame(tempGroup.height) : createZeroHeightFrame(tempGroup.width)
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
  }
}

enum ZeroFrameType {
  WIDTH, // width = 0
  HEIGHT // height = 0
}