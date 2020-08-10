import React, { FC } from 'react'
import styled from 'styled-components'
import { SpinnerLoader } from '../Loader'
import { determineAsyncStatus } from '../../utils'
import Svg, { styleDanger } from '../Svg/component'
import errorApiSvg from '../../assets/svg/error-api.svg'
import Tooltip from '../Tooltip/Tooltip'
import { ButtonStyledWrap, AsyncButtonContent, IAsyncButtonProps } from './shared'

const ErrorSvg = styled(Svg)`
  position: absolute;
  fill: var(--charcoal);

  &:hover {
    fill: var(--charcoal);
  };
`

const AsyncButton: FC<IAsyncButtonProps> = ({ isDisabled, accentColor, type = 'button', children, asyncStatus, className }) => {
  const { isBusy, isError, errorMessage } = determineAsyncStatus(asyncStatus)

  return (
    <Tooltip isVisible tooltipText={errorMessage}>
      <ButtonStyledWrap
        disabled={isDisabled}
        isError={isError}
        accentColor={accentColor}
        type={type}
        className={className}
      >
        <SpinnerLoader size={1.6} asyncStatus={asyncStatus} />
        {isError && !isBusy && <ErrorSvg svg={errorApiSvg} />}
        <AsyncButtonContent isShow={!isError && !isBusy}>{children}</AsyncButtonContent>
      </ButtonStyledWrap>
    </Tooltip>
  )
}

export default AsyncButton
