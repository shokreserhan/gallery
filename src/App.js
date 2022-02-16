import "./App.css";
import { Component, useEffect, useState } from "react";
import imagesList from "./components/imagesList";
import axios from "axios";

function App() {
  const APP_URL = "http://localhost:3001";

  const [data, setData] = useState([]);

  useEffect(async () => {
    setData(getData());
  }, []);

  const getData = async () => {
    let data = await axios.get(APP_URL + "/gallery");
    return data;
  };

  console.log(data);
  return (
    <div className="app">
      <div className="Main">
        <img
          src={`https://picsum.photos/id/${data[2].id}/${data[2].width}/${data[2].height}`}
          alt="random image3"
        />
        <div className="Author">
          <span>{data[2].author}</span>
        </div>
      </div>
      <imagesList imagesData={data} />
    </div>
  );
}

export default App;
