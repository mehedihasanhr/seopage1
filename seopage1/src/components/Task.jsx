import { useContext } from 'react';
import { FaClipboardList, FaLayerGroup, FaLink } from 'react-icons/fa';
import { IoCalendarOutline, IoChatbubblesOutline } from 'react-icons/io5';
import { ModalContext } from '../App';
import { useDrag } from 'react-dnd';

const Task = ({ data, ct,  id, attachCount }) => {
  const { setModal } = useContext(ModalContext);
  const [{opacity}, drag] = useDrag({
    item: data,
    type: "task",
    collect: m => ({
      opacity: m.isDragging ? .5 : 1
    }),
  });

 
  return (
    <div ref={drag} className={`bg-white p-3 rounded-lg transition-all duration-300 ${opacity}`}>
      {/* card-head */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="avatar.jpg" alt="avatar" className="w-8 h-8 rounded-full" />
          <span className="font-semibold">Client Name </span>
        </div>

        <div className="flex items-center space-x-3">
          <img src="avatar2.jpg" alt="avatar" className="w-8 h-8 rounded-full" />
          <span className="font-semibold">Sadik Istiak</span>
        </div>
      </div>

      {/* card-body */}
      <div className="flex items-center gap-12 text-gray-500 py-2">
        <div className="flex items-center space-x-2">
          <FaLayerGroup />
          <span className="line-clamp-1">Lorem ipsum dolor sit, amet consectetur</span>
        </div>

        <div className="flex items-center space-x-2 py-0.5 px-2 bg-gray-100">
          <FaClipboardList />
          <span>1/2</span>
        </div>
      </div>

      {/* card-footer */}
      <div className="flex items-center justify-between">
        {/* collaborator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-3">
            <img src="avatar.jpg" alt="avatar" className="w-8 h-8 rounded-full" />
          </div>

          <div className="flex items-center space-x-3">
            <img src="avatar2.jpg" alt="avatar" className="w-8 h-8 rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-3 ml-3 text-sm font-semibold text-gray-600">
          <div className="text-sm flex items-center justify-center rounded-full w-7 h-7 bg-slate-100">12+</div>

          <div className="flex items-center gap-1">
            <IoChatbubblesOutline />
            <span>2</span>
          </div>

          <div className="flex items-center gap-1 hover:cursor-pointer" onClick={() => setModal(true, id)}>
            <FaLink />
            <span>{attachCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <IoCalendarOutline />
            <span>30-12-2021</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Task;
