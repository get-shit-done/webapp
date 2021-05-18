import React from "react";
import styled from "styled-components";
import { NewTodo, Todo } from "../../../types";
import { actions as toastActions } from "../../../components/Toast/reducer";
import binSvg from "../../../assets/svg/bin.svg";
import Svg, { styleDangerHover } from "../../../components/Svg/component";
import { useAppDispatch } from "../../../Application/Root";

import AddNewTodo from "./AddNewTodo";
import { SpinnerLoader } from "../../../components/Loader";
import { TextError } from "../../../components/error";
import { AsyncSvgButton } from "../../../components/Button";
import { useGetTodosQuery, useAddTodoMutation, useRemoveTodoMutation, useUpdateTodoMutation } from "../../../api";

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
  const { data: todos = [], isLoading: isLoadingGet, error } = useGetTodosQuery(undefined);
  const [updateTodo, { isLoading: isLoadingUpdate, isError: isErrorUpdate }] = useUpdateTodoMutation();
  const [removeTodo, { isLoading: isLoadingRemove, isError: isErrorRemove }] = useRemoveTodoMutation();
  const [addTodo, { isLoading: isLoadingAdd, isError: isErrorAdd }] = useAddTodoMutation();

  const dispatch = useAppDispatch();
  const onAddNewTodo = (todo: NewTodo) => {
    addTodo(todo);
  };
  const onRemoveTodo = (_id: string, todoName: string) => {
    removeTodo({ _id });
    dispatch(toastActions.addToast({ prefix: "task removed", message: todoName }));
  };

  return (
    <>
      <AddNewTodo addNewTodo={onAddNewTodo} />
      <TodosSpinner size={4} isLoading={isLoadingGet} />
      <TextError errorMessage={error} />
      {todos.map(({ _id, todoName, isDone }: Todo) => {
        const isError = [isErrorUpdate, isErrorRemove, isErrorAdd].filter(x => x).length > 0;
        const isLoading = [isLoadingUpdate, isLoadingRemove, isLoadingAdd].filter(x => x).length > 0;
        // const asyncStatusList = [toggle[_id], add[_id], remove[_id]]
        // const { isError } = determineAsyncStatus(asyncStatusList)

        return (
          <Todo isDone={isDone} isError={isError} key={_id}>
            <Name onClick={() => updateTodo({ _id, isDone: !isDone })}>{todoName}</Name>
            <Actions>
              <AsyncSvgButton errorMessage='' isLoading={isLoading}>
                <Remove theme='light' svg={binSvg} onClick={() => onRemoveTodo(_id, todoName)} />
              </AsyncSvgButton>
            </Actions>
          </Todo>
        );
      })}
    </>
  );
};

export default Todos;
