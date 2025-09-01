"use client"

import { useState } from "react"
import LoginSidebar from "./components/LoginSidebar"
import ResponseDisplay from "./components/ResponseDisplay"

function App() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (cuil, password) => {
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const res = await fetch("http://200.80.42.97:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cuil, password }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setResponse(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <LoginSidebar onLogin={handleLogin} loading={loading} error={error} />
      <ResponseDisplay response={response} />
    </div>
  )
}

export default App
