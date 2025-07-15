import { CiCirclePlus } from "react-icons/ci";
import "./App.css";
import { FaPencil } from "react-icons/fa6";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Modal from "./components/modal/Modal";
import { getData } from "./services/app";
import { baseUrl } from "./config";

function App() {
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getData()?.then((data) => {
      setData(data);
    });
  }, []);

  const delData = (id) => {
    setLoadDelet(true);
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${baseUrl}/rejalar/${id}/`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        getData()?.then(setData);
        setLoadDelet(false);
        return result;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  const [loadDelet, setLoadDelet] = useState(false);

  return (
    <>
      {loadDelet && (
        <div className="delete-loader-backdrop">
          <div className="delete-loader"></div>
        </div>
      )}
      <div className={`modal-oyna ${modal ? "active" : ""}`}>
        <Modal
          setModal={setModal}
          setData={setData}
          editId={editId}
          setEditId={setEditId}
        />
      </div>
      <ul class="bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li>Frontend Developer</li>
        <li></li>
        <li></li>
        <li>Abdumajidov O'tkirbek</li>
      </ul>
      <nav>
        <div className="container">
          <div className="logo">
            <div className="imgs-todo">
              <img src="/imgs/todo.png" alt="" />
            </div>
            <h1>My Plans</h1>
          </div>
          <div className="icons">
            <button
              onClick={() => {
                setModal(true);
              }}
            >
              Create <CiCirclePlus />
            </button>
          </div>
        </div>
      </nav>
      <div className="hero">
        <div className="container">
          {data === null ? (
            <div className="gif-load">
              <div className="card">
                <div className="animate-titles-borders">
                  <div className="animate-titles"></div>
                  <div className="animate-comment"></div>
                  <div className="animate-date"></div>
                </div>
                <div className="animate-icons">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="card">
                <div className="animate-titles-borders">
                  <div className="animate-titles"></div>
                  <div className="animate-comment"></div>
                  <div className="animate-date"></div>
                </div>
                <div className="animate-icons">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
               <div className="card">
                <div className="animate-titles-borders">
                  <div className="animate-titles"></div>
                  <div className="animate-comment"></div>
                  <div className="animate-date"></div>
                </div>
                <div className="animate-icons">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
               <div className="card">
                <div className="animate-titles-borders">
                  <div className="animate-titles"></div>
                  <div className="animate-comment"></div>
                  <div className="animate-date"></div>
                </div>
                <div className="animate-icons">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          ) : !data.length ? (
            <div className="gif-load">Ma'lumot topilmadi.</div>
          ) : (
            data?.map((item, index) => {
              return (
                <div key={index} className="box">
                  <div className="box-info">
                    <h1>{item?.sarlavha}</h1>
                    <p>{item?.izoh}</p>
                    <h4>{item?.sana}</h4>
                  </div>
                  <div className="box-icons">
                    <input checked={item?.bajarildi} type="checkbox" readOnly />
                    <p>
                      <FaPencil
                        onClick={() => {
                          setModal(true);
                          setEditId(item?.id);
                        }}
                      />
                    </p>
                    <p>
                      <BsFillTrash3Fill
                        onClick={() => {
                          delData(item?.id);
                        }}
                      />
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default App;
