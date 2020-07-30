import React, { useState, useEffect, memo, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Button from '../../../components/Button/component'
import { Dropdown, TextField } from '../../../components/form'
import { actions } from '../../../reducers/calendar'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { ModalFooter } from '../../../components/Modal'
import { CalendarFormValues } from './shared'

const Form = styled.form``

interface Props {
  timestamp: string
  time: number[]
  onModalClose(): void
}

const AddNewCalendarTask: FC<Props> = ({ timestamp, time, onModalClose }) => {
  const dispatch = useAppDispatch()
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
    onModalClose()
  }
  const watchedFields = watch()
  const accentColor = selectedGroup ? colors[selectedGroup.colorId] : undefined

  useEffect(() => {
    const { name, from, to } = watchedFields
    const isFormValuesEmpty = Object.values(watchedFields).every(x => !x)
    const timeFormatted = isFormValuesEmpty ? time : [Number(from), Number(to)]
    dispatch(
      actions.prepareTask({
        name,
        time: timeFormatted,
        group: selectedGroup?.name,
      }),
    )
  }, [watchedFields.name, watchedFields.from, watchedFields.to, selectedGroup.name])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        isInForm
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
        <Button
          isDisabled={Object.entries(errors).length > 0}
          accentColor={accentColor}
          type="submit"
        >
          Add new task
        </Button>
      </ModalFooter>
    </Form>
  )
}

export default memo(AddNewCalendarTask)
