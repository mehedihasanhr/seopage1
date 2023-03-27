import React from 'react';
import AttachmentForm from './components/AttachmentForm';

import axios from './axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Columns from './components/Columns';
import { columns } from './data';

export const ModalContext = React.createContext();
export const TasksContext = React.createContext();

function App() {
  const [modal, setModal] = React.useState(false);
  const [modalId, setModalId] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);
  const [cols, setCols] = React.useState([]);

  React.useEffect(()=> {
    let c = localStorage.getItem("column");
    if(c){
      setCols(JSON.parse(c));
      return;
    }
    setCols(columns);
  }, [])

  const handleModal = (modal, id) => {
    setModal(modal);
    setModalId(id);
  };

  const fetchTasks = async () => {
    await axios
      .get('/upload-attachment')
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetchTasks();
    return () => fetchTasks();
  }, []);

  const handleColumMove = (i, colI) => {

    let i1 = cols[i];
    let i2 = cols[colI];
    let o = {...cols}
    o[colI] = i1;
    o[i] = i2;

    console.log(o)
    setCols(o);

    localStorage.setItem('column', JSON.stringify(o));
}

  return (
    <TasksContext.Provider value={{ tasks, fetchTasks }}>
      <ModalContext.Provider value={{ modal, id: modalId, setModal: handleModal }}>
        <div>
          <DndProvider backend={HTML5Backend}>
            <Columns tasks={tasks}  handleColumMove={handleColumMove} columns={cols}/>
          </DndProvider>
        </div>
        {/* <AttachmentForm /> */}
        <AttachmentForm />
      </ModalContext.Provider>
    </TasksContext.Provider>
  );
}

export default App;
