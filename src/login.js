import React from "react"

export default function Login({ handleLogin }) {
  return (
    <form>
      <label htmlFor="password">
        Password
        <input id="password" onChange={handleLogin} type="password" />
      </label>
    </form>
  )
}
