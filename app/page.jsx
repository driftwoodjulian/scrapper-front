"use client"

import { useState } from "react"
import { LoginSidebar } from "@/components/login-sidebar"
import { ResponseDisplay } from "@/components/response-display"

export default function HomePage() {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLoginResponse = (loginResponse) => {
    setResponse(loginResponse)
    setError(null)
  }

  const handleError = (errorMessage) => {
    setError(errorMessage)
    setResponse(null)
  }

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading)
  }

  return (
    <div className="flex h-screen bg-background">
      <LoginSidebar onLoginResponse={handleLoginResponse} onError={handleError} onLoadingChange={handleLoadingChange} />
      <ResponseDisplay response={response} error={error} loading={loading} />
    </div>
  )
}
