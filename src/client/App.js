import { useEffect } from 'react';

import FileList from './components/FileList/FileList.tsx';
import FileOptions from './components/FileOptions/FileOptions.tsx';
import FileUpload from './components/FileUpload/FileUpload.tsx';
import NavBar from './components/NavBar/NavBar.tsx';
import NavDirectories from './components/NavDirectories/NavDirectories.tsx';

import './App.css';

// TODO: Set this in a configuration file
const IS_DEBUG_MODE = false;

function App() {
  /** Render debug mode after the content has loaded into the DOM */
  useEffect(() => {
    if (IS_DEBUG_MODE) {
      const allDivs = document.getElementsByTagName('div');
      for (let i = 0; i < allDivs.length; i++) {
        allDivs[i].classList.add('debug-mode');
      }
    }
  }, []);  

  return (
    <div id='app-container'>
      <NavBar />
      <div id='file-controls-container'>
        <div className='left-column'>
          <FileUpload />
          <NavDirectories />
        </div>
        <div className='right-column'>
          <FileOptions />
          <FileList />
        </div>
      </div>
      <textarea id='passage'></textarea>
    </div>
  );
}

export default App;
