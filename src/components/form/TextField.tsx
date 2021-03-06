import React, { FC, memo, useState } from "react";

import Placeholder from "./Placeholder";
import { SvgStyled, Input, Wrap } from "./shared";
import { FieldError } from "../error";

interface Props {
  isInForm?: boolean;
  theme?: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  placeholder: string;
  svg?: string;
  errorMessage?: string;
  className?: string;
  inputRef(instance: HTMLInputElement): void;
}

const Field: FC<Props> = ({
  isInForm,
  theme,
  name,
  type = "text",
  defaultValue,
  placeholder,
  svg,
  errorMessage,
  className,
  inputRef,
}) => {
  const [value, setValue] = useState(defaultValue);
  const hasValue = value !== undefined && value !== "";
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);
  };

  return (
    <Wrap isInForm={isInForm} theme={theme} className={className}>
      <Placeholder theme={theme} hasValue={hasValue}>
        {placeholder}
      </Placeholder>
      <Input defaultValue={value} name={name} type={type} isError={errorMessage} onChange={onChange} ref={inputRef} />
      {svg && <SvgStyled svg={svg} />}
      <FieldError errorMessage={errorMessage} />
    </Wrap>
  );
};

export default memo(Field);
