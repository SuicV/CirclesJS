import { valueToAngle } from './Maths'
import { getCirclePath, getTextValue } from './SVGHelper'
function linearAnimation (duration, from, to, time) {
  return (time * ((to - from) / duration) + from).toFixed(2)
}
export function fillCircleAnimation (time, duration, from, to) {
  const currentTime = +new Date()
  if (currentTime <= time + duration) {
    const angle = valueToAngle(this.circle.value,
      this.circle.max_angle, this.circle.max_value)
    // GETTING d ATTRIBUTE AND CHANGE IT
    const dAttribute = getCirclePath(angle, { ...this.circle, ...this.middle })
    this.elContent.circle.setAttribute('d', dAttribute)

    // ANIMATE VALUE JUST WHEN MIDDLE VALUE ISN'T A TEXT
    if (typeof this.middleText !== 'undefined' && typeof this.middleText.value_type !== 'undefined') {
      this.elContent.middleText.textContent = getTextValue(this.circle.value, this.middleText.value_type)
    }
    this.circle.value = linearAnimation(duration, from, to, currentTime - time)
    window.requestAnimationFrame(fillCircleAnimation.bind(this, time, duration, from, to))
  }
}
