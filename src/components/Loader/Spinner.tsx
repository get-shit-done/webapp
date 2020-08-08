import React, { memo, FC } from 'react'
import styled from 'styled-components'
import { AsyncStatus } from '../../constants'
import loaderSvg from '../../assets/svg/loader.svg'
import Svg from '../Svg/component'
import { determineAsyncStatus } from '../../utils'

const Wrap = styled.div`
  display: flex;
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`

const LoaderStyled = styled(Svg)`
  display: flex;
  path {
    &:nth-child(1) {
      opacity: 1;
      fill: rgba(0, 0, 0, 0.2);
    };
    &:nth-child(2) {
      fill: rgba(0, 0, 0, 0.3);
    };
  };
`

interface Props {
  focusId?: string
  id?: string
  size?: number
  asyncStatus: AsyncStatus | AsyncStatus[]
  className?: string
}

const SpinnerLoader: FC<Props> = ({ size = 2, asyncStatus, className }) => {
  const { isBusy } = determineAsyncStatus(asyncStatus)
  return (
    isBusy ? (
      <Wrap className={className}>
        <LoaderStyled size={size} svg={loaderSvg} />
      </Wrap>
    ) : null
  )
}

export default memo(SpinnerLoader)
