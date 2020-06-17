import React from "react"

export default function Login({ handleLogin }) {
  function onLogin(event) {
    sessionStorage.setItem("isAuth", true)
    const { value } = event.target
    handleLogin(value)
  }
  return (
    <form>
      <input onChange={onLogin} type="password" />
      <input type="submit" />
    </form>
  )
}
