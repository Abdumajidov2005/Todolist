import React from "react";
import "./Modal.css";
import { FaXmark } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
import { Form } from "react-router-dom";

function Modal({
  setModal,
  addData,
  setIsDone,
  setSarlavha,
  sarlavha,
  isDone,
  setIzoh,
  izoh,
}) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addData();
          setModal(false);
        }}
        className="modal-info"
      >
        <div className="container">
          <p
            className="x-mark"
            onClick={() => {
              setModal(false);
            }}
          >
            <FaXmark />
          </p>
          <h2>Create Plan</h2>
          <div className="information">
            <input
              value={sarlavha}
              onChange={(e) => {
                setSarlavha(e.target.value);
              }}
              type="text"
              placeholder="Sarlavha"
            />
            <input
              value={izoh}
              onChange={(e) => {
                setIzoh(e.target.value);
              }}
              type="text"
              placeholder="Izoh"
            />
            <div className="cheking-plan">
              <label htmlFor="">Bajarildimi:</label>
              <input
                checked={isDone}
                onChange={() => {
                  setIsDone(!isDone);
                }}
                type="checkbox"
              />
            </div>
            <button
              onClick={() => {
                setModal(false);
              }}
            >
              Submit <IoSendSharp />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Modal;
