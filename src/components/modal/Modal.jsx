import React, { useEffect, useState } from "react";
import "./Modal.css";
import { FaXmark } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";
import { baseUrl } from "../../config";
import { getData } from "../../services/app";

function Modal({ setModal, setData, editId, setEditId }) {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isDone, setIsDone] = useState(false);

  const createPlan = () => {
    setLoadingInput(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      sarlavha: title,
      izoh: comment,
      bajarildi: isDone,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/rejalar/`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        getData()?.then(setData);
        setTitle("");
        setComment("");
        setIsDone(false);
        setModal(false);
        setEditId(null);
        setLoadingInput(false);
        return result;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  const getEditPlan = () => {
    setLoadInput(true);
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${baseUrl}/rejalar/${editId}/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTitle(result?.sarlavha);
        setComment(result?.izoh);
        setIsDone(result?.bajarildi);
        setLoadInput(false);
        return result;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  const getUpdateData = () => {
    setEditUpdate(true)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      sarlavha: title,
      izoh: comment,
      bajarildi: isDone,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/rejalar/${editId}/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        getData()?.then(setData);
        setEditId(null);
        setTitle("");
        setComment("");
        setIsDone(false);
        setModal(false);
        setEditUpdate(false)
        return result;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  useEffect(() => {
    if (editId !== null) {
      getEditPlan();
    }
  }, [editId]);

  const [loadInput, setLoadInput] = useState(false);
  const [loadingInput, setLoadingInput] = useState(false);
  const [editUpdata, setEditUpdate] = useState(false);  

  return (
    <>
      {loadingInput || editUpdata ? (
        <div className="grud">
          <div className="grud-loaders"></div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editId) {
              getUpdateData();
            } else {
              createPlan();
            }
          }}
          className="modal-info"
        >
          <div className="container">
            <p
              className="x-mark"
              onClick={() => {
                setModal(false);
                setEditId(null);
                setTitle("");
                setComment("");
                setIsDone(false);
              }}
            >
              <FaXmark />
            </p>
            <h2>{editId ? "Update Plan" : "Create Plan"}</h2>
            <div className="information">
              {loadInput ? (
                <div className="load-input"></div>
              ) : (
                <input
                  type="text"
                  placeholder="Sarlavha"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              )}

              {loadInput ? (
                <div className="load-input"></div>
              ) : (
                <input
                  type="text"
                  placeholder="Izoh"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              )}

              <div className="cheking-plan">
                <label htmlFor="">Bajarildimi:</label>
                {loadInput ? (
                  <div className="load-inputs"></div>
                ) : (
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => {
                      setIsDone(!isDone);
                    }}
                  />
                )}
              </div>
              <button>
                {editId == null ? "submit" : "update"}
                <IoSendSharp />
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default Modal;
