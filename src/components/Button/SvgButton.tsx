import React, { FC } from 'react'
import { AsyncStatus } from '../../constants'
import { SpinnerLoader } from '../Loader'
import { determineAsyncStatus } from '../../utils'
import Tooltip from '../Tooltip/Tooltip'
import { SvgButtonWrap, ButtonContent } from './shared'

interface Props {
  tooltipPosition?: 'left' | 'right'
  children: React.ReactNode
  asyncStatus: AsyncStatus | AsyncStatus[]
  className?: string
}

const AsyncButton: FC<Props> = ({ tooltipPosition, children, asyncStatus, className }) => {
  const { isBusy, isError, errorMessage } = determineAsyncStatus(asyncStatus)

  return (
    <SvgButtonWrap isError={isError} type="button" className={className}>
      <SpinnerLoader size={1.6} asyncStatus={asyncStatus} />
      <Tooltip isVisible tooltipPosition={tooltipPosition} tooltipText={errorMessage}>
        <ButtonContent isShow={!isBusy}>
          {children}
        </ButtonContent>
      </Tooltip>
    </SvgButtonWrap>
  )
}

export default AsyncButton
