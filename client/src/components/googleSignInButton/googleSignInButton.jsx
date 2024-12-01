import React from 'react'
import { Button } from "@/components/ui/button"

const GoogleSignInButton = () => {
  return (
    <form action={()=>{}}>
    <Button type="submit" variant="outline" className="w-full">
      Sign in with Google
    </Button>
  </form>
  )
}

export default GoogleSignInButton
