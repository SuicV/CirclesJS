import { createCircle } from './helpers/SVGHelper'
import { Defaults } from './helpers/defaults'

export default class Circles {
  constructor (conf) {
    this.config = conf

    // VERIFYING CIRCLE CONFIGURAITON
    if (typeof conf.el === 'undefined') {
      throw new Error('Svg element not defined in configuration with \'el\' attribute')
    }
    if (typeof conf.radius === 'undefined') {
      throw new Error('Circle radius not defined. define it with \'radius\' attribute')
    }
    if (typeof conf.value === 'undefined') {
      throw new Error('Value to draw is undefined use the attribute \'value\' to define it')
    }

    // SETTING DEFAULTS CONFIGURATION
    if (typeof conf.strokeWidth === 'undefined') {
      this.config.strokeWidth = Defaults.STROKE_WIDTH
    }

    if (typeof conf.color === 'undefined') {
      this.config.color = Defaults.STROKE_COLOR
    }

    this.el = conf.el
    const size = this.el.getBoundingClientRect()
    this.config.width = size.width
    this.config.height = size.height
  }

  draw () {
    const svgGroup = createCircle(this.config)
    this.el.appendChild(svgGroup)
  }
}
