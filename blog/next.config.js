const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
module.exports = withCss(withLess({
  // webpack: (config, {}) => {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ['@svgr/webpack']
  //   })
  //   return config
  // }
}))