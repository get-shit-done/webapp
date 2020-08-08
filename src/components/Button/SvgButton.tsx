import React, { FC } from 'react'
import styled from 'styled-components'
import { AsyncStatus } from '../../constants'
import { SpinnerLoader } from '../Loader'
import { determineAsyncStatus } from '../../utils'
import Svg, { styleDanger } from '../Svg/component'
import errorApiSvg from '../../assets/svg/error-api.svg'
import Tooltip from '../Tooltip/Tooltip'

const Wrap = styled.button`
  cursor: pointer;
`
const ErrorSvg = styled(Svg)`
  ${styleDanger};
`

interface Props {
  children: React.ReactNode
  asyncStatus?: AsyncStatus | AsyncStatus[]
}

const SvgButton: FC<Props> = ({ children, asyncStatus }) => {
  const { isBusy, isError, errorMessage } = determineAsyncStatus(asyncStatus)

  return (
    <Wrap>
      <SpinnerLoader isAbsolute={false} size={1.6} asyncStatus={asyncStatus} />
      <Tooltip isVisible={isError && !isBusy} tooltipText={errorMessage}>
        <ErrorSvg svg={errorApiSvg} />
      </Tooltip>
      {!isBusy && !isError && children}
    </Wrap>
  )
}

export default SvgButton
