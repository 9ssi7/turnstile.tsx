import Script from 'next/script'
import React from 'react'

/**
 * This component is used to load the Turnstile API script in a Next.js app.
 */
export default function TurnstileContext() {
  return <Script src='https://challenges.cloudflare.com/turnstile/v0/api.js' async defer></Script>
}
