import React, { useState, memo, FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'
import styled from 'styled-components'
import { TextField, Dropdown } from '../../../components/form'
import Button from '../../../components/Button/component'
import binSvg from '../../../assets/svg/bin.svg'
import Svg, { styleDangerHover } from '../../../components/Svg/component'
import { actions } from '../../../reducers/calendar'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { ModalFooter } from '../../../components/Modal'
import { CalendarFormValues } from './shared'
import SvgButton from '../../../components/Button/SvgButton'

const Form = styled.form``

const RemoveButton = styled(SvgButton)`
  margin-left: var(--size-xlg);
`
const RemoveSvg = styled(Svg)`
  ${styleDangerHover};
`

// TODO: timestamp should come from taskBeingEdited
const EditCalendarTask: FC = () => {
  // console.log('COMP: Edit form')
  const dispatch = useAppDispatch()
  const { taskBeingEdited, asyncStatus } = useSelector((state: AppState) => state.calendar)
  const { groups, colors } = useSelector((state: AppState) => state.settings)
  const [selectedGroup, setSelectedGroup] = useState(groups.find(x => x.name === taskBeingEdited.group))
  const { _id, time, name, group } = taskBeingEdited
  const accentColor = selectedGroup ? colors[selectedGroup.colorId] : undefined
  const timestamp = taskBeingEdited?.timestamp

  const onRemoveTask = () => dispatch(actions.removeTaskRequested({ _id, timestamp }))

  const onSubmit: SubmitHandler<CalendarFormValues> = (data): any => {
    const { name, from, to } = data
    return dispatch(
      // TODO: name being redeclared but linter not complaining. FIX LINTING
      actions.saveTaskRequested({
        _id,
        name,
        group: selectedGroup.name,
        time: [Number(from), Number(to)],
        timestamp,
      }),
    )
  }
  const { register, handleSubmit, watch, errors } = useForm<CalendarFormValues>()
  const watchedFields = watch()
  const hasValidationErrors = Object.entries(errors).length > 0

  useEffect(() => {
    if (Object.values(watchedFields).every(x => !x)) return

    const formfieldsMapped = {
      _id,
      timestamp,
      name: watchedFields.name,
      group: selectedGroup.name,
      time: [Number(watchedFields.from), Number(watchedFields.to)]
    }
    dispatch(actions.editTaskReplaceValues(formfieldsMapped))
  }, [watchedFields.name, watchedFields.from, selectedGroup.name, watchedFields.to])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        isInForm
        defaultValue={name}
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
          isDisabled={hasValidationErrors}
          accentColor={accentColor}
          type="submit"
          asyncStatus={asyncStatus.saveTask}
        >
          Save task
        </Button>

        <RemoveButton asyncStatus={asyncStatus.removeTask}>
          <RemoveSvg theme="light" svg={binSvg} onClick={onRemoveTask} />
        </RemoveButton>
      </ModalFooter>
    </Form>
  )
}

export default memo(EditCalendarTask)
