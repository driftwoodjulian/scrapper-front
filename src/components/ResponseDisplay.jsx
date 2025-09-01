"use client"

import { useState } from "react"

function ResponseDisplay({ response }) {
  const [email, setEmail] = useState("")
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailError, setEmailError] = useState(null)
  const [emailSuccess, setEmailSuccess] = useState(false)
  const [showImages, setShowImages] = useState(false)
  const [showPdfs, setShowPdfs] = useState(false)

  const handleSendEmail = async (e) => {
    e.preventDefault()
    if (!email) return

    setEmailLoading(true)
    setEmailError(null)
    setEmailSuccess(false)

    try {
      // Simulate email sending - replace with your actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setEmailSuccess(true)
      setEmail("")
    } catch (err) {
      setEmailError("Failed to send email")
    } finally {
      setEmailLoading(false)
    }
  }

  const handleDisplayImages = () => {
    setShowImages(!showImages)
  }

  const handleDisplayPdfs = () => {
    setShowPdfs(!showPdfs)
  }

  if (!response) {
    return (
      <div className="main-content">
        <div className="card">
          <h2 className="card-title">Bienvenido</h2>
          <p>Por favor, para usar la aplicacion ingrese sus credenciales de MiArgentina al costador y aguarde mientras recolectamos informacion de distintas urls claves en relacion al reprocan. </p>
        </div>
      </div>
    )
  }

  return (
    <div className="main-content">
      <div className="card">
        <h2 className="card-title"> Information from MiArgentina</h2>
        <p>
          <strong>Message:</strong> {response.message}
        </p>

        {response.pdfs && response.pdfs.length > 0 && (
          <>
            <h3 style={{ marginTop: "24px", marginBottom: "12px", fontSize: "16px", fontWeight: "600" }}>
              PDFs ({response.pdfs.length})
            </h3>
            <div className="screenshot-grid">
              {response.pdfs.map((pdf, index) => (
                <div key={index} className="screenshot-item">
                  <div className="screenshot-filename">{pdf.filename}</div>
                  <div className="screenshot-path">{pdf.path}</div>
                  <span className={`status-badge ${pdf.success ? "status-success" : "status-error"}`}>
                    {pdf.success ? "Success" : "Failed"}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {response.screenshots && response.screenshots.length > 0 && (
          <>
            <h3 style={{ marginTop: "24px", marginBottom: "12px", fontSize: "16px", fontWeight: "600" }}>
              Screenshots ({response.screenshots.length})
            </h3>
            <div className="screenshot-grid">
              {response.screenshots.map((screenshot, index) => (
                <div key={index} className="screenshot-item">
                  <div className="screenshot-filename">{screenshot.filename}</div>
                  <div className="screenshot-path">{screenshot.path}</div>
                  <span className={`status-badge ${screenshot.success ? "status-success" : "status-error"}`}>
                    {screenshot.success ? "Success" : "Failed"}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="card">
        <h3 className="card-title">Send via Email</h3>
        <form onSubmit={handleSendEmail}>
          <div className="email-section">
            <div className="email-input-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                disabled={emailLoading}
              />
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button type="submit" className="btn btn-secondary" disabled={emailLoading || !email}>
                {emailLoading && <span className="loading"></span>}
                {emailLoading ? "Sending..." : "Send"}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDisplayImages}
                disabled={!response.screenshots || response.screenshots.length === 0}
              >
                {showImages ? "Hide Images" : "Display Images"}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDisplayPdfs}
                disabled={!response.pdfs || response.pdfs.length === 0}
              >
                {showPdfs ? "Hide PDFs" : "Display PDFs"}
              </button>
            </div>
          </div>
        </form>

        {emailError && (
          <div className="error-message" style={{ marginTop: "12px" }}>
            {emailError}
          </div>
        )}

        {emailSuccess && (
          <div
            style={{
              color: "#166534",
              backgroundColor: "#dcfce7",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #bbf7d0",
              marginTop: "12px",
            }}
          >
            Email sent successfully!
          </div>
        )}
      </div>

      {showPdfs && response.pdfs && response.pdfs.length > 0 && (
        <div className="card">
          <h3 className="card-title">PDFs</h3>
          <div style={{ display: "grid", gap: "16px" }}>
            {response.pdfs.map((pdf, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <h4 style={{ fontSize: "14px", marginBottom: "8px", color: "#666" }}>{pdf.filename}</h4>
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ marginBottom: "12px", color: "#666" }}>
                    📄 PDF Document
                  </div>
                  <a
                    href={`http://200.80.42.97:3000/${pdf.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ textDecoration: "none", display: "inline-block" }}
                  >
                    View PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showImages && response.screenshots && response.screenshots.length > 0 && (
        <div className="card">
          <h3 className="card-title">Screenshots</h3>
          <div style={{ display: "grid", gap: "16px" }}>
            {response.screenshots.map((screenshot, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <h4 style={{ fontSize: "14px", marginBottom: "8px", color: "#666" }}>{screenshot.filename}</h4>
                <img
                  src={`http://200.80.42.97:3000/${screenshot.path}`}
                  alt={screenshot.filename}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none"
                    e.target.nextSibling.style.display = "block"
                  }}
                />
                <div
                  style={{
                    display: "none",
                    color: "#dc2626",
                    padding: "20px",
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "8px",
                  }}
                >
                  Failed to load image: {screenshot.path}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResponseDisplay
