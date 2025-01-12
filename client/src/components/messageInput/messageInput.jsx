import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip } from 'lucide-react'
import PropTypes from 'prop-types'

export default function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() || file) {
      onSendMessage(message, file)
      setMessage('')
      setFile(null)
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
      >
        <Paperclip className="h-4 w-4" />
      </Button>
      <Button type="submit">Send</Button>
      {file && (
        <p className="ml-2 text-sm text-gray-500">
          File: {file.name}
        </p>
      )}
    </form>
  )
}

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
}