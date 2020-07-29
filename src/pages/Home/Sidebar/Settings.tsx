import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { TextField } from '../../../components/form'
import Button from '../../../components/Button/component'
import { useAppDispatch, AppState } from '../../../Application/Root'
import { useSelector } from 'react-redux'
import { actions } from '../../../reducers/settings'

const Form = styled.form`
  margin-bottom: var(--size-md);
`

const Settings: FC = () => {
  const dispatch = useAppDispatch()
  const { defaultHoursFrom, defaultHoursTo } = useSelector((state: AppState) => state.settings)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data: any) => {
    const dataMapped = {
      defaultHoursFrom: Number(data.defaultHoursFrom),
      defaultHoursTo: Number(data.defaultHoursTo)
    }
    dispatch(actions.updateSettings(dataMapped))
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        theme="light"
        isInForm
        defaultValue={defaultHoursFrom}
        name="defaultHoursFrom"
        placeholder="hours from"
        errorMessage={errors.defaultHoursFrom?.type}
        inputRef={register({ required: true, maxLength: 5 })}
      />
      <TextField
        theme="light"
        isInForm
        defaultValue={defaultHoursTo}
        name="defaultHoursTo"
        placeholder="hours to"
        errorMessage={errors.defaultHoursTo?.type}
        inputRef={register({ required: true, maxLength: 5 })}
      />
      <Button type="submit">
        save
      </Button>
    </Form>
  )
}

export default Settings
