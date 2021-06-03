import React, { FC } from "react";
import { AsyncStatusNew } from "../../constants";
import { SpinnerLoader } from "../Loader";
import { getAsyncStatus } from "../../utils";
import Tooltip from "../Tooltip/Tooltip";
import { SvgButtonWrap, AsyncButtonContent } from "./shared";

interface Props {
  tooltipPosition?: "left" | "right";
  children: React.ReactNode;
  asyncStatuses?: AsyncStatusNew[];
  asyncStatusId?: string;
  className?: string;
}

const AsyncSvgButton: FC<Props> = ({ tooltipPosition, children, asyncStatuses, asyncStatusId, className }) => {
  const { getIsLoading, getIsError, getError } = getAsyncStatus(asyncStatuses);
  const isError = getIsError(asyncStatusId);
  const error = getError(asyncStatusId);
  const isLoading = getIsLoading(asyncStatusId);

  return (
    <SvgButtonWrap isError={isError} type='button' className={className}>
      <SpinnerLoader size={1.6} isLoading={isLoading} />
      <Tooltip isVisible tooltipPosition={tooltipPosition} tooltipText={error as string}>
        <AsyncButtonContent isShow={!isLoading}>{children}</AsyncButtonContent>
      </Tooltip>
    </SvgButtonWrap>
  );
};

export default AsyncSvgButton;
