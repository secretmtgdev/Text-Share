import FileList from './components/FileList/FileList.tsx';
import FileUpload from './components/FileUpload/FileUpload.tsx';
import NavBar from './components/NavBar/NavBar.tsx';

import './App.css';

function App() {
  return (
    <div id='app-container'>
      <NavBar />
      <FileList />
      <FileUpload />
      <textarea id='passage'></textarea>
    </div>
  );
}

export default App;
