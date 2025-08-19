"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Mail } from "lucide-react"
import { useState } from "react"

export function ResponseDisplay({ response, error, loading }) {
  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)

  const handleSendEmail = async () => {
    if (!email.trim()) return

    setSending(true)
    try {
      // You can implement the actual email sending logic here
      console.log("Sending to email:", email)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert(`Results sent to ${email}`)
      setEmail("")
    } catch (error) {
      alert("Failed to send email")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Backend Response</h2>
          <p className="text-muted-foreground mt-1">Results from your Mi Argentina login attempt will appear here</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>Error: {error}</AlertDescription>
          </Alert>
        )}

        {response && (
          <div className="space-y-6">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{response.message}</AlertDescription>
            </Alert>

            {response.screenshots && response.screenshots.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Screenshots</CardTitle>
                  <CardDescription>{response.screenshots.length} screenshot(s) captured during login</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {response.screenshots.map((screenshot, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Screenshot {index + 1}</span>
                              {screenshot.success ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <div>
                                <strong>File:</strong> {screenshot.filename}
                              </div>
                              <div>
                                <strong>Path:</strong> {screenshot.path}
                              </div>
                              <div>
                                <strong>Status:</strong>{" "}
                                <span className={screenshot.success ? "text-green-600" : "text-red-600"}>
                                  {screenshot.success ? "Success" : "Failed"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Send Results
                </CardTitle>
                <CardDescription>Send the login results to an email address</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Label htmlFor="email" className="sr-only">
                      Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendEmail()}
                    />
                  </div>
                  <Button onClick={handleSendEmail} disabled={!email.trim() || sending}>
                    {sending ? "Sending..." : "Send"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!response && !error && !loading && (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center text-muted-foreground">
                <p>No data yet. Submit the login form to see results here.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
