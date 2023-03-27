
import Tasks from './Tasks';
import {columns} from '../data'
import { useState } from 'react';
import { tasks } from '../data';
import { useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';


const Columns = ({columns=[], handleColumMove}) => {
    const [cols, setCols] = useState([]);
    const [data, setData] = useState(tasks);
    useEffect(() => {
        let d = localStorage.getItem('data');
        if(d){
            setData(JSON.parse(d));
            return;
        }
        setData(tasks);
    } , []);

    useEffect(() => {
        setCols(columns)
    }, [columns])

    const handleDrop = (t, i) => {
        let s = t.replace(/\s/g, '');
        let idx = data?.indexOf(i);
        let d = [...data];

        

        d[idx]  = {...i, status: s}
        localStorage.setItem("data", JSON.stringify(d));
        setData(d)
    }

    const colors = ["bg-red-500", "bg-sky-500", "bg-yellow-500", "bg-green-500", "bg-purple-500", "bg-orange-500"];

    let colsVal = Object.values(cols)

    return (
        <div  className="h-screen flex overflow-x-auto overflow-y-hidden gap-3 vertical-scrollbar p-4">
            {
                colsVal?.map((col, index) => (
                    <Tasks key={index} colI={index} color={colors[index]} boxTitle={col} handleDrop={handleDrop} data={data}  handleColumMove={handleColumMove} />
                ))
            }
        </div>
    )
}

export default Columns