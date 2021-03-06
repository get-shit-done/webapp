import React, { useState, memo, FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { TextField, Dropdown } from "../../../components/form";
import binSvg from "../../../assets/svg/bin.svg";
import Svg, { styleDangerHover } from "../../../components/Svg/component";
import { actions, IAllTasksByDay, SavedTask } from "../../../reducers/calendar";
import { AppState, useAppDispatch } from "../../../Application/Root";
import { ModalFooter } from "../../../components/Modal";
import { CalendarFormValues } from "./shared";
import { AsyncButton, AsyncSvgButton } from "../../../components/Button";
import { IGroup } from "../../../reducers/settings";
import { useSaveTaskMutation, useRemoveTaskMutation, tasksApi } from "../../../api";

const Form = styled.form``;

const RemoveButton = styled(AsyncSvgButton)`
  margin-left: var(--size-xlg);
`;
const RemoveSvg = styled(Svg)`
  ${styleDangerHover};
`;

interface IProps {
  groups: IGroup[];
}

// TODO: timestamp should come from taskBeingEdited
const EditCalendarTask: FC<IProps> = ({ groups }) => {
  const [updateTask, asyncStatusUpdate] = useSaveTaskMutation();
  const [removeTask, removeTaskStatus] = useRemoveTaskMutation()
  const { taskBeingEdited } = useSelector((state: AppState) => state.calendar);
  const dispatch = useAppDispatch();
  const { colors } = useSelector((state: AppState) => state.settings);
  const [selectedGroup, setSelectedGroup] = useState(groups.find(x => x.name === taskBeingEdited.group));
  const { _id, time, name, group } = taskBeingEdited;
  const accentColor = selectedGroup ? colors[selectedGroup.colorId] : undefined;
  const timestamp = taskBeingEdited?.timestamp;

  const onSubmit: SubmitHandler<CalendarFormValues> = (data): any => {
    const { name, from, to } = data;
    return updateTask({
      _id,
      name,
      group: selectedGroup.name,
      time: [Number(from), Number(to)],
      timestamp,
    });
  };
  const { register, handleSubmit, watch, errors } = useForm<CalendarFormValues>();
  const watchedFields = watch();
  const hasValidationErrors = Object.entries(errors).length > 0;

  useEffect(() => {
    if (Object.values(watchedFields).every(x => !x)) return;

    const formfieldsMapped: SavedTask = {
      _id,
      timestamp,
      name: watchedFields.name,
      group: selectedGroup.name,
      time: [Number(watchedFields.from), Number(watchedFields.to)],
    };

    dispatch(tasksApi.util.updateQueryResult("getTasks", undefined, draft => {
      const taskToUpdate = draft[timestamp].tasks.find((x:any) => x._id === _id);
      for (const x in taskToUpdate) {
        taskToUpdate[x] = formfieldsMapped[x];
      }
    }));
    dispatch(actions.updateEditedTask(formfieldsMapped));
  }, [watchedFields.name, watchedFields.from, selectedGroup.name, watchedFields.to]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        isInForm
        defaultValue={name}
        theme='light'
        name='name'
        placeholder='name'
        errorMessage={errors.name?.type}
        inputRef={register({ required: true, maxLength: 80 })}
      />

      <Dropdown
        isInForm
        theme='light'
        label='select group'
        activeGroup={selectedGroup}
        groups={groups}
        onSelect={group => setSelectedGroup(group)}
        inputRef={register({ required: true, maxLength: 80 })}
      />
      <TextField
        isInForm
        defaultValue={time[0]}
        theme='light'
        name='from'
        placeholder='time from'
        errorMessage={errors.from?.type}
        inputRef={register({ required: true, maxLength: 80 })}
      />
      <TextField
        isInForm
        defaultValue={time[1]}
        theme='light'
        name='to'
        placeholder='time to'
        errorMessage={errors.to?.type}
        inputRef={register({ required: true, maxLength: 80 })}
      />
      <ModalFooter>
        <AsyncButton
          isDisabled={hasValidationErrors}
          accentColor={accentColor}
          type='submit'
          asyncStatuses={[asyncStatusUpdate]}>
          Save task
        </AsyncButton>

        <RemoveButton tooltipPosition='right' asyncStatuses={[removeTaskStatus]}>
          <RemoveSvg theme='light' svg={binSvg} onClick={() => removeTask(taskBeingEdited)} />
        </RemoveButton>
      </ModalFooter>
    </Form>
  );
};

export default memo(EditCalendarTask);
