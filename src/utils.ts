export function isAutoLayout(node: SceneNode) {
  return node.type === 'FRAME' && node.layoutMode !== 'NONE'
}

export function isFrame(node: SceneNode) {
  return node.type === 'FRAME'
}

export function isGroup(node: SceneNode) {
  return node.type === 'GROUP'
}

export function isGroupOrFrame(node: SceneNode) {
  return isGroup(node) || isFrame(node)
}

export function getEffectiveHeight(node: SceneNode) {
  if (isAutoLayout(node)) {
    let autoLayout: FrameNode = node as FrameNode
    return autoLayout.height - autoLayout.paddingTop - autoLayout.paddingBottom
  }
  else {
    return node.height
  }
}

export function getEffectiveWidth(node: SceneNode) {
  if (isAutoLayout(node)) {
    let autoLayout: FrameNode = node as FrameNode
    return autoLayout.width - autoLayout.paddingLeft - autoLayout.paddingRight
  }
  else {
    return node.width
  }
}

export function centerInViewport(node: SceneNode) {
  let viewport = figma.viewport.bounds
  node.x = viewport.x + (viewport.width / 2) - (node.width / 2)
  node.y = viewport.y + (viewport.height / 2) - (node.height / 2)
}