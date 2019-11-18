import { valueToAngle } from './Maths'
import { getCirclePath, getTextValue } from './SVGHelper'

/**
 * function return value to draw in a given time
 * @param {int} duration duration of animation
 * @param {int} from start value
 * @param {int} to end value
 * @param {float} time current time
 */
function linearAnimation (duration, from, to, time) {
  return (time * ((to - from) / duration) + from)
}
/**
 * function to animate filling of cirlce
 * @param {float} time current time
 * @param {int} duration duration of animation
 * @param {int} from start value
 * @param {int} to end value
 * @this {Cirlcle} this reference to Circle class
 */
export function fillCircleAnimation (time, duration, from, to) {
  const currentTime = +new Date()
  if (currentTime <= time + duration || to > this.circle.value) {
    const angle = valueToAngle(this.circle.value,
      this.circle.max_angle, this.circle.max_value)
    // GET VALUE TO DRAW
    this.circle.value = parseInt(linearAnimation(duration, from, to, currentTime - time))
    // GETTING d ATTRIBUTE AND CHANGE IT
    const dAttribute = getCirclePath(angle, { ...this.circle, ...this.middle })
    this.elContent.circle.setAttribute('d', dAttribute)

    // ANIMATE VALUE JUST WHEN MIDDLE VALUE ISN'T A TEXT
    if (typeof this.middleText !== 'undefined' && typeof this.middleText.value_type !== 'undefined') {
      this.elContent.middleText.textContent = getTextValue(this.circle.value, this.middleText.value_type)
    }
    window.requestAnimationFrame(fillCircleAnimation.bind(this, time, duration, from, to))
  }
}
