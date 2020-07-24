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
const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--size-xlg);
`
const Remove = styled(Svg)`
  margin-left: var(--size-xlg);
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
`

// TODO: timestamp should come from taskBeingEdited
const EditCalendarTask: FC<Props> = ({ timestamp, taskBeingEdited }) => {
  const dispatch = useAppDispatch()
  const [selectedGroup, setSelectedGroup] = useState(taskBeingEdited.group)
  const { groups, colors } = useSelector((state: AppState) => state.settings)
  const { _id, time, name, group } = taskBeingEdited
  const colorId = groups.find(x => x.name === taskBeingEdited.group).colorId
  console.log('colorIdcolorId', colorId)
  const onRemoveTask = () => dispatch(actions.removeTaskRequested({ _id, timestamp }))

  const onSubmit: SubmitHandler<FormValues> = (data): any =>
    dispatch(
      actions.saveTaskRequested({
        _id,
        group: taskBeingEdited.group,
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

      {/* hacked this hard. redo the group and coloring entirely */}
      {/* <Dropdown
        isInForm
        theme="light"
        label="select group"
        list={groups}
        listKey="name"
        activeItem={groups.find(x => x.name === group)}
        // @ts-ignore
        onSelect={group => setSelectedGroup(group)}
        inputRef={register({ required: true, maxLength: 80 })}
      /> */}
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
      <Footer>
        <Button isDisabled={Object.entries(errors).length > 0} accentColor={colors[colorId]} type="submit">
          Save task
        </Button>

        <Remove isDanger theme="light" svg={binSvg} onClick={onRemoveTask} />
      </Footer>
    </Form>
  )
}

export default memo(EditCalendarTask)
