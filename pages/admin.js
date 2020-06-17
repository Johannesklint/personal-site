import React, { useState, useEffect } from "react"
import firebase from "../src/utils/firebaseConfig"
import Home from "."
import Login from "../src/login"

function useAuthentication() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("isAuth"))) {
      setIsLoggedIn(true)
    }
  }, [])

  function handleLogin(value) {
    if (value === process.env.NEXT_PUBLIC_ADMIN_AUTH) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }

  return [isLoggedIn, handleLogin]
}

export default function Admin({ text, image }) {
  const [hasClickedTextArea, setHasClickedTextArea] = useState(false)
  const [textValue, setTextvalue] = useState("")
  const [isLoggedIn, handleLogin] = useAuthentication()

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
  if (!isLoggedIn) {
    return <Login handleLogin={handleLogin} />
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
