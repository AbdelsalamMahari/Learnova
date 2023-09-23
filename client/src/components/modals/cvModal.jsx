// CVModal.js
import React from "react";

const CVModal = ({ isOpen, closeModal, cvUrl }) => {
  return (
    <div
      className={`fixed inset-0 ${isOpen ? "" : "hidden"} flex items-center justify-center`}
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-close cursor-pointer p-4">
          <svg
            className="fill-current h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            onClick={closeModal}
          >
            <path
              className="text-gray-600"
              d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="modal-content py-4 text-left px-6">
          <embed src={cvUrl} type="application/pdf" width="100%" height="500" />
        </div>
      </div>
    </div>
  );
};

export default CVModal;
