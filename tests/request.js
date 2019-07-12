const http = require('http')

module.exports = function request(url) {
  return new Promise(resolve => {
    http.get({path: url, port: 5000}, response => {
      let data = ''
      response.on('data', _data => (data += _data))
      response.on('end', () => resolve(data))
    })
  })
}