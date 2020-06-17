import React from "react"

function EditField({ text, setTextvalue, handleTextClick }) {
  return (
    <>
      <textarea
        width="500px"
        onChange={(event) => {
          setTextvalue(event.target.value)
        }}
        defaultValue={text}
      ></textarea>
      <button className="btn" onClick={handleTextClick}>
        Approved
      </button>
    </>
  )
}

export default function Personal({
  callback,
  handleTextClick,
  hasClicked,
  setTextvalue,
  text,
}) {
  function handleCallback() {
    if (typeof callback === "function") {
      callback()
    }
  }

  return (
    <main>
      {hasClicked ? (
        <EditField
          text={text}
          setTextvalue={setTextvalue}
          handleTextClick={handleTextClick}
        />
      ) : (
        <div onClick={handleCallback}>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      )}
      <style>{`
          main {
            display: flex;
            flex-direction: column;
            padding: 2.5rem;
            width: 50%;
            font-size: 1.125rem;
          }
          textarea {
            width: 350px;
            height: 300px;
          }
          .btn {
            box-shadow: 9px 3px 12px -4px #abbda6;
            background-color:#51758c;
            border-radius:4px;
            display: flex;
            justify-content: center;
            cursor:pointer;
            color:#ffffff;
            font-family:Arial;
            font-size:17px;
            padding: 14px 24px;
            text-decoration:none;
          }
          .btn:hover {
            background-color:#b3bdae;
          }
          .btn:active {
            position:relative;
            top:1px;
          }
          `}</style>
    </main>
  )
}
