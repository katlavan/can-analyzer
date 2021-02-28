import React from "react";
import socketIOClient from "socket.io-client";
import {SERVER_ENDPOINT} from "./constants/index";
import Table from "./components/Table/index";

const App = () => {

  const socket = socketIOClient(SERVER_ENDPOINT);

  const startRead = () => socket.emit("start read", "COOL YA");

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={() => startRead() }>Start reading</button>
      <Table socket={socket} />
    </div>
  )
};

export default App;
