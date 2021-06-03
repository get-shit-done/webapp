import React, { FC } from "react";
import styled from "styled-components";

export const CN_ERROR_FIELD = "error-field";

const Wrap = styled.div<{ isInfoVariant?: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--size-xsm);
  font-size: var(--font-size-xxsm);
  color: ${props => (props.isInfoVariant ? "var(--very-light-tangelo)" : "var(--sunset-orange)")};
`;
interface Props {
  errorMessage?: string;
  className?: string;
}

const FieldError: FC<Props> = ({ errorMessage, className }) => {
  return !errorMessage ? null : <Wrap className={`${className} ${CN_ERROR_FIELD}`}>{errorMessage}</Wrap>;
};

export default FieldError;
