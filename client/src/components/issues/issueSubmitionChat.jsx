import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, User } from "lucide-react"

export default function IssueSubmissionChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm here to help you submit an issue. What seems to be the problem?", sender: "assistant" },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { id: prev.length + 1, text: input, sender: "user" }])
      setInput("")

      // Simulate assistant response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "Thank you for providing that information. Is there anything else you'd like to add to your issue report?",
            sender: "assistant",
          },
        ])
      }, 1000)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto h-[600px] border rounded-lg shadow-lg flex flex-col">
      <div className="bg-primary p-4 text-primary-foreground rounded-t-lg">
        <h2 className="text-xl font-semibold">Issue Submission Assistant</h2>
      </div>

      <ScrollArea className="flex-grow p-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
            <div className={`flex ${message.sender === "user" ? "flex-row-reverse" : "flex-row"} items-end`}>
              <Avatar className="w-8 h-8">
                <AvatarImage src={message.sender === "assistant" ? "/placeholder.svg?height=32&width=32" : undefined} />
                <AvatarFallback>{message.sender === "assistant" ? "A" : <User className="w-4 h-4" />}</AvatarFallback>
              </Avatar>
              <div
                className={`mx-2 py-2 px-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {message.text}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex space-x-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}