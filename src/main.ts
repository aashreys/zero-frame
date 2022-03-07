import { addZeroFrame } from "./add-zero-frame";
import { convertToZeroFrame } from "./convert-to-zero-frame";
import { wrapInZeroFrame } from "./wrap-in-zero-frame";
import { ZeroFrameType } from "./zero-frame-lib";
import { showUI } from '@create-figma-plugin/utilities'

export function showReadme() {
  showUI({ width: 290, height: 302, title: 'Zero Frame Readme' })
}

export function addZeroHeightFrame() {
  figma.closePlugin(addZeroFrame(ZeroFrameType.HEIGHT))
}

export function addZeroWidthFrame() {
  figma.closePlugin(addZeroFrame(ZeroFrameType.WIDTH))
}

export function convertToZeroHeightFrame() {
  figma.closePlugin(convertToZeroFrame(ZeroFrameType.HEIGHT)) 
}

export function convertToZeroWidthFrame() {
  figma.closePlugin(convertToZeroFrame(ZeroFrameType.WIDTH))
}

export function wrapInZeroHeightFrame() {
  figma.closePlugin(wrapInZeroFrame(ZeroFrameType.HEIGHT))
}

export function wrapInZeroWidthFrame() {
  figma.closePlugin(wrapInZeroFrame(ZeroFrameType.WIDTH))
}