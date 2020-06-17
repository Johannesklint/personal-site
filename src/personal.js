import React from "react"
import styled from "styled-components"

const Main = styled.main`
  font-size: 1.125rem;
  padding: 24px;
  width: 100%;

  @media (min-width: 964px) {
    width: 40%;
  }
`
const TextArea = styled.textarea`
  width: 350px;
  height: 300px;
`
const Button = styled.button`
  box-shadow: 9px 3px 12px -4px #abbda6;
  background-color: #51758c;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 14px 24px;
  text-decoration: none;

  ::hover {
    background-color: #b3bdae;
  }
  ::active {
    position: relative;
    top: 1px;
  }
`

function EditField({ text, setTextvalue, submitText }) {
  return (
    <>
      <TextArea
        onChange={(event) => {
          setTextvalue(event.target.value)
        }}
        defaultValue={text}
      ></TextArea>
      <Button onClick={submitText}>Approved</Button>
    </>
  )
}

export default function Personal({
  handleTextClick,
  submitText,
  hasClicked,
  setTextvalue,
  text,
}) {
  function handleCallback() {
    if (typeof handleTextClick === "function") {
      handleTextClick()
    }
  }

  return (
    <Main>
      {hasClicked ? (
        <EditField
          text={text}
          setTextvalue={setTextvalue}
          submitText={submitText}
        />
      ) : (
        <div
          data-testid="personal-text"
          onClick={handleCallback}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </Main>
  )
}
