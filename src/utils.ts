type Props = {
  className?: string
}

const defaultClassName = 'cf-turnstile'

export const refreshTurnstile = (props: Props = {}) => {
  if (typeof window === 'undefined') return
  if ('turnstile' in window) {
    // @ts-ignore
    window.turnstile.render('.' + (props.className || defaultClassName))
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
        refreshTurnstile()
      }
    }
  }
}
