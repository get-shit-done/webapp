import React, { FC, useRef, useCallback } from "react";
import styled from "styled-components";
import isToday from "date-fns/isToday";

import { useSelector } from "react-redux";
import CalendarColumn from "./CalendarColumn";
import { AppState, useAppDispatch } from "../../../Application/Root";
import { makeDaysAxis, makeHoursAxis, makeAllTasksByDayMapped } from "../../../selectors";
import { determinePlaceholderHeight, getAsyncStatus } from "../../../utils";
import { Modal } from "../../../components/Modal";
import EditCalendarTask from "./EditCalendarTask";
import { actions, IAllTasksByDay } from "../../../reducers/calendar";
import AddNewCalendarTask from "./AddNewCalendarTask";
import { SpinnerLoader, LoaderSvg } from "../../../components/Loader";
import { IGroup } from "../../../reducers/settings";
import { useGetTasksQuery } from "../../../api";

const Wrap = styled.div<{ scale: { x: number; y: number; duration: number } }>`
  position: relative;
  display: flex;
  flex-grow: 1;
  transform-origin: bottom right;
  transition: transform ${p => p.scale.duration}s var(--transition-type);
  transform: ${p => `scale(${p.scale.x}, ${p.scale.y})`};
`;
const CalendarLoader = styled(SpinnerLoader)`
  ${LoaderSvg} {
    padding: var(--size-sm);
    border: 1px solid #eee;
    border-radius: 50%;
    background-color: #fff;
  } ;
`;

interface PropsColumn {
  wrapRef: React.MutableRefObject<any>;
  groups: IGroup[];
  allTasksByDay: IAllTasksByDay;
}
const CalendarColumns: FC<PropsColumn> = ({ wrapRef, allTasksByDay, groups }) => {
  const daysAxis = useSelector(makeDaysAxis);
  const hoursAxis = useSelector(makeHoursAxis);
  const allTasksByDayMapped = useSelector(state => makeAllTasksByDayMapped({ state, hoursAxis, allTasksByDay }));
  const placeholderHeight = determinePlaceholderHeight({ wrapRef, hoursAxis });
  // console.log('COMP: CalendarColumns', allTasksByDayMapped)

  return (
    <>
      {daysAxis.map(timestamp => (
        <CalendarColumn
          key={timestamp}
          isCurrentDay={isToday(new Date(timestamp))}
          timestamp={timestamp}
          tasksFiltered={allTasksByDayMapped[timestamp]}
          placeholderHeight={placeholderHeight}
          groups={groups}
        />
      ))}
    </>
  );
};

interface Props {
  scale: {
    x: number;
    y: number;
    duration: number;
  };
  allTasksByDay: IAllTasksByDay;
  groups: IGroup[];
}

const Calendar: FC<Props> = ({ scale, allTasksByDay, groups }) => {
  const wrapRef = useRef(null);
  const dispatch = useAppDispatch();
  const { isLoading } = useGetTasksQuery(undefined);
  const taskBeingEdited = useSelector((state: AppState) => state.calendar.taskBeingEdited);
  const taskBeingPrepared = useSelector((state: AppState) => state.calendar.taskBeingPrepared);

  const onRemovePreparedTask = useCallback(() => {
    dispatch(actions.removePreparedTask());
    dispatch(actions.resetAsyncStatus());
  }, []);
  const onEditTaskCancel = useCallback(() => {
    dispatch(actions.editTaskCancel());
    dispatch(actions.resetAsyncStatus());
  }, []);

  return (
    <Wrap scale={scale} ref={wrapRef}>
      <CalendarLoader size={10} isLoading={isLoading} />
      <CalendarColumns wrapRef={wrapRef} allTasksByDay={allTasksByDay} groups={groups} />

      {taskBeingEdited && (
        <Modal title='task details' width={17} onOverlayToggle={onEditTaskCancel}>
          <EditCalendarTask groups={groups} />
        </Modal>
      )}

      {taskBeingPrepared && (
        <Modal title='task details' width={17} onOverlayToggle={onRemovePreparedTask}>
          <AddNewCalendarTask groups={groups} />
        </Modal>
      )}
    </Wrap>
  );
};

export default Calendar;
