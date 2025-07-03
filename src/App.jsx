import { CiCirclePlus } from "react-icons/ci";
import "./App.css";
import { FaPencil } from "react-icons/fa6";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Modal from "./components/modal/Modal";
import { getData } from "./services/app";
import { baseUrl } from "./config";

function App() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    getData()?.then((data) => {
      setData(data);
    });
  }, []);

  const [sarlavha, setSarlavha] = useState("");
  const [izoh, setIzoh] = useState("");
  const [isDone, setIsDone] = useState(false);

  const addData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      sarlavha: sarlavha,
      izoh: izoh,
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
        console.log(result);
        setSarlavha("");
        setIzoh("");
        setIsDone(false);
        setModal(false);
        getData().then(setData);
      })

      .catch((error) => console.error(error));
  };

  const deleteData = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${baseUrl}/rejalar/${id}/`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        getData()?.then(setData)
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className={`modal-oyna ${modal ? "active" : ""}`}>
        <Modal
          addData={addData}
          setModal={setModal}
          sarlavha={sarlavha}
          setSarlavha={setSarlavha}
          izoh={izoh}
          setIzoh={setIzoh}
          setIsDone={setIsDone}
          isDone={isDone}
          edit={edit}
          setEdit={setEdit}
        />
      </div>
      <nav>
        <div className="container">
          <div className="logo">
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
          {data?.map((item, index) => {
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
                    <FaPencil onClick={()=>{
                       setModal(true)
                       setEdit(item.id)
                       console.log(item.id);
                       
                    }}/>
                  </p>
                  <p>
                    <BsFillTrash3Fill onClick={()=>{
                      deleteData(item.id)
                    }}/>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
