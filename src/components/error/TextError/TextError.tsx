import React, { FC } from 'react'
import styled from 'styled-components'
import { AsyncStatus } from '../../../constants'
import { determineAsyncStatus } from '../../../utils'
import infoSvg from '../../../assets/svg/error-api.svg'
import Svg, { styleDanger } from '../../Svg/component'
import { FetchBaseQueryError } from '@rtk-incubator/rtk-query/dist'
import { SerializedError } from '@reduxjs/toolkit'

const Wrap = styled.div`
  display: flex;
  color: var(--sunset-orange);
`

const ErrorSvg = styled(Svg)`
  ${styleDanger};
  margin-right: var(--size-lg);
  fill: var(--sunset-orange);
`
interface IProps {
  asyncStatus?: AsyncStatus;
  errorMessage?: FetchBaseQueryError | SerializedError;
}

export default function TextError({ asyncStatus, errorMessage }: IProps) {
  // const { isError, errorMessage } = determineAsyncStatus(asyncStatus)

  if (!errorMessage) return null
  return (
    <Wrap>
      <ErrorSvg svg={infoSvg}></ErrorSvg>
      {errorMessage}
    </Wrap>
  )
}
