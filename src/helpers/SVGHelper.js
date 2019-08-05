import { degToRad, getCordFromAngle, getComputedRadius } from './Geometrie'
import { valueToAngle } from './Maths'
import { Defaults } from './defaults'
/**
 * CONSTANTS
 */
export const GROUP_SVGELEMENT = document.createElementNS('http://www.w3.org/2000/svg', 'g')
export const PATH_SVGELEMENT = document.createElementNS('http://www.w3.org/2000/svg', 'path')

/**
 * FUNCTIONS
 */

/**
 * @function setCircleAttr function to set circle style
 * @param {SVGGElement} svgElement SVG element to setAttributes
 * @param {Object} config contain circle configuration
 */
function setCircleAttr (svgElement, config) {
  svgElement.setAttribute('stroke-width', (typeof config.strokeWidth === 'number') ? config.strokeWidth : Defaults.STROKE_WIDTH)
  svgElement.setAttribute('stroke', (typeof config.color === 'string') ? config.color : Defaults.STROKE_COLOR)
  svgElement.setAttribute('stroke-linecap', typeof config.linecap === 'string' ? config.linecap : Defaults.LINE_CAP)
  svgElement.setAttribute('fill', 'none')
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

/**
 * @function create_circle function return an SVGElement containe the circle path
 * @param {Object} config containe circle configuration
 * @returns {SVGGElement} svg group contain the circle
 */
export function createCircle (config = {}) {
  const angle = valueToAngle(config.value, config.maxAngle, config.maxValue)
  const path = getCirclePath(angle, config)

  setCircleAttr(path, config)

  return path
}
