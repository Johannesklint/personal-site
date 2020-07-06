import React, { useState } from "react"
import firebase from "../src/utils/firebaseConfig"
import Home from "."
import Login from "../src/login"
import Loading from "../src/loading"
import useAuthentication from "../src/useAuthentication"

export default function Admin({ text, image }) {
  const [hasClickedTextArea, setHasClickedTextArea] = useState(false)
  const [textValue, setTextvalue] = useState("")
  const { isLoggedIn, handleLogin, loading, error } = useAuthentication()

  function writeText() {
    firebase.database().ref("content/").update({
      text: textValue,
    })
  }

  function handleTextClick() {
    setHasClickedTextArea((prev) => !prev)
  }

  function uploadImage(event) {
    const { files } = event.target
    const reader = new FileReader()
    if (files[0]) {
      reader.readAsDataURL(files[0])
    }
    reader.onloadend = () => {
      firebase.database().ref("content/").update({
        image: reader.result,
      })
    }
  }

  if (loading) {
    return <Loading>Loading…</Loading>
  }

  if (!isLoggedIn) {
    return <Login handleLogin={handleLogin} error={error} />
  }

  return (
    <div className="wrapper">
      <Home
        text={text}
        image={image}
        handleTextClick={handleTextClick}
        hasClicked={hasClickedTextArea}
        submitText={writeText}
        setTextvalue={setTextvalue}
      >
        <label htmlFor="file-uploader">Upload image:</label>
        <input
          id="file-uploader"
          accept="image/*"
          onChange={uploadImage}
          type="file"
        />
      </Home>
    </div>
  )
}

export async function getStaticProps() {
  const { text, image } = await firebase
    .database()
    .ref("/content")
    .once("value")
    .then((res) => res.val())

  return {
    props: {
      text: text.replace(/['"]+/g, ""),
      image,
    },
  }
}
