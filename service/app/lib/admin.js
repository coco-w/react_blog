const jwt = require('jsonwebtoken')

module.exports = {
  testToken: (tk,key) => {    
    return new Promise((resolve, reject) => {
      jwt.verify(tk,key, (err, decoded) => {
        if (err) {
          resolve(false)
        }else {        
          resolve(decoded.msg.userName)
        }
      })
    })
        
  }
}
