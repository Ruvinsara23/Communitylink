import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from "../ui/dialog"
  import { Button } from "../ui/button"
  import { CheckCircle } from "lucide-react"
  
  export default function SuccessDialog( {open, onClose, pollTitle} ) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              Poll Created Successfully
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>`Your poll ${pollTitle} has been created and is now ready for voting.`</DialogDescription>
          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }