import { LoadingOverlay } from '@mantine/core'
import React from 'react'
import InfinityLoader from '.'

const InfinityLoaderOverlay = ({ loading }: { loading: boolean }) => {
  if (loading)
    return (
      <div className="relative h-52">
        <LoadingOverlay loader={<InfinityLoader variant="lg" />} visible />
      </div>
    )
  return null
}

export default InfinityLoaderOverlay
