import React from "react";
import styled from "styled-components";

const Wrap = styled.div<{ isActive: boolean }>`
  display: ${p => (p.isActive ? "block" : "none")};
`;
const Title = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 3.4rem;
`;

const TabHOC =
  (Component: any) =>
  ({ isActive, title, customProps = {} }: { isActive: boolean; title: string; customProps: object }) => {
    return (
      <Wrap isActive={isActive}>
        <Title>{title}</Title>

        <Component customProps={customProps} />
      </Wrap>
    );
  };

export default TabHOC;
