import React, { useEffect, useState } from "react"
import Head from "next/head"
import * as firebase from "firebase/app"
import "firebase/database"
import Image from "../src/image"
import Personal from "../src/personal"

export default function Home() {
  const [hasClickedTextArea, setHasClickedTextArea] = useState(false)
  const [textValue, setTextvalue] = useState("")

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCU4unREz8ehbJ6CK3nKmblvsF-0I80P7E",
        authDomain: "personal-site-9d608.firebaseapp.com",
        databaseURL: "https://personal-site-9d608.firebaseio.com",
        projectId: "personal-site-9d608",
        storageBucket: "personal-site-9d608.appspot.com",
        messagingSenderId: "1066398538821",
        appId: "1:1066398538821:web:8ed46ab7963796c7e4172c",
        measurementId: "G-CMHTWMVD6G",
      })
    }
  }, [])

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
    reader.onloadend = function () {
      firebase.database().ref("content/").update({
        image: reader.result,
      })
    }
  }

  return (
    <div className="wrapper">
      <Head>
        <title>Johannes Klint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Personal
        callback={handleTextClick}
        hasClicked={hasClickedTextArea}
        handleTextClick={writeText}
        setTextvalue={setTextvalue}
      />
      <Image />
      <input type="file" accept="image/*" onChange={uploadImage} />
      <Global />
    </div>
  )
}

function Global() {
  return (
    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
      .wrapper {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
    `}</style>
  )
}
