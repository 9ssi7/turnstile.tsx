# The Cloudflare Turnstile Client Side Component for React and NextJS

This is a React component that can be used to protect your React and NextJS applications with Cloudflare Access.

## Installation

```bash
npm install --save turnstile-next
```

or

```bash
yarn add turnstile-next
```

## Usage With NextJS

In your layout or page, import the `TurnstileNextContext` and use it your page or layout like so:

```jsx
import { TurnstileNextContext } from 'turnstile-next';

export default function Layout({ children }) {
  return (
    <>
        <div>{children}</div>
        <TurnstileNextContext/>
    </>
  );
}
```

only cloudflare script tag is included here.

## Usage In Component

```tsx
import TurnstileInput from 'turnstile-next';

const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY;

export default function MyComponent() {
  
  const onVerify = (token : string) => {
    console.log(token);
  } 

  const onErr = (err : string) => {
    console.log(err);
  }
  
  return (
    <>
        <TurnstileInput onVerify={onVerify} onErr={onErr} siteKey={SITE_KEY} />
    </>
  );
}
```

## Usage

The `TurnstileInput` component accepts a set of properties that are used to configure the Turnstile challenge. Here's a detailed description of each property:

| Property             | Description                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| siteKey _(required)_ | The site key for your Turnstile challenge. This key is obtained from the Turnstile dashboard.       |
| theme                | The theme of the challenge. Defaults to "auto".                                                     |
| locale               | The locale of the challenge. Defaults to "en".                                                      |
| size                 | The size of the challenge. Defaults to "normal".                                                    |
| fieldName            | The name of the field that will be used to store the token. Defaults to "cf-turnstile-token".      |
| retryInterval        | The interval in milliseconds to retry the challenge. Defaults to 8000.                               |
| retry                | Whether to retry the challenge. Defaults to true.                                                   |
| refreshOnExpired     | Whether to refresh the challenge when it expires. Defaults to "auto".                                |
| onVerify             | A callback that will be called when the challenge is verified.                                      |
| onError              | A callback that will be called when the challenge fails.                                            |
| onExpire             | A callback that will be called when the challenge expires.                                          |
| onBeforeInteractive  | A callback that will be called when the challenge is about to be interactive.                       |
| onAfterInteractive   | A callback that will be called when the challenge is interactive.                                   |
| onUnsupported       | A callback that will be called when the challenge is unsupported by the user's browser.            |

For detailed information on each property and its usage, please refer to the [Turnstile documentation](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations).

## Contributing

Contributions are always welcome!

## License

[MIT](https://choosealicense.com/licenses/mit/)
