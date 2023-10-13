const path = require('path')

module.exports = function override(config, env) {
  // Add your custom aliases here
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
  }

  return config
}
