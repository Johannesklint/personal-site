import React, { useState, useEffect } from "react"
import firebase from "../src/utils/firebaseConfig"
import Home from "."
import Login from "../src/login"
import Loading from "../src/loading"

function useAuthentication() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
        setIsLoading(false)
      }
    })
  }, [])

  function handleLogin({ email, password }) {
    return (event) => {
      event.preventDefault()
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(() => {
          setHasError("Either email or password is wrong…")
          setIsLoggedIn(false)
        })
    }
  }

  return [isLoggedIn, handleLogin, { error: hasError, loading: isLoading }]
}

export default function Admin({ text, image }) {
  const [hasClickedTextArea, setHasClickedTextArea] = useState(false)
  const [textValue, setTextvalue] = useState("")
  const [isLoggedIn, handleLogin, { loading, error }] = useAuthentication()

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

  // let isAuth = false
  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     isAuth = true
  //   }
  // })

  return {
    props: {
      text: text.replace(/['"]+/g, ""),
      image,
      // isAuth,
    },
  }
}
