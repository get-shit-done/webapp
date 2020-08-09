import React, { FC } from 'react'
import styled from 'styled-components'
import { AsyncStatus } from '../../constants'
import { SpinnerLoader } from '../Loader'
import { determineAsyncStatus } from '../../utils'
import Svg, { styleDanger } from '../Svg/component'
import errorApiSvg from '../../assets/svg/error-api.svg'
import Tooltip from '../Tooltip/Tooltip'
import { ButtonStyledWrap, ButtonContent } from './shared'

const ErrorSvg = styled(Svg)`
  position: absolute;
  fill: var(--charcoal);

  &:hover {
    fill: var(--charcoal);
  };
`

interface Props {
  isDisabled?: boolean
  accentColor?: string
  type?: 'submit' | 'button' | 'reset'
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  asyncStatus: AsyncStatus | AsyncStatus[]
  className?: string
}

const AsyncButton: FC<Props> = ({ accentColor, type = 'button', children, asyncStatus, className }) => {
  const { isBusy, isError, errorMessage } = determineAsyncStatus(asyncStatus)

  return (
    <Tooltip isVisible tooltipText={errorMessage}>
      <ButtonStyledWrap
        isError={isError}
        accentColor={accentColor}
        type={type}
        className={className}
      >
        <SpinnerLoader size={1.6} asyncStatus={asyncStatus} />
        {isError && !isBusy && <ErrorSvg svg={errorApiSvg} />}
        <ButtonContent isShow={!isError && !isBusy}>{children}</ButtonContent>
      </ButtonStyledWrap>
    </Tooltip>
  )
}

export default AsyncButton
