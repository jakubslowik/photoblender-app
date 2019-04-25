
const CONFIG = {
  hueRotate: {
    min: -180,
    max: 180,
    step: 1,
    mouseWheelSpeed: 5
  },
  saturate: {
    min: 0,
    max: 300,
    step: 1,
    mouseWheelSpeed: 5
  },
  brightness: {
    min: 0,
    max: 3,
    step: 0.01,
    mouseWheelSpeed: 1
  },
  contrast: {
    min: 0,
    max: 3,
    step: 0.01,
    mouseWheelSpeed: 1
  },
  blur: {
    min: 0,
    max: 100,
    step: 1,
    mouseWheelSpeed: 1
  },
  grayscale: {
    min: 0,
    max: 100,
    step: 1,
    mouseWheelSpeed: 5
  },
  sepia: {
    min: 0,
    max: 100,
    step: 1,
    mouseWheelSpeed: 5
  },
  opacity: {
    min: 0,
    max: 100,
    step: 1,
    mouseWheelSpeed: 5
  },
};

const MIX_BLEND_MODES = [
  'normal',
  'darken',
  'multiply',
  'color-burn',
  'lighten',
  'screen',
  'color-dodge',
  'overlay',
  'soft-light',
  'hard-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
];

export {
  CONFIG,
  MIX_BLEND_MODES
}