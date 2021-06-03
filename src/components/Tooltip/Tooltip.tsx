import React, { memo, FC } from "react";
import styled from "styled-components";
// import useToggle from '../../hooks/useBooleanToggle'

const Wrap = styled.div`
  display: flex;
  /* position: absolute; */
  /* right: 0; */
  align-items: center;
  cursor: pointer;
`;
const TooltipText = styled.div<{ isError: boolean; tooltipPosition: "left" | "right" }>`
  visibility: hidden;
  position: absolute;
  padding: 1rem var(--size-lg);
  line-height: 1.1;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  background-color: var(--sunset-orange);
  color: rgba(0, 0, 0, 0.6);
  font-weight: bold;
  border-radius: 2px;
  white-space: nowrap;

  &::before {
    content: "";
    position: absolute;
    border-style: solid;
    width: 0;
    height: 0;
    border-width: 6px;
    border-color: transparent;
  }

  ${Wrap}:hover & {
    visibility: visible;
    transition: margin 0.2s ease-out, visibility 0.4s ease-out;
  }

  ${p =>
    p.tooltipPosition === "left" &&
    `
    right: 100%;
    border-right: 2px solid var(--sunset-orange);
    margin-right: var(--size-md);

    ${Wrap}:hover & {
      margin-right: var(--size-lg);
    };

    &::before {
      left: 100%;
      border-right-width: 0;
      border-left-color: var(--sunset-orange);
    };
  `};

  ${p =>
    p.tooltipPosition === "right" &&
    `
    left: 100%;
    border-left: 2px solid var(--sunset-orange);
    margin-left: var(--size-md);

    ${Wrap}:hover & {
      margin-left: var(--size-lg);
    };

    &::before {
      right: 100%;
      border-left-width: 0;
      border-right-color: var(--sunset-orange);
    };
  `};
`;
const Content = styled.div``;

interface IProps {
  isVisible: boolean;
  tooltipPosition?: "left" | "right";
  tooltipText: string;
  children: any;
  className?: string;
}
const Tooltip: FC<IProps> = ({ isVisible, tooltipPosition = "left", tooltipText, children, className }) => {
  // TODO: see if isVisible needs to be passed in
  return !isVisible ? null : (
    <Wrap className={className}>
      {tooltipText && (
        <TooltipText isError={false} tooltipPosition={tooltipPosition}>
          {tooltipText}
        </TooltipText>
      )}
      <Content>{children}</Content>
    </Wrap>
  );
};

export default memo(Tooltip);
