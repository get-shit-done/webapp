import React, { useState, useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import TextField from '../../components/form/Field/component'
import Button from '../../components/Button/component'
import Dropdown from '../../components/form/Dropdown'
import { actions } from '../../reducers/calendar'

const Form = styled.form``

function AddNewCalendarTask({ taskBeingEdited }) {
  const dispatch = useDispatch()
  const [selectedGroup, setSelectedGroup] = useState(taskBeingEdited.group)
  const { groups } = useSelector(state => state.settings)
  const onSubmit = data => dispatch(actions.saveTask(data))
  
  const {
    id,
    time,
    name,
    group,
  } = taskBeingEdited
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      from: time[0],
      to: time[1],
      name,
      group,
    }
  })
  // const watchedFields = watch()

  // useEffect(() => {
  //   dispatch(actions.saveTask({
  //     ...watchedFields,
  //     group: selectedGroup,
  //   }))
  // }, [watchedFields, selectedGroup])

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
      <Dropdown
        isInForm
        theme="light"
        label="select group"
        list={groups}
        listKey="name"
        activeItem={groups.find(x => x.name === group)}
        onSelect={group => setSelectedGroup(group)}
        inputRef={register({ required: true, maxLength: 80 })}
      />
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
        accentColor={selectedGroup?.group?.color.value}
        type="submit"
      >
        Save task
      </Button>
    </Form>
  )
}

export default memo(AddNewCalendarTask)
