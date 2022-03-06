import { addZeroFrame } from "./add-zero-frame";
import { convertToZeroFrame } from "./convert-to-zero-frame";
import { wrapInZeroFrame } from "./wrap-in-zero-frame";
import { ZeroFrameType } from "./zero-frame-lib";

export function addZeroHeightFrame() {
  initializePlugin()
  addZeroFrame(ZeroFrameType.HEIGHT)
}

export function addZeroWidthFrame() {
  initializePlugin()
  addZeroFrame(ZeroFrameType.WIDTH)
}

export function convertToZeroHeightFrame() {
  initializePlugin()
  convertToZeroFrame(ZeroFrameType.HEIGHT)
}

export function convertToZeroWidthFrame() {
  initializePlugin()
  convertToZeroFrame(ZeroFrameType.WIDTH)
}

export function wrapInZeroHeightFrame() {
  initializePlugin()
  wrapInZeroFrame(ZeroFrameType.HEIGHT)
}

export function wrapInZeroWidthFrame() {
  initializePlugin()
  wrapInZeroFrame(ZeroFrameType.WIDTH)
}

function initializePlugin() {
  console.log('Initializing Zero Frame...')
}