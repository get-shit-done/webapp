import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { TextField } from '../../../components/form'
import Button from '../../../components/Button/component'

const Form = styled.form`
  margin-bottom: var(--size-md);
`

const Settings: FC = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
    console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        theme="light"
        isInForm
        name="hoursFrom"
        placeholder="hours from"
        errorMessage={errors.hoursFrom?.type}
        inputRef={register({ required: true, maxLength: 5 })}
      />
      <TextField
        theme="light"
        isInForm
        name="hoursTo"
        placeholder="hours to"
        errorMessage={errors.hoursTo?.type}
        inputRef={register({ required: true, maxLength: 5 })}
      />
      <Button type="submit">
        save
      </Button>
    </Form>
  )
}

export default Settings
