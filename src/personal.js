import React from "react"

const tech = [
  { title: "Apollo Graphql", href: "https://www.apollographql.com/" },
  { title: "Testing library", href: "https://testing-library.com/" },
  { title: "Express", href: "https://expressjs.com/" },
  { title: "Emotion", href: "https://emotion.sh/docs/introduction" },
]
export default function Personal({
  callback,
  handleTextClick,
  hasClicked,
  setTextvalue,
}) {
  function handleCallback() {
    if (typeof callback === "function") {
      callback()
    }
  }
  return (
    <main>
      {hasClicked ? (
        <>
          <textarea
            onChange={(event) => {
              setTextvalue(event.target.value)
            }}
            defaultValue="write your dumb content here…"
          ></textarea>
          <button onClick={handleTextClick}>Approved</button>
        </>
      ) : (
        <div onClick={handleCallback}>
          <p>
            johannes Klint is a software developer that is happy as long as he
            gets to write code, preferably javascript
          </p>
          <p>
            he is currently working at etraveli group, where he builds a large{" "}
            <a href="https://reactjs.org/">react</a> application with all the
            sweet tech such as
          </p>
          <ul>
            {tech.map(({ title, href }) => (
              <li key={title}>
                <a href={href}>{title}</a>
              </li>
            ))}
          </ul>
          <p>he also writes some Java</p>
          <p>
            find out more at{" "}
            <a href="https://github.com/Johannesklint">github</a>
          </p>
        </div>
      )}
      <style>{`
          main {
            border: 1px solid red;
            display: flex;
            flex-direction: column;
            padding: 2.5rem;
            width: 50%;
            font-size: 1.125rem;
          }
          `}</style>
    </main>
  )
}
