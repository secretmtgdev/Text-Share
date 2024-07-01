import { useEffect } from 'react';

import FileList from './components/FileComponents/FileList/FileList.tsx';
import FileUpload from './components/FileComponents/FileUpload/FileUpload.tsx';
import NavDirectories from './components/NavComponents/NavDirectories/NavDirectories.tsx';
import Navbar from './components/NavComponents/Navbar/Navbar.tsx';
import ContentRenderer from './components/ContentRenderer/ContentRenderer.tsx';
import ErrorView from './components/Errors/ErrorView.tsx';

import './App.css';
import Log from './components/Log/Log.jsx';

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
    <Log page='home'>
      <div id='app-container' className='flex-column-container'>
        <Navbar />
        <div id='file-controls-container'>
          <Log logImpression section='file-navigation'>
            <div className='left-column'>
              <Log logImpression component='FileUpload' elementName='file-upload'>
                <FileUpload />
              </Log>
              <Log logImpression component='NavDirectories' elementName='nav-directories'>
                <NavDirectories />
              </Log>
            </div>
          </Log>
          <Log logImpression section='file-list'>
            <div className='right-column'>
              <Log logImpression component='FileList' elementName='file-list'>
                <FileList />
              </Log>
            </div>
          </Log>
        </div>
        <Log logImpression section='file-render'>
          <Log logImpression component='ContentRenderer' elementName='content-renderer'>
            <ContentRenderer />
          </Log>
        </Log>
        <Log logImpression section='page-error'>
          <ErrorView />
        </Log>
      </div>
    </Log>
  );
}

export default App;
