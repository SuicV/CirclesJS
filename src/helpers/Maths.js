/**
 * function to convert value to an angle in circle
 * @param {int} value value to convert to an angle
 * @param {int} maxAngle maximum arc of circle in angle default value 360 degree (hole circle)
 * @param {int} maxValue maximume value in the arc
 * @returns {int}
 */
export function valueToAngle (value, maxAngle = 360, maxValue = 100) {
  return (value * maxAngle) / maxValue
}
