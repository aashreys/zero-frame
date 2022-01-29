import {createZeroHeightFrame} from "../zero_frame_lib";

export default function () {
  figma.parameters.on('input', ({ parameters, key, query, result }: ParameterInputEvent) => {
    result.setSuggestions([])
  })

  figma.on('run', ({ command, parameters }: RunEvent) => {
    let zeroFrame = createZeroHeightFrame(parseInt(parameters?.length))
    zeroFrame.name = 'Zero Height Frame'
    figma.closePlugin()
  })
}