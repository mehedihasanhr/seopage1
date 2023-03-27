import Modal from './Modal';
import React from 'react';
import { ModalContext, TasksContext } from '../App';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from '../axios';

const AttachmentForm = ({ attachment, onAttachmentChange }) => {
  const { modal, id, setModal } = React.useContext(ModalContext);
  const { fetchTasks } = React.useContext(TasksContext);
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const close = () => {
    setFiles([]);
    setModal(false, null);
  };

  // handle files
  const handleFiles = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    setFiles(filesArray);
  };

  // upload files
  const uploadFiles = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert('Please upload a file');
      return;
    }
    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files[]', file);
    });
    try {
      await axios
        .post('/upload-attachment', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          setLoading(false);
          close();
          fetchTasks();
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal open={modal} close={close}>
      <div className="w-[550px] max-h-[700px] p-4 shadow-lg bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
        {/* close */}
        <button
          aria-label="close"
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
          onClick={close}
        >
          &times;
        </button>
        <div className="flex items-center justify-between flex-col text-center">
          <div className="text-xl font-semibold text-center w-full">Add Attachment</div>
          <p className="text-sm text-gray-500">Upload documents to help you and your team members.</p>
        </div>

        {/* form */}
        <form className="mt-5">
          <div className="w-full h-48 border border-dashed relative overflow-hidden">
            {/* upload icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <FaCloudUploadAlt className="text-7xl text-gray-400 mx-auto" />
                <p className="text-gray-400 mt-1">Drag and drop your files here</p>
                <p className="text-gray-400">or</p>
                <p className="text-gray-400">
                  <span className="text-blue-500">browse</span> files
                </p>
              </div>
            </div>

            {/* file upload */}
            <input
              type="file"
              name="file"
              id="file"
              multiple
              onChange={handleFiles}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </form>

        {/* upload file list */}

        <div className="flex flex-col items-center py-3 gap-3">
          {files.length > 0 && <h4 className="mr-auto font-bold text-gray-400">Files</h4>}
          <div className="flex flex-col items-center py-3 gap-3 w-full max-h-[200px] overflow-y-auto">
            {files.map((file) => (
              <div
                key={`${file.name}-${Math.random()}}`}
                className="flex items-center justify-between w-full bg-slate-50 hover:bg-slate-100 px-4 py-2.5"
              >
                <span className="block font-semibold text-gray-600 line-clamp-2 text-sm">{file.name}</span>
                <span className="text-sm">{file.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* buttons */}
        <div className="flex items-center justify-end gap-3 mt-5">
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded" onClick={close}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded" onClick={uploadFiles}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AttachmentForm;
