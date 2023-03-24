import React from 'react';
import AttachmentForm from './components/AttachmentForm';
import Tasks from './components/Tasks';
import axios from './axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './components/Column';

export const ModalContext = React.createContext();
export const TasksContext = React.createContext();

function App() {
  const [modal, setModal] = React.useState(false);
  const [modalId, setModalId] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);

  const handleModal = (modal, id) => {
    setModal(modal);
    setModalId(id);
  };

  const fetchTasks = async () => {
    return;
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

  return (
    <TasksContext.Provider value={{ tasks, fetchTasks }}>
      <ModalContext.Provider value={{ modal, id: modalId, setModal: handleModal }}>
        <div>
          <DndProvider backend={HTML5Backend}>
            <Column tasks={tasks} />
          </DndProvider>
        </div>
        {/* <AttachmentForm /> */}
        <AttachmentForm />
      </ModalContext.Provider>
    </TasksContext.Provider>
  );
}

export default App;
