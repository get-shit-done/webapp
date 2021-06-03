import React from "react";
import styled from "styled-components";
import { Todo } from "../../../types";
import binSvg from "../../../assets/svg/bin.svg";
import Svg, { styleDangerHover } from "../../../components/Svg/component";

import AddNewTodo from "./AddNewTodo";
import { SpinnerLoader } from "../../../components/Loader";
import { TextError } from "../../../components/error";
import { AsyncSvgButton } from "../../../components/Button";
import { useGetTodosQuery, useAddTodoMutation, useRemoveTodoMutation, useUpdateTodoMutation } from "../../../api";
import { getAsyncStatus } from "../../../utils";

const Todo = styled.div<{ isDone: boolean; isError: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--size-xsm) var(--size-lg) var(--size-xsm) 0;
  cursor: pointer;
  line-height: 1.5;

  &:hover {
    color: var(--cool-gray);
  }

  ${p =>
    p.isDone &&
    `
    color: var(--rhythm);

    &:hover {
      color: var(--rhythm);
    };
  `};

  ${p =>
    p.isError &&
    `
    color: var(--sunset-orange);

    &:hover {
      color: var(--sunset-orange);
    };
  `};
`;
const Name = styled.div`
  flex-grow: 1;
`;
const Actions = styled.div`
  position: absolute;
  right: 0;
  display: flex;
`;
const Remove = styled(Svg)`
  ${styleDangerHover};
`;
const TodosSpinner = styled(SpinnerLoader)``;

const Todos = () => {
  const getTodosStatus = useGetTodosQuery(undefined);
  const [updateTodo, updateTodoStatus] = useUpdateTodoMutation();
  const [removeTodo, removeTodoStatus] = useRemoveTodoMutation();
  const [addTodo, addTodoStatus] = useAddTodoMutation();

  const { getIsError, getError } = getAsyncStatus([updateTodoStatus, removeTodoStatus, addTodoStatus]);

  return (
    <>
      <AddNewTodo addNewTodo={todo => addTodo(todo)} />
      <TodosSpinner size={4} isLoading={getTodosStatus.isLoading} />
      <TextError errorMessage={getError(getTodosStatus.data?._id)} />
      {getTodosStatus.data?.map(({ _id, todoName, isDone }: Todo) => {
        return (
          <Todo isDone={isDone} isError={getIsError(_id)} key={_id}>
            <Name onClick={() => updateTodo({ _id, isDone: !isDone })}>{todoName}</Name>
            <Actions>
              <AsyncSvgButton asyncStatuses={[updateTodoStatus, removeTodoStatus, addTodoStatus]} asyncStatusId={_id}>
                <Remove theme='light' svg={binSvg} onClick={() => removeTodo({ _id })} />
              </AsyncSvgButton>
            </Actions>
          </Todo>
        );
      })}
    </>
  );
};

export default Todos;
