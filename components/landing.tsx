"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import { toast } from "sonner"
import Player from "react-lottie-player"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getUserField, storeEmail } from "@/lib/actions/db"
import { isValidEmail } from "@/lib/utils"
import { useLocalStorage } from "@/lib/hooks/use-local-storage"
import { useIsClient } from "@/lib/hooks/use-is-client"

type LandingProps = {
  userId?: string
  disableAnimations?: boolean
}

export function Landing({ userId, disableAnimations }: LandingProps) {
  const [validationError, setValidationError] = useState<string | null>(null)
  const [email, setEmail] = useState<string>("")
  const [localIsSubscribed, setLocalIsSubscribed] = useLocalStorage("email_subscribed", false)
  const isClient = useIsClient()

  useEffect(() => {
    const fetchIsEmailSubscribed = async () => {
      const backendIsSubscribed = await getUserField("email_subscribed")
      if (backendIsSubscribed === true) {
        setLocalIsSubscribed(true)
      }
    }

    if (localIsSubscribed !== true && userId && isClient) {
      fetchIsEmailSubscribed()
    }
  }, [localIsSubscribed, setLocalIsSubscribed, userId, isClient])

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setValidationError("Please enter a valid email")
      return
    }
    setValidationError(null)
    await storeEmail(email)
    setLocalIsSubscribed(true)
    setEmail("")
    toast.success("Thanks for subscribing!")
  }

  return (
    <>
     <div className="mx-auto mb-8 max-w-2xl bg-background rounded-2xl border-gray-600/25 p-4 text-center dark:border-gray-600/50 md:mb-12 md:border">
  <div className="relative my-8 flex h-96 w-full items-center justify-center bg-black"> {/* Adjusted height to h-96 */}
    <Image
      src="/image.png"
      alt="Logo"
      layout="fill"
      objectFit="contain"
    />
  </div>
  <p className="text-lg font-bold tracking-tight lg:text-2xl lg:font-normal">Generate smart contracts with AI</p>

  <div className="grid-row-3 my-5 mb-8 grid grid-flow-row gap-1 md:grid-flow-col md:gap-4">
          {/* Add your content here */}
          {/* Add your content here */}
        </div>
      </div>

      <hr className="mb-4 md:hidden" />

      {isClient && localIsSubscribed === false ? (
        <div className="mx-auto mb-16 max-w-2xl rounded-2xl border-gray-600/25 px-4 text-center dark:border-gray-600/50 md:border">
          {/* Add your content here */}
        </div>
      ) : null}
    </>
  )
}
