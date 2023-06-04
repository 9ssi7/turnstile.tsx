import React from 'react'

/**
 * This component is used to load the Turnstile API script in a React app.
 */
export function TurnstileContext() {
  return <script src='https://challenges.cloudflare.com/turnstile/v0/api.js' async defer></script>
}
