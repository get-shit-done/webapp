import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import TextField from '../../../components/form/Field/component'

const Form = styled.form`
  margin-bottom: var(--size-md);
`

interface IProps {
  addNewTodo(data: any): void
}

const AddNewTodo: FC<IProps> = ({ addNewTodo }) => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data: any) => addNewTodo(data)
  const errorMessage = (errors.todo || {}).type

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        theme="light"
        name="todo"
        placeholder="add todo"
        errorMessage={errorMessage}
        inputRef={register({ required: true, maxLength: 80 })}
      />
    </Form>
  )
}

export default AddNewTodo
