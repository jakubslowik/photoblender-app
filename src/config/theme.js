const typography = {
  baseFontSize: '16px',
  baseLineHeight: 1.55,
  scaleRatio: 4.5,
  headerFontFamily: [
    'GilroyBold',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  bodyFontFamily: [
    'GilroyMedium',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
};

const colors = {
  colorPrimary: `#341f7d`,
  colorPrimaryLight: `#5963ff`,
};

const shadows = {
  button: {
    default: '0 4px 10px rgba(0, 0, 0, 0.25)',
    hover: '0 2px 6px rgba(0, 0, 0, 0.10), 0 4px 15px rgba(0, 0, 0, 0.10)',
  },
  input: {
    default: '0 2px 6px rgba(0, 0, 0, 0.00)',
    hover: '0 0 5px rgba(255,255,255, 0.9), 0 2px 6px rgba(0, 0, 0, 0.05)',
    focus: '0 0 5px rgba(255,255,255, 0.9), 0 0 15px white, 0 5px 15px rgba(0, 0, 0, 0.05)'
  },
};

const breakpoints = {
  xs: '400px',
  s: '600px',
  m: '900px',
  l: '1200px',
  xl: '2100px',
}

const theme = {
  typography,
  colors,
  shadows,
  breakpoints,
  rhythm: function (multiplier) {
    return `${multiplier * typography.baseLineHeight}rem`
  }
};

export default theme;
