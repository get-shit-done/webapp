import React, { FC } from 'react'
import styled from 'styled-components'
import { AsyncStatus } from '../../constants'
import { SpinnerLoader } from '../Loader'
import { determineAsyncStatus } from '../../utils'
import Svg, { styleDanger } from '../Svg/component'
import errorApiSvg from '../../assets/svg/error-api.svg'
import Tooltip from '../Tooltip/Tooltip'
import { ButtonUnstyledWrap, ButtonStyledWrap, ButtonContent } from './shared'

const ErrorSvg = styled(Svg)`
  ${styleDanger};
`
const TooltipStyled = styled(Tooltip)`
  position: absolute;
`

interface Props {
  isStyled?: boolean
  isDisabled?: boolean
  accentColor?: string
  type?: 'submit' | 'button' | 'reset'
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  asyncStatus: AsyncStatus | AsyncStatus[]
  className?: string
}

const AsyncButton: FC<Props> = ({ isStyled = false, accentColor, type = 'button', children, asyncStatus, className }) => {
  const { isBusy, isError, errorMessage } = determineAsyncStatus(asyncStatus)

  return (
    <ButtonUnstyledWrap as={isStyled ? ButtonStyledWrap : ButtonUnstyledWrap}
      isError={isError}
      accentColor={accentColor}
      type={type}
      className={className}
    >
      <SpinnerLoader isAbsolute={false} size={1.6} asyncStatus={asyncStatus} />
      <TooltipStyled isVisible={isError && !isBusy} tooltipText={errorMessage}>
        <ErrorSvg svg={errorApiSvg} />
      </TooltipStyled>
      <ButtonContent isShow={!isBusy && !isError}>{children}</ButtonContent>
    </ButtonUnstyledWrap>
  )
}

export default AsyncButton
