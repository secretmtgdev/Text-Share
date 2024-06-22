import { useEffect } from 'react';

import FileList from './components/FileList/FileList.tsx';
import FileUpload from './components/FileUpload/FileUpload.tsx';
import NavDirectories from './components/NavDirectories/NavDirectories.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import ContentRenderer from './components/ContentRenderer/ContentRenderer.tsx';

import './App.css';

// TODO: Set this in a configuration file
const IS_DEBUG_MODE = true;

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
    <div id='app-container' className='flex-column-container'>
      <Navbar />
      <div id='file-controls-container'>
        <div className='left-column'>
          <FileUpload />
          <NavDirectories />
        </div>
        <div className='right-column'>
          <FileList />
        </div>
      </div>
      <ContentRenderer />
    </div>
  );
}

export default App;
