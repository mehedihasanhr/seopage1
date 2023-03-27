import React, { useEffect } from 'react';
import Task from './Task';
import { useDrag, useDrop } from 'react-dnd';
import { useContext } from 'react';
import { TasksContext } from '../App';
import { useState } from 'react';
import TaskMoveModal from './TaskMoveModal';

const Tasks = ({ colI, data, handleColumMove, handleDrop, color = '', boxTitle }) => {
  const { tasks } = useContext(TasksContext);
  const [moveTaskData, setMoveTaskData] = useState({});
  const [taskModalOpen, setTaskModalOpen] = useState({
    open: false,
    status: 'idle',
  });

  const ct = data?.filter((t) => t.status.toLowerCase() === boxTitle.replace(/\s/g, '').toLocaleLowerCase());

  // column drag
  const [{ opacity }, colDragRef] = useDrag({
    type: 'column',
    item: {
      c: colI,
    },
    collect: (m) => ({
      opacity: m.isDragging ? 0.5 : 1,
    }),
    end: (i, m) => {
      let r = m.getItem();
      console.log(r);
    },
  });

  // task move confirmation
  const handleConfirmation = (boxTitle, i) => {
    let t = boxTitle.replace(/\s/g, '');
    setTaskModalOpen({
      open: true,
      status: 'panding',
    });

    setMoveTaskData({
      boxTitle,
      i,
    });
  };

  // task move
  const [{ isOver, canDrop }, dropTaskRef] = useDrop({
    accept: 'task',
    drop: (i, m) => {
      handleConfirmation(boxTitle, i);
    },
    collect: (m) => ({
      canDrop: m.canDrop(),
      isOver: m.isOver(),
    }),
  });

  // column drop
  const [_, drop] = useDrop({
    accept: 'column',
    drop: (i, m) => {
      handleColumMove(i.c, colI);
    },
  });

  // console.log({isOver, canDrop});

  return (
    <div ref={drop} className="max-h-full min-h-full">
      <div ref={colDragRef} className="py-4 px-1 bg-[#F2F4F7] min-w-[380px] text-sm max-h-full flex flex-col">
        <div className="flex items-center justify-between mb-5">
          {/* heading section */}
          <div className="flex items-center justify-between w-full px-3">
            <div className="flex items-center space-x-3">
              {color && <div className={`h-6 w-5 rounded-l-full block ${color}`} />}
              <div className="text-base font-medium"> {boxTitle} </div>
            </div>
            <div className="flex items-center justify-center font-bold text-base bg-gray-200 w-8 h-8 rounded">0</div>
          </div>
        </div>
        {/* add task section */}
        <div ref={dropTaskRef} className="flex flex-col gap-3 px-1 py-3 h-full overflow-y-auto min-h-[300px]">
          {ct.map((data, index) => (
            <Task key={index} data={data} attachCount={tasks.length} />
          ))}
          {taskModalOpen.open ? (
            <TaskMoveModal
              onSub={() => handleDrop(moveTaskData.boxTitle, moveTaskData.i)}
              close={() =>
                setTaskModalOpen({
                  open: false,
                  status: 'submit',
                })
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
