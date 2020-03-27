const jwt = require('jsonwebtoken')

module.exports = {
  testToken: (tk,key) => {        
    return new Promise((resolve, reject) => {
      if (tk === '') {
        reject(false)
      }
      jwt.verify(tk,key, (err, decoded) => {
        if (err) {
          reject(false)
        }else {        
          resolve(decoded.msg.userName)
        }
      })
    })
        
  }
}
