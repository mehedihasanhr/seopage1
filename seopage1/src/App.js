import React from 'react';
import AttachmentForm from './components/AttachmentForm';
import Tasks from './components/Tasks';
import axios from './axios';

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
        <div className="h-screen flex overflow-x-auto overflow-y-hidden gap-3 vertical-scrollbar p-4">
          <Tasks color="bg-red-500" boxTitle="Incomplete" tasks={tasks} />
          <Tasks color="bg-sky-500" boxTitle="To Do" tasks={tasks} />
          <Tasks color="bg-yellow-500" boxTitle="Doing" tasks={tasks} />
          <Tasks boxTitle="Under Review" tasks={tasks} />
          <Tasks boxTitle="Completed" tasks={tasks} />
          <Tasks boxTitle="Overdue" tasks={tasks} />
        </div>

        {/* <AttachmentForm /> */}
        <AttachmentForm />
      </ModalContext.Provider>
    </TasksContext.Provider>
  );
}

export default App;
