import {createZeroHeightFrame} from "../zero_frame_lib";

export default function () {
  figma.parameters.on('input', ({ parameters, key, query, result }: ParameterInputEvent) => {
    result.setSuggestions([])
  })

  figma.on('run', ({ command, parameters }: RunEvent) => {
    let frame = createZeroHeightFrame(parseInt(parameters?.length))
    figma.viewport.scrollAndZoomIntoView([frame])
    figma.closePlugin(`Created ${frame.name}`)
  })
}