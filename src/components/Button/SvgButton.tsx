import React, { FC } from 'react'
import styled from 'styled-components'
import { AsyncStatus } from '../../constants'
import { SpinnerLoader } from '../Loader'
import { determineAsyncStatus } from '../../utils'
import Svg, { styleDanger } from '../Svg/component'
import errorApiSvg from '../../assets/svg/error-api.svg'
import Tooltip from '../Tooltip/Tooltip'
import { ButtonUnstyledWrap } from './shared'

const ErrorSvg = styled(Svg)`
  ${styleDanger};
`

interface Props {
  tooltipPosition?: 'left' | 'right'
  children: React.ReactNode
  asyncStatus: AsyncStatus | AsyncStatus[]
  className?: string
}

const AsyncButton: FC<Props> = ({ tooltipPosition, children, asyncStatus, className }) => {
  const { isBusy, isError, errorMessage } = determineAsyncStatus(asyncStatus)

  return (
    <ButtonUnstyledWrap type="button" className={className}>
      <SpinnerLoader isAbsolute={false} size={1.6} asyncStatus={asyncStatus} />
      <Tooltip isVisible={isError && !isBusy} tooltipPosition={tooltipPosition} tooltipText={errorMessage}>
        <ErrorSvg svg={errorApiSvg} />
      </Tooltip>
      {!isBusy && !isError && children}
    </ButtonUnstyledWrap>
  )
}

export default AsyncButton
