
import { useState } from "react"
import { Button } from "@/components/ui/button"
import IssueSubmissionChat from "./issueSubmitionChat"
import { MessageCircle } from "lucide-react"

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className="absolute bottom-0 right-0 mb-28">
          <IssueSubmissionChat onClose={() => setIsOpen(false)} />
        </div>
      ) : null}
      <Button className="rounded-full w-16 h-16 shadow-lg" onClick={() => setIsOpen(!isOpen)}>
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open chat</span>
      </Button>
    </div>
  )
}
