import React, { useState, useEffect, memo, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import TextField from '../../../components/form/Field/component'
import Button from '../../../components/Button/component'
import Dropdown from '../../../components/form/Dropdown'
import { actions } from '../../../reducers/calendar'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { IGroup } from '../../../reducers/settings'
import { ModalFooter } from '../../../components/Modal'

const Form = styled.form``

interface Props {
  timestamp: string
  time: number[]
  onModalClose(): void
}

interface ISelectedGroup extends IGroup {
  name: string
  from: string
  to: string
}

const AddNewCalendarTask: FC<Props> = ({ timestamp, time, onModalClose }) => {
  const dispatch = useAppDispatch()
  const [selectedGroup, setSelectedGroup] = useState<ISelectedGroup>()
  const { colors } = useSelector((state: AppState) => state.settings)
  const { register, handleSubmit, errors, watch } = useForm({ defaultValues: { from: time[0], to: time[1], name: '' } }) // fix this. is not correct shape
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
    dispatch(
      actions.prepareTask({
        ...watchedFields,
        time: [watchedFields.from, watchedFields.to],
        group: selectedGroup?.name,
      }),
    )
  }, [watchedFields, selectedGroup])

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
