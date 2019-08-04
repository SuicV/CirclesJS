/**
 * function return to convert degree angle to a radian angle
 * @param {number} deg the degree to convert
 */
export function degToRad (deg) {
  return deg * (Math.PI / 180)
}

/**
 * @function to get a cartesian coordination from polar coordination
 * @param {object} middleCord coordination of center of the circle
 * @param {Number} circleRadius radius of the circle
 * @param {Number} angle radian angle of the polar coordination
 */
export function getCordFromAngle (middleCord, circleRadius, angle) {
  const x = middleCord.x + circleRadius * Math.cos(angle)
  const y = middleCord.y + circleRadius * Math.sin(angle)

  return { x, y }
}

/**
 * @param {int} strokeWidth stroke width of arc
 * @param {int} circleRadius radius of the circle
 * @param {int} margin margin to add
 */
export function getComputedRadius (strokeWidth, circleRadius, margin = 0) {
  return circleRadius - margin - (strokeWidth / 2)
}
