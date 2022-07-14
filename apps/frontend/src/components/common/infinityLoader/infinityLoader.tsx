import Lottie from 'lottie-react'
import * as animationData from './infinity-loop.json'

const infinityLoader = ({
  variant = 'sm',
}: {
  variant?: 'sm' | 'lg' | 'md'
}) => {
  // eslint-disable-next-line no-nested-ternary
  const width = variant === 'sm' ? 'w-24' : variant === 'md' ? 'w-44' : 'w-64'
  return (
    <div className={width}>
      <Lottie animationData={animationData} loop size={5} />
    </div>
  )
}

export default infinityLoader
