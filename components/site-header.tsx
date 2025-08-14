"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ContactDialog } from "@/components/contact-dialog"

function useAuth() {
  const [authed, setAuthed] = useState(false)
  useEffect(() => {
    setAuthed(Boolean(localStorage.getItem("gm_auth")))
  }, [])
  const logout = () => {
    localStorage.removeItem("gm_auth")
    setAuthed(false)
    window.location.href = "/"
  }
  return { authed, logout }
}

export function SiteHeader() {
  const { authed, logout } = useAuth()

  const navItems = [
    { href: "/#features", label: "Features" },
    { href: "/#partners", label: "Partners" },
    { href: "/#why", label: "Why us" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-mark.png"
            alt="Grade Melon logo"
            width={28}
            height={28}
            className="rounded-md"
            priority
          />
          <span className="text-white font-semibold">Grade Melon Ads</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-200 hover:text-white">
              {item.label}
            </Link>
          ))}
          <ContactDialog triggerLabel="Contact" triggerClassName="ml-2" />
          {authed ? (
            <>
              <Link href="/dashboard">
                <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={logout}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-900 text-white border-l border-white/10">
              <div className="mt-8 grid gap-4">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-lg">
                    {item.label}
                  </Link>
                ))}
                <ContactDialog triggerLabel="Contact" />
                {authed ? (
                  <>
                    <Link href="/dashboard" className="text-lg">
                      Dashboard
                    </Link>
                    <Button onClick={logout} className="mt-2">
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/login" className="text-lg">
                    <Button className="mt-2 w-full">Login</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
