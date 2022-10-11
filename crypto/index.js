const crypto = require('node:crypto')

const encryptWithCipher = (msg) =>{
  const cipher = crypto.createCipher('aes192','key')
  var encrypted = cipher.update(msg,"utf8",'hex')
  encrypted += cipher.final('hex')
  console.log("Encrypt:",encrypted);
  return encrypted
}

const encryptMsg = encryptWithCipher("Hello World")

const decryptWithDecipher = (msg, key) =>{
  const cipher = crypto.createDecipher('aes192',key)
  var decrypted = cipher.update(msg,"hex",'utf8')
  decrypted += cipher.final('utf8')
  console.log("Decrypt:",decrypted);
  return decrypted
}

decryptWithDecipher(encryptMsg, 'key')