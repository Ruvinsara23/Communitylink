import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip } from 'lucide-react'

export default function MessageInput(handleSendMessage) {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (message.trim() || file) {
      setLoading(true)
      try {
        await handleSendMessage(message, file)
        setMessage('')
        setFile(null)
      } catch (error) {
        console.error("Error sending message:", error)
      } finally {
        setLoading(false)
      }
    } else {
      console.log("Cannot send empty message and no file.")
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 flex items-center">
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 mr-2"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="mr-2"
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
      >
        <Paperclip className="h-4 w-4" />
      </Button>
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </Button>
      {file && (
        <p className="ml-2 text-sm text-gray-500">
          File: {file.name}
        </p>
      )}
    </form>
  )
}
