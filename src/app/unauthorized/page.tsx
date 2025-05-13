"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { usePathname } from "next/navigation"

export default function UnauthorizedPage() {
  const pathname = usePathname()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!shown) {
      toast("You are not logged in as an admin!", {
        description: "Please log in to add new shot glasses",
        action: {
          label: "Close",
          onClick: () => console.log("Closed"),
        },
      })
      setShown(true)
    }
  }, [pathname, shown])

  return <div>You are not authorized to access this page.</div>
}
