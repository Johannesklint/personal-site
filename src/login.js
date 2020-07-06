import React, { useState } from "react"

export default function Login({ handleLogin, error }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div>
      <form onSubmit={handleLogin({ email, password })}>
        <label htmlFor="email">
          Email
          <input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
        </label>
        <button type="submit">Ok</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}
