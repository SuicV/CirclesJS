import { createCircle, createText } from './helpers/SVGHelper'
import { setDefaultCofnig } from './helpers/defaults'
import { exist } from './helpers/Validator'
import { getMiddleCoord } from './helpers/Geometrie'
import { fillCircleAnimation, getAnimationStep } from './helpers/Animation'

export default class Circles {
  constructor (conf) {
    this.config = conf

    // VERIFYING CIRCLE CONFIGURAITON
    exist(['el', 'radius', 'value'], { el: conf.el, ...conf.circle })

    // SETTING DEFAULTS CONFIGURATION
    this.circle = setDefaultCofnig(['stroke_width', 'stroke_color',
      'stroke_linecap'], conf.circle)

    if (typeof conf.middleText !== 'undefined') {
      this.middleText = setDefaultCofnig(['font_size', 'font_weight',
        'color', 'font_family'], conf.middleText)
    }

    if (typeof conf.fillRest === 'object') {
      this.fillRest = { ...this.circle, ...this.fillRest }
      typeof this.circle.max_value === 'undefined' ? this.fillRest.value = 100 : this.fillRest.value = this.circle.max_value
    }

    this.el = conf.el
    this.middle = getMiddleCoord(conf.el)

    this.isDrawed = false
  }

  draw () {
    this.isDrawed = true

    let fillRestPath, text
    const circlePath = createCircle({ ...this.circle, ...this.middle })

    if (typeof this.fillRest !== 'undefined') {
      fillRestPath = createCircle({ ...this.fillRest, ...this.middle })
      this.el.appendChild(fillRestPath)
    }
    if (typeof this.middleText !== 'undefined') {
      text = createText({ ...this.middleText, ...this.middle }, this.circle.value)
      this.el.appendChild(text)
    }

    this.el.appendChild(circlePath)
    this.elContent = {
      circle: circlePath,
      restCircle: fillRestPath,
      middleText: text
    }
  }

  animate (duration = 500) {
    const step = getAnimationStep(duration)
    const to = this.circle.value
    this.circle.value = 0
    this.draw()
    window.requestAnimationFrame(fillCircleAnimation.bind(this, duration, this.circle.value, to, 0, step))
  }
}
