import React, { useEffect } from "react"
import Head from "next/head"
import * as firebase from "firebase/app"
import "firebase/database"
import Image from "../src/image"
import Personal from "../src/personal"

export default function Home() {
  return (
    <div className="wrapper">
      <Head>
        <title>Johannes Klint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Personal />
      <Image />
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
