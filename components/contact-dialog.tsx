"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send } from "lucide-react"

const CONTACT_EMAIL = "ads@example.com"

export function ContactDialog({
  triggerClassName = "",
  triggerLabel = "Contact Now",
}: {
  triggerClassName?: string
  triggerLabel?: string
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error("Failed")
      setOpen(false)
      setName("")
      setEmail("")
      setMessage("")
      // Optional: open a mailto prefilled as a fallback and to let user keep a copy
      const subject = encodeURIComponent("Advertiser inquiry")
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    } catch (err) {
      // Even if API fails, still open mailto to ensure contact is easy
      const subject = encodeURIComponent("Advertiser inquiry")
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={`bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white ${triggerClassName}`}
        >
          {triggerLabel}
          <Mail className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact us</DialogTitle>
          <DialogDescription>Tell us a bit about your business and goals.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Textarea
            placeholder="What would you like to achieve with Grade Melon ads?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
          />
          <div className="flex items-center justify-between">
            <a className="text-sm text-muted-foreground hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
              Prefer email? {CONTACT_EMAIL}
            </a>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send message"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
