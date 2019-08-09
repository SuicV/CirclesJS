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
  if (currantTime <= duration || this.config.circle.value <= to) {
    const angle = valueToAngle(this.config.circle.value,
      this.config.circle.max_angle, this.config.circle.max_value)
    // GETTING d ATTRIBUTE AND CHANGE IT
    const dAttribute = getCirclePath(angle, { ...this.config.circle, ...this.config.middle })
    this.elContent.circle.setAttribute('d', dAttribute)

    // ANIMATE VALUE JUST WHEN MIDDLE VALUE ISN'T A TEXT
    if (typeof this.config.middleText !== 'undefined' && typeof this.config.middleText.value_type !== 'undefined') {
      this.elContent.middleText.textContent = getTextValue(this.config.circle.value, this.config.middleText.value_type)
    }
    this.config.circle.value = parseInt(linearAnimation(duration, from, to, currantTime))
    currantTime += step
    window.requestAnimationFrame(fillCircleAnimation.bind(this, duration, from, to, currantTime, step))
  }
}
