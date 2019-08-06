import { degToRad, getCordFromAngle, getComputedRadius } from './Geometrie'
import { valueToAngle } from './Maths'
import { Defaults } from './defaults'
/**
 * CONSTANTS
 */
export const GROUP_SVGELEMENT = document.createElementNS('http://www.w3.org/2000/svg', 'g')
export const PATH_SVGELEMENT = document.createElementNS('http://www.w3.org/2000/svg', 'path')
export const TEXT_SVGELEMENT = document.createElementNS('http://www.w3.org/2000/svg', 'text')
/**
 * FUNCTIONS
 */

/**
 * @function setCircleAttr function to set circle style
 * @param {SVGGElement} svgElement SVG element to setAttributes
 * @param {Object} config contain circle configuration
 */
function setCircleAttr (svgElement, config) {
  svgElement.setAttribute('stroke-width', config.strokeWidth)
  svgElement.setAttribute('stroke', config.color)
  svgElement.setAttribute('stroke-linecap', config.linecap)
  svgElement.setAttribute('fill', 'none')
  if (typeof config.id !== 'undefined') {
    svgElement.setAttribute('id', config.id)
  }
}

/**
 * @function getCirclePath function return circle path to append to svg element
 * @param {int} angle the angle of circle to draw in degree
 * @param {Object} config containt circle configuration
 */
function getCirclePath (angle, config) {
  const path = PATH_SVGELEMENT.cloneNode(false)

  const middleCoord = { x: config.width / 2, y: config.height / 2 }
  const computedRaduis = getComputedRadius(config.strokeWidth, config.radius)
  const startAngle = typeof config.startAngle === 'number' ? degToRad(config.startAngle) : Defaults.START_ANGLE.top_middle
  const startCoord = getCordFromAngle(middleCoord, computedRaduis, startAngle)
  const endCoord = getCordFromAngle(middleCoord, computedRaduis, startAngle + degToRad(angle))

  if (angle < 180) {
    path.setAttribute('d', `M${startCoord.x},${startCoord.y}
                            a${computedRaduis},${computedRaduis} 0 0 1 ${endCoord.x - startCoord.x}, ${endCoord.y - startCoord.y}`)
  } else {
    const half = getCordFromAngle(middleCoord, computedRaduis, startAngle + Math.PI)
    path.setAttribute('d', `M${startCoord.x},${startCoord.y}
                            a${computedRaduis},${computedRaduis} 0 0 1 ${half.x - startCoord.x}, ${half.y - startCoord.y}
                            a${computedRaduis},${computedRaduis} 0 0 1 ${endCoord.x - half.x}, ${endCoord.y - half.y}`)
  }
  return path
}

function getTextValue (value, type) {
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
  textSVGElement.setAttribute('x', config.width / 2)
  textSVGElement.setAttribute('y', config.height / 2 + config.fontSize / 4)
  textSVGElement.setAttribute('style', `font-family: ${config.fontFamily};font-size:${config.fontSize}px;font-weight:${config.fontWeight};fill:${config.color};`)
  if (typeof config.id !== 'undefined') {
    textSVGElement.setAttribute('id', config.id)
  }
  if (typeof config.text === 'string') {
    textSVGElement.textContent = config.text
  }
  if (typeof config.valueType === 'string') {
    textSVGElement.textContent = getTextValue(value, config.valueType)
  }
  return textSVGElement
}

/**
 * @function create_circle function return an SVGElement containe the circle path
 * @param {Object} config containe circle configuration
 * @returns {SVGElement} svg group contain the circle
 */
export function createCircle (config = {}) {
  const angle = valueToAngle(config.value, config.maxAngle, config.maxValue)
  const path = getCirclePath(angle, config)

  setCircleAttr(path, config)

  return path
}
