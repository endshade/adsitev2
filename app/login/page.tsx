"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600)) // simulate network
    if (email.includes("@") && password.length >= 6) {
      localStorage.setItem("gm_auth", JSON.stringify({ email, ts: Date.now() }))
      router.push("/dashboard")
    } else {
      setError("Invalid email or password (min 6 chars).")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-[#111727] text-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-1 text-white">Welcome back</h1>
          <p className="text-sm text-slate-300 mb-6">Sign in to manage your campaigns.</p>
          <form className="grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="mt-6 text-sm text-slate-300">
            Tip: Use any email and a password of 6+ characters for this demo.
          </div>
          <div className="mt-4">
            <Link href="/" className="text-sm underline text-white">
              Back to site
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
