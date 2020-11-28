import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { TextField } from '../../../components/form'
import { DumbButton } from '../../../components/Button'
import binSvg from '../../../assets/svg/bin.svg'
import Svg, { styleDangerHover } from '../../../components/Svg/component'
import { useAppDispatch, AppState } from '../../../Application/Root'
import { useSelector } from 'react-redux'
import { actions, IGroup } from '../../../reducers/settings'
import Colorpicker from '../../../components/Colorpicker/component'
import { useUpdateGroup } from '../hooks/useHome'

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
  ${styleDangerHover};
`

interface IProps {
  customProps: { groups: IGroup[] }
}

const Settings: FC<IProps> = ({ customProps: { groups = [] } }) => {
  const [editMutate] = useUpdateGroup()
  const dispatch = useAppDispatch()
  const { defaultHoursFrom, defaultHoursTo, colors } = useSelector((state: AppState) => state.settings)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data: any) => {
    const dataMapped = {
      defaultHoursFrom: Number(data.defaultHoursFrom),
      defaultHoursTo: Number(data.defaultHoursTo)
    }
    dispatch(actions.updateSettings(dataMapped))
  }

  const onRemoveGroup = (_id: string) => {
    dispatch(actions.removeGroup({ _id }))
  }

  const onColorSelect = ({ selectedColor: { colorId }, _id }: { selectedColor: { colorId: string }, _id: string }) => {
    // dispatch(actions.updateGroupRequested({ groupId: _id, colorId }))
    editMutate({ groupId: _id, colorId })
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
        {groups.map(({ _id, name, colorId }) => {
          return (
            <Group key={_id} color={colors[colorId]}>
              <Colorpicker
                selectedColorValue={colors[colorId]}
                label={name}
                setSelectedColor={(selectedColor) => onColorSelect({ selectedColor, _id })}
              />
              <Actions>
                <Remove theme="light" svg={binSvg} onClick={() => onRemoveGroup(_id)} />
              </Actions>
            </Group>
          );
        })}
      </Groups>

      <br /><br />

      <DumbButton type="submit">
        save
      </DumbButton>
    </Form>
  )
}

export default Settings
