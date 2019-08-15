import { valueToAngle } from './Maths'
import { getCirclePath, getTextValue } from './SVGHelper'
function linearAnimation (duration, from, to, time) {
  return Math.round(time * ((to - from) / duration) + from).toFixed(2)
}
export function getAnimationStep (duration) {
  for (let i = 10; i > 0; i--) {
    if (duration % i === 0) {
      return i
    }
  }
}
export function fillCircleAnimation (duration, from, to, currantTime, step) {
  if (currantTime <= duration || this.circle.value <= to) {
    const angle = valueToAngle(this.circle.value,
      this.circle.max_angle, this.circle.max_value)
    // GETTING d ATTRIBUTE AND CHANGE IT
    const dAttribute = getCirclePath(angle, { ...this.circle, ...this.middle })
    this.elContent.circle.setAttribute('d', dAttribute)

    // ANIMATE VALUE JUST WHEN MIDDLE VALUE ISN'T A TEXT
    if (typeof this.middleText !== 'undefined' && typeof this.middleText.value_type !== 'undefined') {
      this.elContent.middleText.textContent = getTextValue(this.circle.value, this.middleText.value_type)
    }
    this.circle.value = parseInt(linearAnimation(duration, from, to, currantTime))
    currantTime += step
    window.requestAnimationFrame(fillCircleAnimation.bind(this, duration, from, to, currantTime, step))
  }
}
