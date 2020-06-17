import React from "react"
import Admin from "../admin"
import { screen, render } from "@testing-library/react"
import {
  toBeInTheDocument,
  toHaveAttribute,
  toHaveValue,
} from "@testing-library/jest-dom/matchers"
import userEvent from "@testing-library/user-event"

expect.extend({
  toBeInTheDocument,
  toHaveAttribute,
  toHaveValue,
})

test("admin functionality", () => {
  render(<Admin text="text" image="image" />)

  expect(screen.getByText("text")).toBeInTheDocument()
  expect(screen.getByAltText("personal-image")).toHaveAttribute("src", "image")

  expect(screen.queryByTestId("textarea")).not.toBeInTheDocument()

  // click an write to textarea
  userEvent.click(screen.getByTestId("personal-text"))
  const textArea = screen.getByRole("textbox")
  expect(textArea).toHaveValue("text")
  userEvent.type(textArea, "{selectall}{del}Hello,{enter}World!")
  expect(textArea).toHaveValue("Hello,\nWorld!")

  // change image
  const file = new File(["hello"], "hello.png", { type: "image/png" })
  const input = screen.getByLabelText(/upload image/i)
  userEvent.upload(input, file)
  expect(input.files[0]).toStrictEqual(file)
  expect(input.files.item(0)).toStrictEqual(file)
  expect(input.files).toHaveLength(1)
})
