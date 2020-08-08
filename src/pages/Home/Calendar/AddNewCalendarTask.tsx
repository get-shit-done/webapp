import React, { useState, useEffect, memo, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { DumbButton } from '../../../components/Button'
import { Dropdown, TextField } from '../../../components/form'
import { actions } from '../../../reducers/calendar'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { ModalFooter } from '../../../components/Modal'
import { CalendarFormValues } from './shared'

const Form = styled.form``

const AddNewCalendarTask: FC = () => {
  const dispatch = useAppDispatch()
  const { taskBeingPrepared, asyncStatus } = useSelector((state: AppState) => state.calendar)
  const { timestamp, time } = taskBeingPrepared
  const { groups, colors } = useSelector((state: AppState) => state.settings)
  const [selectedGroup, setSelectedGroup] = useState(groups.find(x => x.name === 'improvement'))
  const { register, handleSubmit, errors, watch } = useForm<CalendarFormValues>()
  const onSubmit = (data: any) => {
    const { name, from, to } = data
    dispatch(
      actions.addTaskRequested({
        name,
        time: [Number(from), Number(to)],
        timestamp,
        group: selectedGroup.name,
      }),
    )
  }
  const watchedFields = watch()
  const accentColor = selectedGroup ? colors[selectedGroup.colorId] : undefined

  useEffect(() => {
    const { name, from = time[0], to = time[1] } = watchedFields
    const fieldValuesRendered = Object.keys(watchedFields).length > 0

    fieldValuesRendered && dispatch(
      actions.prepareTask({
        timestamp,
        name,
        time: [Number(from), Number(to)],
        group: selectedGroup?.name,
      }),
    )
  }, [watchedFields.name, watchedFields.from, watchedFields.to, selectedGroup.name])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        isInForm
        defaultValue=""
        theme="light"
        name="name"
        placeholder="name"
        errorMessage={errors.name?.type}
        inputRef={register({ required: true, maxLength: 80 })}
      />
      <Dropdown
        isInForm
        theme="light"
        label="select group"
        activeGroup={selectedGroup}
        onSelect={group => setSelectedGroup(group)}
        inputRef={register({ required: true, maxLength: 80 })}
      />
      <TextField
        isInForm
        defaultValue={time[0]}
        theme="light"
        name="from"
        placeholder="time from"
        errorMessage={errors.from?.type}
        inputRef={register({ required: true, maxLength: 80 })}
      />
      <TextField
        isInForm
        defaultValue={time[1]}
        theme="light"
        name="to"
        placeholder="time to"
        errorMessage={errors.to?.type}
        inputRef={register({ required: true, maxLength: 80 })}
      />
      <ModalFooter>
        <DumbButton
          isDisabled={Object.entries(errors).length > 0}
          accentColor={accentColor}
          type="submit"
          asyncStatus={asyncStatus.addTask}
        >
          Add new task
        </DumbButton>
      </ModalFooter>
    </Form>
  )
}

export default memo(AddNewCalendarTask)
