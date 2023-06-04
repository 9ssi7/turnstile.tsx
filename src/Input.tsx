import React, { useEffect } from 'react'

type Props = {
  /**
   * The site key for your Turnstile challenge.
   * This is the key you get from the Turnstile dashboard.
   * @example
   * ```tsx
   * <TurnstileInput siteKey='...' />
   * ```
   * @see https://dash.cloudflare.com/turnstile
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  siteKey: string

  /**
   * The theme of the challenge.
   * @default 'auto'
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  theme?: 'light' | 'dark' | 'auto'

  /**
   * The locale of the challenge.
   * @default 'en'
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  locale?: string

  /**
   * The size of the challenge.
   * @default 'normal'
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  size?: 'compact' | 'normal'

  /**
   * The name of the field that will be used to store the token.
   * @default 'cf-turnstile-token'
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  fieldName?: string

  /**
   * The interval in milliseconds to retry the challenge.
   * @default 8000
   * @max 900000
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  retryInterval?: number

  /**
   * Whether to retry the challenge.
   * @default true
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  retry?: boolean

  /**
   * Whether to refresh the challenge when it expires.
   * @default 'auto'
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  refreshOnExpired?: 'auto' | 'never' | 'manual'

  /**
   * A callback that will be called when the challenge is verified.
   * @example
   * ```tsx
   * <TurnstileInput onVerify={(token) => console.log(token)} />
   * ```
   * @param token The token that was verified.
   * @returns void
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  onVerify?: (token: string) => void

  /**
   * A callback that will be called when the challenge fails.
   * @example
   * ```tsx
   * <TurnstileInput onError={(name) => console.log(name)} />
   * ```
   * @param name The name of the error.
   * @returns void
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  onError?: (name: string) => void

  /**
   * A callback that will be called when the challenge expires.
   * @example
   * ```tsx
   * <TurnstileInput onExpire={() => console.log('the token expired')} />
   * ```
   * @returns void
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  onExpire?: () => void

  /**
   * A callback that will be called when the challenge is about to be interactive.
   * @example
   * ```tsx
   * <TurnstileInput onBeforeInteractive={() => console.log('the challenge is about to be interactive')} />
   * ```
   * @returns void
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  onBeforeInteractive?: () => void

  /**
   * A callback that will be called when the challenge is interactive.
   * @example
   * ```tsx
   * <TurnstileInput onAfterInteractive={() => console.log('the challenge is interactive')} />
   * ```
   * @returns void
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  onAfterInteractive?: () => void

  /**
   * A callback that will be called when the challenge is interactive.
   * @example
   * ```tsx
   * <TurnstileInput onAfterInteractive={() => console.log('the challenge is interactive')} />
   * ```
   * @returns void
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
   **/
  onUnsupported?: () => void
}

const functionNames = {
  error: 'cf-turnstile-error',
  verify: 'cf-turnstile-verify',
  expire: 'cf-turnstile-expire',
  beforeInteractive: 'cf-turnstile-before-interactive',
  afterInteractive: 'cf-turnstile-after-interactive',
  unsupported: 'cf-turnstile-unsupported',
}

/**
 * A React component that renders a Turnstile challenge.
 * @example
 * ```tsx
 * <TurnstileInput siteKey='...' />
 * ```
 * @see https://dash.cloudflare.com/turnstile
 * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
 **/
export default function TurnstileInput(props: Props) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const obj = {
      [functionNames.verify]: props.onVerify,
      [functionNames.error]: props.onError,
      [functionNames.expire]: props.onExpire,
      [functionNames.beforeInteractive]: props.onBeforeInteractive,
      [functionNames.afterInteractive]: props.onAfterInteractive,
      [functionNames.unsupported]: props.onUnsupported,
    }
    const names = Object.keys(obj).reduce((acc, name) => {
      if (obj[name] && typeof obj[name] === 'function') {
        acc[name] = (token: string) => obj[name]?.(token)
      }
      return acc
    }, {} as Record<string, (token: string) => void>)
    Object.assign(window, names)
  }, [
    props.onVerify,
    props.onError,
    props.onExpire,
    props.onBeforeInteractive,
    props.onAfterInteractive,
    props.onUnsupported,
  ])
  return (
    <div
      className='cf-turnstile'
      data-sitekey={props.siteKey}
      data-language={props.locale}
      data-response-field-name={props.fieldName}
      data-theme={props.theme || 'auto'}
      data-size={props.size || 'normal'}
      data-retry={props.retry}
      data-retry-interval={props.retryInterval}
      data-refresh-expired={props.refreshOnExpired}
      data-callback={props.onVerify ? functionNames.verify : undefined}
      data-error-callback={props.onError ? functionNames.error : undefined}
      data-expired-callback={props.onExpire ? functionNames.expire : undefined}
      data-before-interactive-callback={props.onBeforeInteractive ? functionNames.beforeInteractive : undefined}
      data-after-interactive-callback={props.onAfterInteractive ? functionNames.afterInteractive : undefined}
      data-unsupported-callback={props.onUnsupported ? functionNames.unsupported : undefined}
    ></div>
  )
}
