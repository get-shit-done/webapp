import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { TextField } from '../../../components/form'
import { NewTodo } from '../../../types'

const Form = styled.form`
  margin-bottom: var(--size-md);
`

interface IProps {
  addNewTodo(data: NewTodo): void
}

const AddNewTodo: FC<IProps> = ({ addNewTodo }) => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data: NewTodo) => addNewTodo(data)
  const errorMessage = (errors.todo || {}).type

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        theme="light"
        name="todoName"
        placeholder="add todo"
        errorMessage={errorMessage}
        inputRef={register({ required: true, maxLength: 20 })}
      />
    </Form>
  )
}

export default AddNewTodo
