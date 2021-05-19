import React, { FC } from 'react'
import { AsyncStatus } from '../../constants'
import { SpinnerLoader } from '../Loader'
import { determineAsyncStatus } from '../../utils'
import Tooltip from '../Tooltip/Tooltip'
import { SvgButtonWrap, AsyncButtonContent } from './shared'
import { FetchBaseQueryError } from '@rtk-incubator/rtk-query/dist'
import { SerializedError } from '@reduxjs/toolkit'

interface Props {
  tooltipPosition?: 'left' | 'right'
  children: React.ReactNode
  asyncStatus?: AsyncStatus | AsyncStatus[]
  errorMessage?: FetchBaseQueryError | SerializedError;
  isLoading?: boolean;
  className?: string
}

const AsyncSvgButton: FC<Props> = ({ tooltipPosition, children, asyncStatus, className, errorMessage, isLoading }) => {
  // const { isBusy, isError, errorMessage } = determineAsyncStatus(asyncStatus)

  return (
    <SvgButtonWrap isError={!!errorMessage} type="button" className={className}>
      <SpinnerLoader size={1.6} isLoading={isLoading} />
      <Tooltip isVisible tooltipPosition={tooltipPosition} tooltipText={errorMessage as string}>
        <AsyncButtonContent isShow={!isLoading}>
          {children}
        </AsyncButtonContent>
      </Tooltip>
    </SvgButtonWrap>
  )
}

export default AsyncSvgButton
