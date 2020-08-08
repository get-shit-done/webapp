import Svg from "../Svg/component";
import styled from "styled-components";

export const LoaderSvg = styled(Svg)`
  display: flex;
  path {
    &:nth-child(1) {
      opacity: 1;
      fill: rgba(0, 0, 0, 0.2);
    };
    &:nth-child(2) {
      fill: rgba(0, 0, 0, 0.3);
    };
  };
`
