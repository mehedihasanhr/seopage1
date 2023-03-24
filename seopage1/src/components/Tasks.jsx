import React, { useEffect } from 'react';
import Task from './Task';
import axios from '../axios';
import { useDrag, useDrop } from 'react-dnd'

const Tasks = ({ tasks, color = '', boxTitle = 'Incomplete', col, handleCol, items, setItems }) => {
  const [ i, setI ] = React.useState(items);

  const [{canDrop, isOver}, drop] = useDrop({
    accept: "task",
    drop: () => ({name: `col-${col}`}),
    collect: mentor => ({
      isOver: mentor.isOver(),
      canDrop: mentor.canDrop()
    }),
    
  });

  const handleSetI = (v,id) => {
      setItems(v, id);
      handleCol(v, id);
    
  }



  // console.log({canDrop,isOver})

  return (
    <div className="py-4 px-1 bg-[#F2F4F7] min-w-[380px] text-sm max-h-full flex flex-col">
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
      <div ref={drop} className="flex flex-col gap-3 px-1 py-3 h-full overflow-y-auto">
        {[...Array(items)].map((_, index) => (
          <Task key={index} id={index} attachCount={tasks.length} setI={handleSetI} colID = {col} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
