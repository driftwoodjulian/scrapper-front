"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function LoginSidebar({ onLoginResponse, onError, onLoadingChange }) {
  const [cuil, setCuil] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    onLoadingChange(true)
    onError("")

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
      onLoginResponse(data)
    } catch (err) {
      onError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
      onLoadingChange(false)
    }
  }

  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-sidebar-foreground">Mi Argentina Login</h1>
          <p className="text-sm text-sidebar-foreground/70 mt-1">Enter your credentials to access the system</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Login Form</CardTitle>
            <CardDescription>Provide your CUIL and password to authenticate</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cuil">CUIL</Label>
                <Input
                  id="cuil"
                  type="text"
                  value={cuil}
                  onChange={(e) => setCuil(e.target.value)}
                  placeholder="Enter your CUIL"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
