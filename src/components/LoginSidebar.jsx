"use client"

import { useEffect, useState } from "react"

function LoginSidebar({ onLogin, loading, error }) {
  const [cuil, setCuil] = useState("")
  const [password, setPassword] = useState("")
  const [progressEvents, setProgressEvents] = useState([])

  useEffect(() => {
    if (!loading) {
      setProgressEvents([])
      return
    }

    const events = [
      { text: "⏳ Logueándome a MiArgentina, aguarde y no recargue la página", at: 0 },
      { text: "✔️ Logueado a MiArgentina", at: 30000 },

      { text: "⏳ Recopilando información de MiArgentina", at: 30000 },
      { text: "✔️ Información general disponible recopilada", at: 40000 },

      { text: "⏳ Recopilando información específica de REPROCAN", at: 40000 },
      { text: "✔️ Información específica disponible recopilada", at: 60000 },

      { text: "⏳ La información general disponible está siendo procesada, por favor aguarde y no recargue la página", at: 60000 },
      { text: "✔️ Información general procesada", at: 90000 },

      { text: "⏳ Empaquetando información, aguarde y no recargue la ventana", at: 90000 },
      { text: "✔️ Información de MiArgentina procesada exitosamente 🎆", at: 120000 },

      { text: "⏳ Logueándome a la página del REPROCAN, no recargue la página", at: 125000 },
      { text: "✔️ Se recolectó con éxito información general del usuario disponible", at: 140000 },

      { text: "⏳ Procesando información general del REPROCAN", at: 150000 },
      { text: "✔️ Revisando información relacionada a los trámites de REPROCAN, esto podría demorar, por favor no recargue la página", at: 180000 },
    ]

    const timers = []
    setProgressEvents([])

    events.forEach((evt) => {
      const id = setTimeout(() => {
        setProgressEvents((prev) => [...prev, evt.text])
      }, evt.at)
      timers.push(id)
    })

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [loading])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cuil && password) {
      onLogin(cuil, password)
    }
  }

  return (
    <div className="sidebar">
      <h2 className="card-title">Login de MiArgentina </h2>

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
            placeholder="Ingrese CUIL"
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
            placeholder="Ingrese su clave"
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
          {loading ? "Recopilando informacion..." : "Login"}
        </button>
        <p className="card-title">Importante: una vez sometidas las credentciales debera aguardar unos minutos, no recarge la pagina</p>
      </form>

      {loading && progressEvents.length > 0 && (
        <div className="card" style={{ marginTop: "12px" }}>
          <h3 className="card-title">Progreso</h3>
          <ul style={{ margin: 0, paddingLeft: "18px", lineHeight: 1.6 }}>
            {progressEvents.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {error && <div className="error-message">Error: {error}</div>}
    </div>
  )
}

export default LoginSidebar
