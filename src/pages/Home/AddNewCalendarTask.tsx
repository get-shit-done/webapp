import React, { useState, useEffect, memo, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import TextField from '../../components/form/Field/component'
import Button from '../../components/Button/component'
import Dropdown from '../../components/form/Dropdown'
import { actions } from '../../reducers/calendar'
import { RootState } from '../../Application/Root/reducers'

const Form = styled.form``

interface Props {
  dateString: string,
  timeFrom: string,
  onModalClose(): void,
}

interface ISelectedGroup {
  name: string,
  from: string,
  to: string,
  group: {
    id: string,
    name: string,
    color: {
      name: string,
      value: string,
    },
  },
}

const AddNewCalendarTask: FC<Props> = ({ dateString, timeFrom, onModalClose }) => {
  const dispatch = useDispatch()
  const [selectedGroup, setSelectedGroup] = useState<ISelectedGroup>()
  const { groups } = useSelector((state: RootState) => state.settings)
  const { register, handleSubmit, errors, watch } = useForm({ defaultValues: { from: timeFrom, to: '', name: '' } }) // fix this. is not correct shape
  const onSubmit = (data: any) => {
    dispatch(actions.addTask({ ...data, dateString, group: selectedGroup }))
    onModalClose()
  }
  const watchedFields = watch()

  useEffect(() => {
    dispatch(actions.prepareTask({
      ...watchedFields,
      group: selectedGroup,
    }))
  }, [watchedFields, selectedGroup])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        isInForm
        theme='light'
        name="name"
        placeholder="name"
        errorMessage={errors.name?.type}
        inputRef={register({ required: true, maxLength: 80 })}
      />
      {/* <Dropdown
        isInForm
        theme="light"
        label="select group"
        list={groups}
        listKey="name"
        onSelect={group => setSelectedGroup(group)}
        inputRef={register({ required: true, maxLength: 80 })}
      /> */}
      <TextField
        isInForm
        defaultValue={timeFrom}
        theme='light'
        name="from"
        placeholder="time from"
        errorMessage={errors.from?.type}
        inputRef={register({ required: true, maxLength: 80 })}
      />
      <TextField
        isInForm
        theme='light'
        name="to"
        placeholder="time to"
        errorMessage={errors.to?.type}
        inputRef={register({ required: true, maxLength: 80 })}
      />
      <Button
        isDisabled={Object.entries(errors).length > 0}
        isInForm
        accentColor={selectedGroup?.group?.color.value}
        type="submit"
      >
        Add new task
      </Button>
    </Form>
  )
}

export default memo(AddNewCalendarTask)
