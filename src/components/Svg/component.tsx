import React, { FC } from "react";
import styled from "styled-components";

export const CN_SVG = "svg";

export const styleDanger = `
  fill: var(--sunset-orange);
  cursor: inherit;
  
  &:hover {
    fill: var(--sunset-orange);
  };
`;
export const styleDangerHover = `
  &:hover {
    fill: var(--sunset-orange);
  };
`;
const Wrap = styled.span<{ size: number; theme: string }>`
  display: flex;
  flex-shrink: 0;
  width: ${props => props.size}rem;
  height: ${props => props.size}rem;
  fill: ${p => (p.theme === "light" ? "var(--sonic-silver)" : "red")};
  cursor: pointer;

  /* TODO: remove theme here and do it properly */
  &:hover {
    fill: ${p => (p.theme === "light" ? "var(--gainsboro)" : "var(--jet)")};
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

interface Props {
  theme?: string;
  svg: string;
  size?: number;
  className?: string;
  onClick?(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}

const Svg: FC<Props> = ({ theme = "light", svg, size = 1.6, className, onClick }) => (
  <Wrap
    theme={theme}
    size={size}
    className={`${className} ${CN_SVG}`}
    onClick={onClick}
    dangerouslySetInnerHTML={{ __html: svg }}
  />
);

export default Svg;
