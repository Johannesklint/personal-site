import React from "react"
import Personal from "../personal"
import { screen, render } from "@testing-library/react"
import {
  toBeInTheDocument,
  toHaveValue,
} from "@testing-library/jest-dom/matchers"
import userEvent from "@testing-library/user-event"

expect.extend({ toBeInTheDocument, toHaveValue })

test("hasClicked is true it renders EditField", () => {
  const setTextvalue = jest.fn()
  const submitText = jest.fn()
  render(
    <Personal
      hasClicked
      text="text"
      setTextvalue={setTextvalue}
      submitText={submitText}
    />
  )
  const textArea = screen.getByRole("textbox")
  expect(textArea).toHaveValue("text")
  // remove defaultText from textarea and enter new text
  userEvent.type(textArea, "{selectall}{del}Hello,{enter}World!")

  const str = "Hello,\nWorld!"
  expect(textArea).toHaveValue(str)
  expect(setTextvalue).toBeCalledTimes(str.length + 1)

  userEvent.click(screen.getByRole("button"))
  expect(submitText).toHaveBeenCalled()
})

test("hasClicked is false renders field for text", () => {
  const handleTextClick = jest.fn()
  render(
    <Personal
      handleTextClick={handleTextClick}
      hasClicked={false}
      text="text"
    />
  )
  const field = screen.getByTestId("personal-text")

  expect(field).toBeInTheDocument()
  userEvent.click(field)
  expect(handleTextClick).toHaveBeenCalled()
})
