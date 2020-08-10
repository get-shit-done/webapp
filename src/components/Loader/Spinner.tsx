import React, { memo, FC } from 'react'
import styled from 'styled-components'
import { AsyncStatus } from '../../constants'
import loaderSvg from '../../assets/svg/loader.svg'
import { determineAsyncStatus } from '../../utils'
import { LoaderSvg } from './shared'

const Wrap = styled.div<{ isAbsolute: boolean }>`
  display: flex;
  z-index: 1;
  position: ${p => p.isAbsolute ? 'absolute' : 'static'};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`

interface Props {
  isAbsolute?: boolean
  size?: number
  asyncStatus: AsyncStatus | AsyncStatus[]
  className?: string
}

const SpinnerLoader: FC<Props> = ({ isAbsolute = true, size = 2, asyncStatus, className }) => {
  const { isBusy } = determineAsyncStatus(asyncStatus)
  return (
    isBusy ? (
      <Wrap isAbsolute={isAbsolute} className={className}>
        <LoaderSvg size={size} svg={loaderSvg} />
      </Wrap>
    ) : null
  )
}

export default memo(SpinnerLoader)
