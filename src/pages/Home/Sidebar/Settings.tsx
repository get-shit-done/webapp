import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { TextField } from '../../../components/form'
import Button from '../../../components/Button/component'
import binSvg from '../../../assets/svg/bin.svg'
import Svg from '../../../components/Svg/component'
import { useAppDispatch, AppState } from '../../../Application/Root'
import { useSelector } from 'react-redux'
import { actions } from '../../../reducers/settings'
import Colorpicker from '../../../components/Colorpicker/component'

const Form = styled.form`
  margin-bottom: var(--size-md);
`
const Groups = styled.div`
  position: relative;
`
const Group = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  padding: var(--size-xsm) 0;
  cursor: pointer;
  line-height: 1.5;

  &:hover {
    font-weight: bold;
    color: ${p => p.color};
  };
`
const Actions = styled.div`
  /* display: flex;
  position: absolute;
  right: 0; */
`
const Remove = styled(Svg)`
  margin-left: var(--size-lg);
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
`

const Settings: FC = () => {
  const dispatch = useAppDispatch()
  const { defaultHoursFrom, defaultHoursTo, colors, groups } = useSelector((state: AppState) => state.settings)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data: any) => {
    const dataMapped = {
      defaultHoursFrom: Number(data.defaultHoursFrom),
      defaultHoursTo: Number(data.defaultHoursTo)
    }
    dispatch(actions.updateSettings(dataMapped))
  }

  const onRemoveGroup = (id: string) => {
    dispatch(actions.removeGroup({ id }))
  }

  const onColorSelect = ({ selectedColor: { colorId }, id }: { selectedColor: { colorId: string }, id: string }) => {
    dispatch(actions.updateGroup({ groupId: id, colorId }))
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

      <br /><br />

      <Groups>
        {groups.map(({ id, name, colorId }) => {
          return (
            <Group key={id} color={colors[colorId]}>
              <Colorpicker
                selectedColorValue={colors[colorId]}
                label={name}
                setSelectedColor={(selectedColor) => onColorSelect({ selectedColor, id })}
              />
              <Actions>
                <Remove isDanger theme="light" svg={binSvg} onClick={() => onRemoveGroup(id)} />
              </Actions>
            </Group>
          );
        })}
      </Groups>

      <br /><br />

      <Button type="submit">
        save
      </Button>
    </Form>
  )
}

export default Settings
