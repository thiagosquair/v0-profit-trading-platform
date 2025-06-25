"use client"

import type React from "react"
import { useState } from "react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const AICoachInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Welcome! I'm your AI Trading Psychology Coach. I'm here to help you develop mental resilience, overcome emotional barriers, and optimize your trading performance. What would you like to work on today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  )
}

export default AICoachInterface
