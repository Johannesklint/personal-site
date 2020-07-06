/* eslint-disable indent */
import { useEffect, useReducer } from "react"
import firebase from "../src/utils/firebaseConfig"

function reducer(state, action) {
  switch (action.type) {
    case "isAuth":
      return { ...state, isLoggedIn: true, isLoading: false }
    case "isNotAuth":
      return { ...state, isLoggedIn: false, isLoading: false }
    case "loginError":
      return {
        ...state,
        isLoggedIn: false,
        hasError: "Either email or password is wrong…",
      }
    default:
      throw new Error()
  }
}

const initState = {
  isLoggedIn: false,
  hasError: false,
  isLoading: true,
}
export default function useAuthentication() {
  const [state, dispatch] = useReducer(reducer, initState)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "isAuth" })
      } else {
        dispatch({ type: "isNotAuth" })
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
          dispatch({ type: "loginError" })
        })
    }
  }

  return {
    isLoggedIn: state.isLoggedIn,
    handleLogin,
    error: state.hasError,
    loading: state.isLoading,
  }
}
