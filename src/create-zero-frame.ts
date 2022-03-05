import { ZeroFrameType, _createZeroFrame } from "./zero-frame-lib"

export function createZeroHeightFrame() {
  _createFrame(ZeroFrameType.HEIGHT)
}

export function createZeroWidthFrame() {
  _createFrame(ZeroFrameType.WIDTH)
}

function _createFrame(type: ZeroFrameType) {
  figma.parameters.on('input', ({ parameters, key, query, result }: ParameterInputEvent) => {
    result.setSuggestions([])
  })

  figma.on('run', ({ command, parameters }: RunEvent) => {
    let frame: FrameNode = _createZeroFrame(type, parseInt(parameters?.length.replace('px', '')))
    figma.viewport.scrollAndZoomIntoView([frame])
    figma.closePlugin(`Created Zero ${type === ZeroFrameType.WIDTH ? 'Width' : 'Height'} Frame 🎉`)
  })
}