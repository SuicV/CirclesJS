import { createCircle, createText } from './helpers/SVGHelper'
import { Defaults } from './helpers/defaults'

export default class Circles {
  constructor (conf) {
    this.config = conf

    // VERIFYING CIRCLE CONFIGURAITON
    if (typeof conf.el === 'undefined') {
      throw new Error('Svg element not defined in configuration with \'el\' attribute')
    }
    if (typeof conf.circle.radius === 'undefined') {
      throw new Error('Circle radius not defined. define it with \'radius\' attribute')
    }
    if (typeof conf.circle.value === 'undefined') {
      throw new Error('Value to draw is undefined use the attribute \'value\' to define it')
    }
    if (typeof conf.middleText.text !== 'undefined' && typeof conf.middleText.valueType !== 'undefined') {
      throw new Error('You set both attributes \'text\' and \'valueType\'')
    }
    // SETTING DEFAULTS CONFIGURATION
    if (typeof conf.circle.strokeWidth === 'undefined') {
      this.config.circle.strokeWidth = Defaults.STROKE_WIDTH
    }

    if (typeof conf.circle.color === 'undefined') {
      this.config.circle.color = Defaults.STROKE_COLOR
    }

    if (typeof conf.circle.linecap === 'undefined') {
      this.config.circle.linecap = Defaults.LINE_CAP
    }

    if (typeof conf.middleText.fontSize === 'undefined') {
      this.config.middleText.fontSize = Defaults.FONTS.font_size
    }

    if (typeof conf.middleText.fontWeight === 'undefined') {
      this.config.middleText.fontWeight = Defaults.FONTS.font_weight
    }
    if (typeof conf.fillRest === 'object') {
      this.config.fillRest = { ...this.config.circle, ...this.config.fillRest }
      typeof this.config.circle.maxValue === 'undefined' ? this.config.fillRest.value = 100 : this.config.fillRest.value = this.config.circle.maxValue
    }
    this.el = conf.el
    const size = this.el.getBoundingClientRect()
    this.config.dims = {}
    this.config.dims.width = size.width
    this.config.dims.height = size.height
  }

  draw () {
    this.config.middleText.width = this.config.circle.width
    this.config.middleText.height = this.config.circle.height
    const svgGroup = createCircle({ ...this.config.circle, ...this.config.dims })
    const text = createText({ ...this.config.middleText, ...this.config.dims }, this.config.circle.value)
    if (typeof this.config.fillRest !== 'undefined') {
      const fillRestPath = createCircle({ ...this.config.fillRest, ...this.config.dims })
      console.log(fillRestPath)
      this.el.appendChild(fillRestPath)
    }
    this.el.appendChild(svgGroup)
    this.el.appendChild(text)
  }
}
