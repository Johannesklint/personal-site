import React, { useState } from "react"
import styled from "styled-components"
import { GlobalStyles } from "../pages"

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 50vh;
  width: 100%;
`

const Button = styled.button`
  padding: 7px 40px;
  margin-top: 12px;
  border-radius: 2px;
  border: none;
  background: bisque;
  font-family: "Cascadia Code", Consolas, "Courier New", monospace;
`
const Input = styled.input`
  margin-left: 12px;
  width: 140px;
  padding: 3px;
`

export default function Login({ handleLogin, error }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div>
      <Form onSubmit={handleLogin({ email, password })}>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
        />
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
        <Button type="submit">Ok</Button>
      </Form>
      {error && <p>{error}</p>}
      <GlobalStyles />
    </div>
  )
}
