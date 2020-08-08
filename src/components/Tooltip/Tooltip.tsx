import React, { memo, FC } from 'react'
import styled from 'styled-components'
// import useToggle from '../../hooks/useBooleanToggle'

const Wrap = styled.div`
  display: flex;
  /* position: absolute; */
  /* right: 0; */
  align-items: center;
  cursor: pointer;
`
const TooltipText = styled.div<{ isError: boolean }>`
  visibility: hidden;
  position: absolute;
  right: 100%;
  border-right: 2px solid var(--sunset-orange);
  margin-right: var(--size-md);
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
    left: 100%;
    border-style: solid;
    border-width: 6px 0 6px 6px;
    border-color: transparent transparent transparent var(--sunset-orange);
    width: 0;
    height: 0;
  };

  ${Wrap}:hover & {
    visibility: visible;
    margin-right: var(--size-lg);
    transition: margin 0.2s ease-out, visibility 0.4s ease-out;
  };
`
const Content = styled.div`
`

interface IProps {
  isVisible: boolean
  tooltipText: string
  children: any
  className?: string
}
const Tooltip: FC<IProps> = ({ isVisible, tooltipText, children, className }) => {
  // TODO: see if isVisible needs to be passed in
  return (
    !isVisible ? null : (
      <Wrap className={className}>
        {tooltipText && <TooltipText isError={false}>{tooltipText}</TooltipText>}
        <Content>
          {children}
        </Content>
      </Wrap>
    )
  )
}

export default memo(Tooltip)
