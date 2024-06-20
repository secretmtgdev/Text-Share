import { useEffect, useState } from 'react';

import FileList from './components/FileList/FileList.tsx';
import FileUpload from './components/FileUpload/FileUpload.tsx';
import NavDirectories from './components/NavDirectories/NavDirectories.tsx';

import './App.css';
import { io } from 'socket.io-client';

// TODO: Set this in a configuration file
const IS_DEBUG_MODE = true;

function App() {
  const [socketInstance, setSocketInstance] = useState(null);
  const [sentMessage, setSendMessage] = useState(false);
  /** Render debug mode after the content has loaded into the DOM */
  useEffect(() => {
    if (IS_DEBUG_MODE) {
      const allDivs = document.getElementsByTagName('div');
      for (let i = 0; i < allDivs.length; i++) {
        allDivs[i].classList.add('debug-mode');
      }
    }

    const socket = io('localhost:5001/', {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000"
      }
    });

    setSocketInstance(socket);

    socket.on("connected", data => {
      console.error("CONNECTING TO SOCKET");
      console.error(data);
    });

    socket.on("disconnect", data => {
      console.error("DISCONNECTING FROM SOCKET");
      console.error(data);
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  const testSocket = () => {
    socketInstance.emit("data", "THIS IS FROM THE REACT SIDE OF THINGS");
    setSendMessage(true);
  }

  console.error('REFRESHING APP')

  return (
    <div id='app-container'>
      <button onClick={testSocket}>SEND MESSAGE TO SOCKET</button>
      <div id='file-controls-container'>
        <div className='left-column'>
          <FileUpload />
          <NavDirectories />
        </div>
        <div className='right-column'>
          <FileList />
        </div>
      </div>
      <textarea id='passage'></textarea>
    </div>
  );
}

export default App;
