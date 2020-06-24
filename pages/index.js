import React from "react"
import Head from "next/head"
import styled from "styled-components"
import firebase from "../src/utils/firebaseConfig"
import Image from "../src/image"
import Personal from "../src/personal"
import Loading from "../src/loading"

const Wrapper = styled.div`
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-width: 964px) {
    flex-direction: row;
  }
`

function Headers({ children }) {
  return (
    <Wrapper>
      <Head>
        <title>Johannes Klint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </Wrapper>
  )
}

export default function Home({ children, text, image, ...props }) {
  const isLoading = !text && !image
  if (isLoading) {
    return (
      <Headers>
        <Loading>Loading…</Loading>
      </Headers>
    )
  }

  return (
    <Headers>
      <Personal {...props} text={text} />
      <Image image={image} />
      {children}
      <GlobalStyles />
    </Headers>
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

function GlobalStyles() {
  return (
    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: "Cascadia Code", Consolas, "Courier New", monospace;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  )
}
