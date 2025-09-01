"use client"

import { useState } from "react"

function LoginSidebar({ onLogin, loading, error }) {
  const [cuil, setCuil] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cuil && password) {
      onLogin(cuil, password)
    }
  }

  return (
    <div className="sidebar">
      <h2 className="card-title">Login to MiArgentina </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cuil" className="form-label">
            CUIL
          </label>
          <input
            type="text"
            id="cuil"
            className="form-input"
            value={cuil}
            onChange={(e) => setCuil(e.target.value)}
            placeholder="Enter CUIL"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !cuil || !password}
          style={{ width: "100%" }}
        >
          {loading && <span className="loading"></span>}
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <div className="error-message">Error: {error}</div>}
    </div>
  )
}

export default LoginSidebar
