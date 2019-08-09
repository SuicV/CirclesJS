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
    this.config.circle = setDefaultCofnig(['stroke_width', 'stroke_color',
      'stroke_linecap'], conf.circle)

    if (typeof conf.middleText !== 'undefined') {
      this.config.middleText = setDefaultCofnig(['font_size', 'font_weight',
        'color', 'font_family'], conf.middleText)
    }

    if (typeof conf.fillRest === 'object') {
      this.config.fillRest = { ...this.config.circle, ...this.config.fillRest }
      typeof this.config.circle.max_value === 'undefined' ? this.config.fillRest.value = 100 : this.config.fillRest.value = this.config.circle.max_value
    }

    this.el = conf.el
    this.config.middle = getMiddleCoord(conf.el)

    this.isDrawed = false
  }

  draw () {
    this.isDrawed = true

    let fillRestPath, text
    const circlePath = createCircle({ ...this.config.circle, ...this.config.middle })

    if (typeof this.config.fillRest !== 'undefined') {
      fillRestPath = createCircle({ ...this.config.fillRest, ...this.config.middle })
      this.el.appendChild(fillRestPath)
    }
    if (typeof this.config.middleText !== 'undefined') {
      text = createText({ ...this.config.middleText, ...this.config.middle }, this.config.circle.value)
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
    const to = this.config.circle.value
    this.config.circle.value = 0
    this.draw()
    window.requestAnimationFrame(fillCircleAnimation.bind(this, duration, this.config.circle.value, to, 0, step))
  }
}
