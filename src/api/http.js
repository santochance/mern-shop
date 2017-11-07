// 封装了响应处理逻辑的fetch()
function request (url, options) {
  return fetch(url, options)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Network response was not ok.')
    })
    .catch(err => {
      console.error('There has been a problem with your fetch operation:' + error.message)
    })
}

// 把query对象转换为查询字符串
function handleQueryString (query) {
  let querySegs = []
  if (Array.isArray(query)) {
    querySegs = query
  } else if ({}.toString.call(query).slice(8, -1) === 'Object') {
    querySegs = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
  } else {
    querySegs = Array.from(arguments).slice(1)
  }
  return querySegs.join('&')
}

export default {
  fetch: request,
  get (url, query) {
    if (query) {
     let queryStr = handleQueryString(query)
     queryStr && (
       url += '?' + encodeURI(queryStr)
     )
    return request(url, {
      credentials: 'include'
    })
  },
  post (url, data) {
    return request(url, {
      method: 'POST',
      headers: 'application/json',
      body: typeof data === 'object' ? JSON.stringify(data) : data,
      credentials: 'include'
    })
  }
}
