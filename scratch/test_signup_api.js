// 测试signup api

var xhr = new XMLHttpRequest()

var data = {
  'username': 'xhr' + Date.now(),
  'password': 'password'
}

xhr.open('POST', '/api/signup')
xhr.setRequestHeader("Content-Type", "application/json")
xhr.send(JSON.stringify(data))
xhr = null

setTimeout(() => {
  xhr = new XMLHttpRequest()
  xhr.open('GET', '/signout')
  xhr.send()
  xhr = null
}, 500)


// 测试signin api

var xhr = new XMLHttpRequest()

var data = {
  'username': 'santochance',
  'password': 'password'
}

xhr.open('POST', '/api/signin')
xhr.setRequestHeader("Content-Type", "application/json")
xhr.send(JSON.stringify(data))
