'use strict'
const jwt = require('jsonwebtoken')

module.exports = {
  testToken: (tk, key) => {
    return new Promise((resolve, reject) => {
      const f = false
      if (tk === '') {
        reject(f)
      }
      jwt.verify(tk, key, (err, decoded) => {
        if (err) {
          reject(f)
        } else {
          resolve(decoded.msg.userName)
        }
      })
    })
  },
}
