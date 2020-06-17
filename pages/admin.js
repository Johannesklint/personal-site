import React, { useState } from "react"
import firebase from "../src/utils/firebaseConfig"
import Home from "."

export default function Admin({ text, image }) {
  const [hasClickedTextArea, setHasClickedTextArea] = useState(false)
  const [textValue, setTextvalue] = useState("")

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
