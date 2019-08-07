/**
 * @function exist function to verify existance of a key in configuration object
 * @param {Array} keys element to be checked in config object
 * @param {Object} config containe configuration
 */
export function exist (keys, config) {
  keys.forEach(element => {
    if (typeof config[element] === 'undefined') {
      throw new Error(`Configuration Error ${element} attribute undefined`)
    }
  })
}
