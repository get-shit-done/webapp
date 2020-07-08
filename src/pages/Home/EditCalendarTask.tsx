import React, { useState, memo, FC } from 'react'
import { useSelector } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'
import styled from 'styled-components'
import TextField from '../../components/form/Field/component'
import Button from '../../components/Button/component'
import Dropdown from '../../components/form/Dropdown'
import { actions, Task, TaskWithMeta } from '../../reducers/calendar'
import { AppState, useAppDispatch } from '../../Application/Root'

const Form = styled.form``

interface Props {
  dateString: string,
  taskBeingEdited: TaskWithMeta,
}
type FormValues = {
  name: string,
  to: number,
  from: number,
}

const EditCalendarTask: FC<Props> = ({ dateString, taskBeingEdited }) => {
  const dispatch = useAppDispatch()
  const [selectedGroup, setSelectedGroup] = useState(taskBeingEdited.group)
  const { groups } = useSelector((state: AppState) => state.settings)
  const { id, time, name, group } = taskBeingEdited
  const onSubmit: SubmitHandler<FormValues> = (data): any => dispatch(actions.saveTask({ // TODO: fix this
    ...data,
    id,
    group: selectedGroup,
    time: [data.from, data.to],
    dateString,
  }))
  
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      from: time[0],
      to: time[1],
      name,
      group,
    }
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        isInForm
        defaultValue={name}
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
        activeItem={groups.find(x => x.name === group)}
        onSelect={group => setSelectedGroup(group.name)}
        inputRef={register({ required: true, maxLength: 80 })}
      /> */}
      <TextField
        isInForm
        defaultValue={time[0]}
        theme='light'
        name="from"
        placeholder="time from"
        errorMessage={errors.from?.type}
        inputRef={register({ required: true, maxLength: 80 })}
      />
      <TextField
        isInForm
        defaultValue={time[1]}
        theme='light'
        name="to"
        placeholder="time to"
        errorMessage={errors.to?.type}
        inputRef={register({ required: true, maxLength: 80 })}
      />
      <Button
        isDisabled={Object.entries(errors).length > 0}
        isInForm
        // accentColor={selectedGroup?.group?.color.value}
        type="submit"
      >
        Save task
      </Button>
    </Form>
  )
}

export default memo(EditCalendarTask)
