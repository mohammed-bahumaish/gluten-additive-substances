import { Button, ButtonProps } from '@mantine/core'
import { forwardRef } from 'react'

// eslint-disable-next-line react/display-name
const BlurredButton = forwardRef<HTMLButtonElement, ButtonProps<'button'>>(
  (props, ref) => (
    <Button {...props} className="relative" ref={ref}>
      <span className="absolute inset-0 bg-orange-400 blur-md opacity-0 hover:opacity-25" />
      {props.children}
    </Button>
  ),
)

export default BlurredButton
