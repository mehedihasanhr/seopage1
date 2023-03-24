import { useState } from 'react';
import { useDrop } from 'react-dnd';
import Tasks from './Tasks';

const Column = ({tasks}) => {
    const [cols, setCols] = useState({
        'col-1': 3,
        'col-2': 2,
        'col-3': 4, 
        'col-4': 4, 
        'col-5': 4, 
        'col-6': 4, 
    })
    const [{isHover}, drop] = useDrop({
        accept: "task container",
        drop: () => ({name: 'task container',}),
    });

    const handleCol = (v, i) => {
        const c = `col-${i}`;
        let o = {...cols}
        o[v] = o[v] + 1; 
        o[c] = o[c] -1; 
        
    
        setCols(o)
    }

    const handleSetItems = (v, i) => {
        return;
        
       
    }
    return (
        <div ref={drop} className="h-screen flex overflow-x-auto overflow-y-hidden gap-3 vertical-scrollbar p-4">
            <Tasks color="bg-red-500" boxTitle="Incomplete" tasks={tasks} col={1} handleCol={handleCol} items={cols['col-1']} setItems={handleSetItems}/>
            <Tasks color="bg-sky-500" boxTitle="To Do" tasks={tasks} col={2} handleCol={handleCol} items={cols['col-2']} setItems={handleSetItems}/>
            <Tasks color="bg-yellow-500" boxTitle="Doing" tasks={tasks} col={3} handleCol={handleCol} items={cols['col-3']} setItems={handleSetItems}/>
            <Tasks boxTitle="Under Review" tasks={tasks} col={4} handleCol={handleCol} items={cols['col-4']} setItems={handleSetItems}/>
            <Tasks boxTitle="Completed" tasks={tasks} col={5} handleCol={handleCol} items={cols['col-5']} setItems={handleSetItems}/>
            <Tasks boxTitle="Overdue" tasks={tasks} col={6} handleCol={handleCol} items={cols['col-6']} setItems={handleSetItems}/>
        </div>
    )
}

export default Column