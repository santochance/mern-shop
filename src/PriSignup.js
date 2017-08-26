import React from 'react'

const priSignup = () => {
  return (
    <form action="/api/signup" method="POST">
      <input type="text" name="username" value={'test' + Date.now()}/>
      <input type="password" name="password" value="password"/>
      <button type="submit">Submit</button>
    </form>
  )
}

export default priSignup
