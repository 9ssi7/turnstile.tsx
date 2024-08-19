type Props = {
  className?: string
}

const defaultClassName = 'cf-turnstile'

export const refreshTurnstile = (props: Props = {}) => {
  if (typeof window === 'undefined') return
  if ('turnstile' in window) {
    checkWidgetRender()
    // @ts-ignore
    window.turnstile.reset('.' + (props.className || defaultClassName))
  }
}

export const checkWidgetRender = () => {
  if (typeof window === 'undefined') return
  if ('turnstile' in window) {
    try {
      // @ts-ignore
      window.turnstile.getResponse()
    } catch (err: any) {
      if (err?.message?.includes('not find widget')) {
        // @ts-ignore
        window.turnstile.render('.' + defaultClassName)
      }
    }
  }
}
