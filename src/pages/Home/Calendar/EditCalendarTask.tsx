import React, { useState, memo, FC } from 'react'
import { useSelector } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'
import styled from 'styled-components'
import TextField from '../../../components/form/Field/component'
import Button from '../../../components/Button/component'
import Dropdown from '../../../components/form/Dropdown'
import binSvg from '../../../assets/svg/bin.svg'
import Svg from '../../../components/Svg/component'
import { actions, TaskWithMeta } from '../../../reducers/calendar'
import { AppState, useAppDispatch } from '../../../Application/Root'
import { ModalFooter } from '../../../components/Modal'

const Form = styled.form``

interface Props {
  timestamp: string
  taskBeingEdited: TaskWithMeta
}
type FormValues = {
  name: string
  to: number
  from: number
}
const Remove = styled(Svg)`
  margin-left: var(--size-xlg);
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
`

// TODO: timestamp should come from taskBeingEdited
const EditCalendarTask: FC<Props> = ({ timestamp, taskBeingEdited }) => {
  const dispatch = useAppDispatch()
  const { groups, colors } = useSelector((state: AppState) => state.settings)
  const [selectedGroup, setSelectedGroup] = useState(groups.find(x => x.name === taskBeingEdited.group))
  const { _id, time, name, group } = taskBeingEdited
  const accentColor = selectedGroup ? colors[selectedGroup.colorId] : undefined
  const onRemoveTask = () => dispatch(actions.removeTaskRequested({ _id, timestamp }))

  const onSubmit: SubmitHandler<FormValues> = (data): any =>
    dispatch(
      actions.saveTaskRequested({
        _id,
        group: selectedGroup.name,
        time: [Number(data.from), Number(data.to)],
        timestamp,
      }),
    )

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      from: time[0],
      to: time[1],
      name,
      group,
    },
  })

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
        <Button isDisabled={Object.entries(errors).length > 0} accentColor={accentColor} type="submit">
          Save task
        </Button>

        <Remove isDanger theme="light" svg={binSvg} onClick={onRemoveTask} />
      </ModalFooter>
    </Form>
  )
}

export default memo(EditCalendarTask)
