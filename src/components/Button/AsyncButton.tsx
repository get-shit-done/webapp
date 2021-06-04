import React, { FC } from "react";
import styled from "styled-components";
import { SpinnerLoader } from "../Loader";
import { getAsyncStatus } from "../../utils";
import Svg from "../Svg/component";
import errorApiSvg from "../../assets/svg/error-api.svg";
import Tooltip from "../Tooltip/Tooltip";
import { ButtonStyledWrap, AsyncButtonContent, IAsyncButtonProps } from "./shared";

const ErrorSvg = styled(Svg)`
  position: absolute;
  fill: var(--charcoal);

  &:hover {
    fill: var(--charcoal);
  }
`;

const AsyncButton: FC<IAsyncButtonProps> = ({
  isDisabled,
  accentColor,
  type = "button",
  children,
  asyncStatuses,
  asyncStatusId,
  className,
}) => {
  const { getIsLoading, getIsError, getError } = getAsyncStatus(asyncStatuses);
  const isError = getIsError(asyncStatusId);
  const error = getError(asyncStatusId);
  const isLoading = getIsLoading(asyncStatusId);

  return (
    <Tooltip isVisible tooltipText={error as string}>
      <ButtonStyledWrap
        disabled={isDisabled}
        isError={isError}
        accentColor={accentColor}
        type={type}
        className={className}>
        <SpinnerLoader size={1.6} isLoading={isLoading} />
        {isError && !isLoading && <ErrorSvg svg={errorApiSvg} />}
        <AsyncButtonContent isShow={!isError && !isLoading}>{children}</AsyncButtonContent>
      </ButtonStyledWrap>
    </Tooltip>
  );
};

export default AsyncButton;
