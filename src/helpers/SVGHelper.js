import { degToRad, getCordFromAngle, getComputedRadius } from './Geometrie'
import { valueToAngle } from './Maths'
import { Defaults } from './defaults'
/**
 * CONSTANTS
 */
const PATH_SVGELEMENT = document.createElementNS('http://www.w3.org/2000/svg', 'path')
const TEXT_SVGELEMENT = document.createElementNS('http://www.w3.org/2000/svg', 'text')
/**
 * FUNCTIONS
 */

/**
 * @function setCircleAttr function to set circle style
 * @param {SVGGElement} svgElement SVG element to setAttributes
 * @param {Object} config contain circle configuration
 */
function setCircleAttr (svgElement, config) {
  svgElement.setAttribute('stroke-width', config.stroke_width)
  svgElement.setAttribute('stroke', config.stroke_color)
  svgElement.setAttribute('stroke-linecap', config.stroke_linecap)
  svgElement.setAttribute('fill', 'none')
  if (typeof config.class !== 'undefined') {
    svgElement.setAttribute('class', config.class)
  }
}

/**
 * @function getCirclePath function return circle path to append to svg element
 * @param {int} angle the angle of circle to draw in degree
 * @param {Object} config containt circle configuration
 */
export function getCirclePath (angle, config) {
  const middleCoord = { x: config.x, y: config.y }
  const computedRaduis = getComputedRadius(config.stroke_width, config.radius)
  const startAngle = typeof config.start_angle === 'number' ? Defaults.START_ANGLE.top_middle + degToRad(config.start_angle)
    : Defaults.START_ANGLE.top_middle
  const startCoord = getCordFromAngle(middleCoord, computedRaduis, startAngle)
  const endCoord = getCordFromAngle(middleCoord, computedRaduis, startAngle + degToRad(angle))

  // SETTING PATH INFORMATIONS
  if (angle < 180) {
    return ['M', startCoord.x, startCoord.y,
      'a', computedRaduis, computedRaduis, '0', '0', '1', endCoord.x - startCoord.x, endCoord.y - startCoord.y].join(' ')
  } else {
    const half = getCordFromAngle(middleCoord, computedRaduis, startAngle + Math.PI)
    return ['M', startCoord.x, startCoord.y,
      'a', computedRaduis, computedRaduis, '0', '0', '1', half.x - startCoord.x, half.y - startCoord.y,
      'a', computedRaduis, computedRaduis, '0', '0', '1', endCoord.x - half.x, endCoord.y - half.y].join(' ')
  }
}
/**
 * @function getTextValue function return value by used type in circle
 * @param {int} value value to write
 * @param {string} type value type
 * @returns {string} value to write
 */
export function getTextValue (value, type) {
  switch (type) {
    case Defaults.PERCENTAGE_VALUE_TYPE :
      return value + '%'
    case Defaults.NUMBER_VALUE_TYPE :
      return value
  }
}
/**
 * @function createText function return text elment to append in svg element
 * @param {Object} config configuration of text
 * @return {SVGElement}
 */
export function createText (config, value = 0) {
  const textSVGElement = TEXT_SVGELEMENT.cloneNode()
  textSVGElement.setAttribute('text-anchor', 'middle')
  textSVGElement.setAttribute('x', config.x)
  textSVGElement.setAttribute('y', config.y + config.font_size / 4)
  textSVGElement.setAttribute('style', `cursor:default;font-family: ${config.font_family};font-size:${config.font_size}px;font-weight:${config.font_weight};fill:${config.color};`)

  if (typeof config.class !== 'undefined') {
    textSVGElement.setAttribute('class', config.class)
  }
  if (typeof config.text === 'string') {
    textSVGElement.textContent = config.text
  } else if (typeof config.value_type === 'string') {
    textSVGElement.textContent = getTextValue(value, config.value_type)
  }
  return textSVGElement
}

/**
 * @function create_circle function return an SVGElement containe the circle path
 * @param {Object} config containe circle configuration
 * @returns {SVGElement} svg group contain the circle
 */
export function createCircle (config = {}) {
  const angle = valueToAngle(config.value, config.max_angle, config.max_value)
  const path = PATH_SVGELEMENT.cloneNode(false)
  path.setAttribute('d', getCirclePath(angle, config))

  setCircleAttr(path, config)

  return path
}
