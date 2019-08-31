export const Defaults = {

  /* VALUES TYPES */
  PERCENTAGE_VALUE_TYPE: 'percentage',
  NUMBER_VALUE_TYPE: 'number',
  TEXT_VALUE_TYPE: 'text',
  /* CIRCLE STYLE */
  STROKE: 'black',
  STROKE_WIDTH: 1,
  STROKE_LINECAP: 'round',
  START_ANGLE: {
    top_middle: (3 / 2) * Math.PI
  },
  FILL: 'none',
  /* FONTS */
  FONT_SIZE: 16,
  FONT_WEIGHT: 'regular',
  COLOR: 'black'
}

export function setDefaultCofnig (keys, config = {}) {
  keys.forEach(element => {
    if (typeof config[element] === 'undefined') {
      config[element] = Defaults[element.toUpperCase()]
    }
  })
  return config
}
