"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem("gm_auth")
    if (!raw) {
      router.replace("/login")
      return
    }
    try {
      const data = JSON.parse(raw)
      setEmail(data.email ?? null)
    } catch {
      router.replace("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-[#111727] text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-300 mb-8">Signed in as {email ?? "—"}</p>
        <div className="grid gap-3">
          <Button className="bg-white/10 border border-white/10 hover:bg-white/20">Create campaign</Button>
          <Button className="bg-white/10 border border-white/10 hover:bg-white/20">View performance</Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 mt-4 bg-transparent"
            onClick={() => {
              localStorage.removeItem("gm_auth")
              window.location.href = "/"
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
